const puppeteer = require('puppeteer');
const delay = require('delay');

const url = 'https://photos.app.goo.gl/qEifMVJiWQDtxWVg6';

(async function main(){
    try{

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36');

        await page.goto(url);
        await page.setViewport({
            width:1200,
            height: 800
        });
        await page.waitForSelector('.RY3tic');
        // await page.waitForNavigation();
        // await delay(10000);

        // let previousHeight = await page.evaluate('document.body.scrollHeight');
        // await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
        // await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);

        const sections = await page.$$('.RY3tic');
        // console.log(sections.length);

        let images = [];
        for (const section of sections){
            // const label = await page.evaluate(el => el.innerText, section);
            // console.log(label);
            // console.log(section.getProperty('innerHTML'));
            const styleStuff = await page.evaluate((section) => {
                return JSON.parse(JSON.stringify(getComputedStyle(section)));
            }, section);
            let url = styleStuff.backgroundImage;
            url.trim();
            url = url.substr(5, url.length - 7);
            // images += url;
            images.push(url);
            // console.log(styleStuff.backgroundImage+'\n');
            // console.log(url+'\n');
        }
        
        // for(const image of images){
        //     console.log(image+'\n');
        // }
        console.log(images);

        // const section = await page.$('.RY3tic');
        // const styleStuff = await page.evaluate((section) => {
        //     return JSON.parse(JSON.stringify(getComputedStyle(section)));
        // }, section);
        // console.log(styleStuff.backgroundImage);

    }catch(e){
        console.log('our error', e);
    }
})();