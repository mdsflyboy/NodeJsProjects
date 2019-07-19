const puppeteer = require('puppeteer');
const fs = require('fs');
const $ = require('cheerio');
const url = 'https://photos.app.goo.gl/qEifMVJiWQDtxWVg6';

const sequence = async function(){
    console.log('starting');
    let browser = await puppeteer.launch();
    console.log('launched');
    let page = await browser.newPage();
    console.log('new page');
    await page.goto(url);
    console.log(`Going to ${url}`);
    let html = await page.content();
    fs.writeFileSync('index.html', html);
    console.log('got html');
    let val = $('.RY3tic div').each((i, el) => {
        const item = $(el).attr('style');
        console.log(item);
    });
    // console.log(val);
    console.log('done');
};

sequence();

// puppeteer
//     .launch()
//     .then((browser) => {
//         return browser.newPage();
//     })
//     .then((page) => {
//         return page.goto(url).then(() => {
//             return page.content();
//         });
//     })
//     .then((html) => {
//         // console.log(html);
//         // console.log('got html')
//         // fs.write(html);
//         // fs.writeFileSync("index.html",html);
//         // console.log('written to file')

//         $('h3', html).each(function() {
//             console.log($(this).text());
//         });
//     })
//     .catch((err) => {
//         console.log(err);
//     });