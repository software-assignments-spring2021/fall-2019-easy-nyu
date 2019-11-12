const puppeteer = require('puppeteer')
(async () =>{
    let url = 'https://m.albert.nyu.edu/app/catalog/classSearch';
    
    let browser = await puppeteer.launch();
    let page = await browser.newPage();

})();