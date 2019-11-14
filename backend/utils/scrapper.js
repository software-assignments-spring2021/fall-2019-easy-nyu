const puppeteer = require('puppeteer');

async function getSubjectLen(i) {
    const courseCountArr = [32, 20, 35, 31, 34, 19, 35, 31, 35, 15, 36]
    let res = []
    for (let j = 0; j < courseCountArr[i]; j++) {
        await document.querySelectorAll('.btn-group > button, .bootstrap-select > button')['1'].click() // click on school drop down
        await document.querySelectorAll('div.bs-container > div.dropdown-menu > ul > li > a')[`${j}`].click()
        await document.querySelectorAll('.btn-group > button, .bootstrap-select > button')['2'].click() // click on subject drop down
        console.log(document.querySelectorAll('div.bs-container > div.dropdown-menu > ul > li > a').length)
    }
    res.push(document.querySelectorAll('div.bs-container > div.dropdown-menu > ul > li > a').length)
}

(async () => {
    const urlTermArr = ['1204', '1202', '1198', '1196', '1194', '1192', '1188', '1186', '1184', '1182', '1178']
    const courseCountArr = [32, 20, 35, 31, 34, 19, 35, 31, 35, 15, 36]
    // without eval
    // const selectArr = await page.$$('.btn-group > button, .bootstrap-select > button');
    // const schoolSel = selectArr[1]
    // const subjectSel = selectArr[2]
    // await schoolSel.click() // click the school drop down
    // const schoolArr = await page.$$('div.bs-container > div.dropdown-menu > ul > li > a');
    // for (i = 0; i < schoolArr.length; i++) {
    //     await schoolArr[i].click()
    //     await subjectSel.click()
    //     const subjectArr = await page.$eval('div.bs-container > div.dropdown-menu > ul > li > a');
    //     console.log(subjectArr.length)
    //     subjectArr[0].click()
    // }

    // with eval
    for (i = 0; i < urlTermArr.length; i++) {
        let url = `https://m.albert.nyu.edu/app/catalog/classSearch/${urlTermArr[i]}`;
        let browser = await puppeteer.launch();
        let page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
        // to get the count of courses for each term (ran and stored in courseCountArr):
        // const schoolLen = await page.evaluate(async() => {
        //     await document.querySelectorAll('.btn-group > button, .bootstrap-select > button')['1'].click() // school
        //     const res = await document.querySelectorAll('div.bs-container > div.dropdown-menu > ul > li > a').length// school 1-34
        //     return res;
        // })
        const a = await page.evaluate(async(i, courseCountArr) => {
            res = []
            for (let j = 1; j < courseCountArr[i]; j++) {
                await document.querySelectorAll('.btn-group > button, .bootstrap-select > button')['1'].click() // click on school drop down
                await document.querySelectorAll('div.bs-container > div.dropdown-menu > ul > li > a')[`${j}`].click()
                await document.querySelectorAll('.btn-group > button, .bootstrap-select > button')['2'].click() // click on subject drop down
                
            }
            return res
        }, i, courseCountArr);
        console.log(a)
    }

})();
