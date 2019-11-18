const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs');

const courseStr = fs.readFileSync("./course_num_clean.txt").toString();
courseArr = courseStr.split(',')
const baseUrl = "https://m.albert.nyu.edu/app/catalog/classsection/NYUNV/1204/"
// for (const courseNum of courseArr) {
//     const url = baseUrl + courseNum
//     axios.get('https://buttercms.com/docs/api/')
//     .then((response) => {

//     })
// }

const url = baseUrl + courseArr[0]
axios.get(url)
    .then((response) => {
        const $ = cheerio.load(response.data)
        const leftElem = $('div.pull-left')
        const rightElem = $('div.pull-right')
        if (leftElem.length !== rightElem.length) {
            console.error(`divs dont match at ${url}`);      
        } else {
            for (let i = 0; i < leftElem.length; i++) {
                console.log($(leftElem[i]).text().trim())
                console.log($(rightElem[i]).text().trim())
            }
        }
    })