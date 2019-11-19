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

function fatchSingleCourse(baseUrl, courseUrl) {
    const url = baseUrl + courseUrl
    const course = {}
    const professor = {}
    axios.get(url)
        .then((response) => {
            const $ = cheerio.load(response.data)
            const leftElem = $('div.pull-left')
            const rightElem = $('div.pull-right')
            const title = $('div.primary-head')
            let courseName = $(title[0]).text().trim()
            let promise = new Promise(function(resolve, reject) {
                setTimeout(() => resolve("done"), 1000);
              });
            if (leftElem.length !== rightElem.length) {
                console.error(`divs dont match at ${url}`);
            } else {
                let isClass = false
                for (let i = 0; i < leftElem.length; i++) {
                    let varName = $(leftElem[i]).text().trim()
                    let varVal = $(rightElem[i]).text().trim()
                    console.log(varVal)
                    switch (varName) {
                        case "Session":
                            if (varVal === "Regular Academic Session") {
                                isClass = true
                            }
                            break;
                        case "Class Number":
                            course.courseNumber = varVal
                            break;
                        case "Career":
                            course.courseLevel = varVal
                            break;
                        case "Units":
                            course.courseUnit = varVal
                            break;
                        case "Description":
                            course.courseDescription = varVal
                            break;
                        case "Enrollment Requirements":
                            course.courseRequirements = varVal
                            break;
                        case "Notes":
                            course.courseNote = varVal
                            break;
                        case "Instructor(s)":
                            professor.professorName = varVal
                            break;
                    }
                }
                if (isClass) {
                    return [course, professor]
                }
            }
        })
}

(async => {
    const courseStr = fs.readFileSync("./course_num_clean.txt").toString();
    courseArr = courseStr.split(',')
    const baseUrl = "https://m.albert.nyu.edu/app/catalog/classsection/NYUNV/1204/"
    const classInfo = fatchSingleCourse(baseUrl, courseArr[2])
})()

