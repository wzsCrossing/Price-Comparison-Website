const { crawlSuning, crawlJingdong } = require('./crawler');

async function commodityCrawl(keyword, platforms) {
    let productsJD = [];
    if (platforms.JD) {
        productsJD = await crawlJingdong(keyword);
    }

    let productsSN = [];
    if (platforms.SN) {
        productsSN = await crawlSuning(keyword);
    }

    let products = [];
    const count = Math.max(productsJD.length, productsSN.length);
    for (let i = 0; i < count; i++) {
        if (i < productsJD.length) {
            products.push(productsJD[i]);
        }
        if (i < productsSN.length) {
            products.push(productsSN[i]);
        }
    }

    return products;
}

module.exports = {
    commodityCrawl,
};