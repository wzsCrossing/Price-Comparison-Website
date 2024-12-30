const puppeteer = require('puppeteer');

async function crawlSuning(keyword) {
    const browser = await puppeteer.launch({ 
        headless: true,
    });
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36');

    const url = `https://search.suning.com/${keyword}/`;
    await page.goto(url, { waitUntil: 'load', timeout: 0 });

	await page.evaluate(async () => {
        await new Promise((resolve) => {
            let height = 0;
            const distance = 200;
            const timer = setInterval(() => {
                window.scrollBy(0, distance);
                height += distance;
        
                if(height >= document.body.scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 50);
        });
    });

    const products = await page.evaluate(() => {
        const productElements = document.querySelectorAll('.product-box');
        const productData = [];
        const titleSet = new Set();

        productElements.forEach((product) => {
            const imgUrl = product.querySelector('.sellPoint img')?.src;
			const title = product.querySelector('.title-selling-point')?.innerText.trim();
            const priceString = product.querySelector('.price-box')?.innerText.trim();
            const link = product.querySelector('.sellPoint')?.href;

            if (priceString != '' && !titleSet.has(title)) {
                const price = priceString.split('¥')[1];
                const priceInt = price.split('.')[0];
                const priceDec = price.split('.')[1];

                productData.push({
                    imgUrl,
                    title,
                    price: parseFloat(price),
                    priceInt,
                    priceDec: priceDec.substring(0, 2),
                    platform: '苏宁易购',
                    link,
                });
                titleSet.add(title);
            }
        });

        return productData;
    });

    // console.log('爬取到的商品信息:', products);
    // console.log('爬取到的商品数量:', products.length);
    await browser.close();

    return products;
};

async function crawlJingdong(keyword) {
    const browser = await puppeteer.launch({ 
        headless: true,
    });
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36');

    const url = `https://re.jd.com/search?keyword=${keyword}&enc=utf-8`;
    await page.goto(url, { waitUntil: 'load', timeout: 0 });

	await page.evaluate(async () => {
        await new Promise((resolve) => {
            let height = 0;
            const distance = 200;
            const timer = setInterval(() => {
                window.scrollBy(0, distance);
                height += distance;
        
                if(height >= document.body.scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 50);
        });
    });

    const products = await page.evaluate(() => {
        const productElements = document.querySelectorAll('.li_cen');
        const productData = [];
        const titleSet = new Set();

        productElements.forEach((product) => {
            const imgUrl = product.querySelector('.img_k')?.src;
			const title = product.querySelector('.commodity_tit')?.innerText.trim();
            const priceString = product.querySelector('.commodity_info span')?.innerText.trim();
            const link = product.querySelector('.li_cen_bot a')?.href;
            
            if (priceString != '' && !titleSet.has(title)) {
                const price = priceString.substring(1);
                const priceInt = price.split('.')[0];
                const priceDec = price.split('.')[1];

                productData.push({
                    imgUrl,
                    title,
                    price: parseFloat(price),
                    priceInt,
                    priceDec: priceDec.substring(0, 2),
                    platform: '京东',
                    link,
                });
                titleSet.add(title);
            }
        });

        return productData;
    });

    // console.log('爬取到的商品信息:', products);
    // console.log('爬取到的商品数量:', products.length);
    await browser.close();

    return products;
};

module.exports = {
    crawlSuning,
    crawlJingdong,
};