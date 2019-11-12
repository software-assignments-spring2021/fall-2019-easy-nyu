const puppeteer = require('puppeteer')
(async () =>{
    let url = 'https://m.albert.nyu.edu/app/catalog/classSearch';
    
    let browser = await puppeteer.launch();
    let page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2'});

    let data = await page.evaluate(() => {
        let res = document.querySelectorAll('.btn-group, .bootstrap-select')
        return res
    });

    console.log(data)
})();