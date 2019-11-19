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
    let promise = new Promise(function (resolve, reject) {
        setTimeout(() => {
            const url = baseUrl + courseUrl
            const course = {}
            const professor = {}
            axios.get(url)
                .then((response) => {
                    const $ = cheerio.load(response.data)
                    const leftElem = $('div.pull-left')
                    const rightElem = $('div.pull-right')
                    const title = $('div.primary-head')
                    course.name = $(title[0]).text().trim()
                    if (leftElem.length !== rightElem.length) {
                        console.error(`divs dont match at ${url}`);
                    } else {
                        let isClass = false
                        let res = null
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
                                    course.number = varVal
                                    break;
                                case "Career":
                                    course.level = varVal
                                    break;
                                case "Units":
                                    course.unit = varVal
                                    break;
                                case "Description":
                                    course.description = varVal
                                    break;
                                case "Enrollment Requirements":
                                    course.requirement = varVal
                                    break;
                                case "Notes":
                                    course.note = varVal
                                    break;
                                case "Instructor(s)":
                                    professor.name = varVal
                                    break;
                            }
                        }
                        if (isClass) {
                            res = [course, professor]
                        }
                        resolve(res)
                    }
                })
        }, 1000);
    });
    return promise
}

(async() => {
    const courseStr = fs.readFileSync("./course_num_clean.txt").toString();
    courseArr = courseStr.split(',')
    const baseUrl = "https://m.albert.nyu.edu/app/catalog/classsection/NYUNV/1204/"
    const classInfo = await fatchSingleCourse(baseUrl, courseArr[2])
    console.log(classInfo[0])
    console.log(classInfo[1])
})

dbConnection()

course = {
    name: 'Advanced Introduction to Environmental Ethics',
    number: '7411',
    level: 'Graduate',
    unit: '3 units',
    description:
        'Advanced Introduction to Environmental Ethics - This course situates theoretical developments in practical ethics broadly and in environmental ethics specifically. The course builds on the  theoretical materials by examining a series of cases including ethics and    agriculture, corporate responsibility and environmental injustice, and the environmental health consequences of war.',
    requirement: 'Restriction for GPH-GU 1006',
    note:
        'Open to MA Bioethics students only, or by permission of department.'
}

prof = { name: 'Adam Jared Lerner' }

const newCourse = new Course(course)
const newProfessor = new Professor(prof)
// newCourse.save((err, course) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(course._id)
//     }
// })
// newProfessor.save((err, course) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(course._id)
//     }
// })
async function storeToDB(course, prof) {
    const findExistingCourse = Course.findOne({name : course.name})
    const findExistingProf = Professor.findOne({name : prof.name})
    await Promise.all([findExistingCourse, findExistingProf]).then(async function(values) {
        const existingCourse = values[0]
        const existingProf = values[1]
        if (existingCourse && existingProf) {
            console.log("info already in db")
        } else if (existingCourse) {
            prof.courses = [existingCourse._id]
            newProf = new Professor(prof)
            savedProf = await newProf.save()
            await Course.findByIdAndUpdate(existingCourse, { $addToSet : {profs : savedProf._id } })
        } else if (existingProf) {
            course.prof = [existingProf._id]
            newCourse = new Course(course)
            savedCourse = await newCourse.save()
            existingProf.courses.push(savedCourse._id)
            await Professor.findByIdAndUpdate(existingProf, {profs : existingProf.courses})
        }
    });
}

storeToDB(course, prof)

