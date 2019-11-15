const puppeteer = require('puppeteer');

(async () => {
    const urlTermArr = ['1204', '1202', '1198', '1196', '1194', '1192', '1188', '1186', '1184', '1182', '1178']
    const courseCountArr = [32, 20, 35, 31, 34, 19, 35, 31, 35, 15, 36] // number of courses for each semester
    let url = `https://m.albert.nyu.edu/app/catalog/classSearch/${urlTermArr[0]}`;
    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    let frame = page.mainFrame() // get the main frame of the page
    const selectArr = await frame.$$('.btn-group > button, .bootstrap-select > button'); // get all the drop down element on the page
    const schoolSel = selectArr[1] // set the select school drop down
    const subjectSel = selectArr[2] // set the select subject drop down
    for (i = 1; i < courseCountArr[0]; i++) {
        console.log('!!')
        await schoolSel.click() // drop down the school selection
        const schoolArr = await frame.$$('div.bs-container > div.dropdown-menu > ul > li > a'); // get the school selection
        await schoolArr[i].click() // click the i^th school
        await subjectSel.click() // drop down the subject selection
        const subArr = await frame.$$('div.bs-container > div.dropdown-menu > ul > li > a'); 
        console.log(subArr.length)
        await subArr[0].click()
    }
    // without eval
   
    // const schoolSel = selectArr[1]
    // const subjectSel = selectArr[2]
    // await schoolSel.click() // click the school drop down
    // const schoolArr = await page.frame.$$('div.bs-container > div.dropdown-menu > ul > li > a');
    // console.log(schoolArr.length)

    // // with eval
    // for (i = 0; i < urlTermArr.length; i++) {
    //     let url = `https://m.albert.nyu.edu/app/catalog/classSearch/${urlTermArr[i]}`;
    //     let browser = await puppeteer.launch();
    //     let page = await browser.newPage();
    //     await page.goto(url, { waitUntil: 'networkidle2' });
    //     // to get the count of courses for each term (ran and stored in courseCountArr):
    //     // const schoolLen = await page.evaluate(async() => {
    //     //     await document.querySelectorAll('.btn-group > button, .bootstrap-select > button')['1'].click() // school
    //     //     const res = await document.querySelectorAll('div.bs-container > div.dropdown-menu > ul > li > a').length// school 1-34
    //     //     return res;
    //     // })
    //     // const a = await page.evaluate(async(i, courseCountArr, page) => {
    //     //     res = []
    //     //     for (let j = 1; j < courseCountArr[i]; j++) {
    //     //         await document.querySelectorAll('.btn-group > button, .bootstrap-select > button')['1'].click() // click on school drop down
    //     //         await document.querySelectorAll('div.bs-container > div.dropdown-menu > ul > li > a')[`${j}`].click()
    //     //         await document.querySelectorAll('.btn-group > button, .bootstrap-select > button')['2'].click() // click on subject drop down
    //     //         const subjectLen = document.querySelectorAll('div.bs-container > div.dropdown-menu > ul > li > a').length
    //     //         for (let k = 1; k < subjectLen; k++) {
    //     //             await document.querySelectorAll('div.bs-container > div.dropdown-menu > ul > li > a')[`${k}`].click()
    //     //             document.getElementById('buttonSearch').click()
    //     //             page.waitForSelector('.strong, .section-body')
    //     //             return document.querySelectorAll('.strong, .section-body').length
    //     //         }
    //     //     }
    //     // }, i, courseCountArr, page);
    //     console.log(a)
    // }

})();

