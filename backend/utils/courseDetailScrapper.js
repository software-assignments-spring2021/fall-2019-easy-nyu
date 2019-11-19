const cheerio = require('cheerio');
const axios = require('axios');
const mongoose = require('mongoose');
const fs = require('fs');
const Course = require('../models/course.model');
const Professor = require('../models/professor.model');

require('dotenv').config();

function dbConnection() {
    let mongo_uri = process.env.JACK_URL;
    console.log(mongo_uri)
    mongoose.connect(mongo_uri, { useNewUrlParser: true, useCreateIndex: true });
    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log("MongoDB database is connected successfully");
    })
}

const courseStr = fs.readFileSync("./course_num_clean.txt").toString();
courseArr = courseStr.split(',')
const baseUrl = "https://m.albert.nyu.edu/app/catalog/classsection/NYUNV/1204/"
// for (const courseNum of courseArr) {
//     const url = baseUrl + courseNum
//     axios.get('https://buttercms.com/docs/api/')
//     .then((response) => {

//     })
// }

dbConnection()
const url = baseUrl + courseArr[0]
axios.get(url)
    .then((response) => {
        const $ = cheerio.load(response.data)
        const leftElem = $('div.pull-left')
        const rightElem = $('div.pull-right')
        const title = $('div.primary-head')
        let courseName = $(title[0]).text().trim()
        if (leftElem.length !== rightElem.length) {
            console.error(`divs dont match at ${url}`);
        } else {
            let isClass = false
            let courseNumber, courseLevel, courseUnit, courseDescription, courseRequirements, courseNote
            let professorName
            for (let i = 0; i < leftElem.length; i++) {
                let varName = $(leftElem[i]).text().trim()
                let varVal = $(rightElem[i]).text().trim()
                switch (varName) {
                    case "Session":
                        if (varVal === "Regular Academic Session") {
                            isClass = true
                        }
                        break;
                    case "Class Number":
                        courseNumber = varVal
                        break;
                    case "Career":
                        courseLevel = varVal
                        break;
                    case "Units":
                        courseUnit = varVal
                        break;
                    case "Description":
                        courseDescription = varVal
                        break;
                    case "Enrollment Requirements":
                        courseRequirements = varVal
                        break;
                    case "Notes":
                        courseNote = varVal
                        break;
                    case "Instructor(s)":
                        professorName = varVal
                        break;
                }
            }
            if (isClass) {
                Course.findOne({ name: courseName })
                    .then((data) => {
                        console.log(data.length)
                        const newCourse = new Course({
                            courseName,
                            courseNumber,
                            courseLevel,
                            courseUnit,
                            courseDescription,
                            courseRequirements,
                            courseNote
                        });
                    })
                    .then((data) => {
                        Professor.findOne({ name: professorName })
                            .then((data) => {
                                const newCourse = new Course({
                                    professorName
                                });
                            })
                    })
            }
        }
    })