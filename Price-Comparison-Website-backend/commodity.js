const { crawlSuning, crawlJingdong } = require('./crawler');
const db = require('./db');
const my_database = 'price_comparison_website';

async function commodityCrawl(username, keyword, platforms) {
    let productsJD = [];
    if (platforms.JD) {
        productsJD = await crawlJingdong(keyword);
    }

    let productsSN = [];
    if (platforms.SN) {
        productsSN = await crawlSuning(keyword);
    }

    let products = [];
    const count = Math.min(50, Math.max(productsJD.length, productsSN.length));
    for (let i = 0; i < count; i++) {
        if (i < productsJD.length) {
            products.push(productsJD[i]);
        }
        if (i < productsSN.length) {
            products.push(productsSN[i]);
        }
    }

    try {
        await db.query('USE ??', [my_database]);

        for (let product of products) {
            const [result1] = await db.query(`
                SELECT * FROM commodities WHERE title = ? AND platform = ?
            `, [product.title, product.platform]);

            const [result2] = await db.query(`
                INSERT INTO commodities (title, platform, price, imgUrl, link)
                VALUES (?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                price = VALUES(price),
                imgUrl = VALUES(imgUrl),
                link = VALUES(link),
                updateAt = CURRENT_TIMESTAMP
            `, [product.title, product.platform, product.price, product.imgUrl, product.link]);

            const cid = (result1.length === 0) ? result2.insertId : result1[0].cid;
            await db.query(`
                INSERT INTO price_history (cid, price)
                VALUES (?, ?)
            `, [cid, product.price]);
            product.cid = cid;

            const [result3] = await db.query(`
                SELECT * FROM user_follow WHERE username = ? AND cid = ?
            `, [username, cid]);
            product.followed = (result3.length === 0) ? false : true;
        }
    } catch (error) {
        console.error('commodityCrawl: ', error);
    }

    return products;
}

async function commodityFollow(username, cid) {
    try {
        await db.query('USE ??', [my_database]);

        await db.query(`
            INSERT INTO user_follow (username, cid)
            VALUES (?, ?)
        `, [username, cid]);
    } catch (error) {
        console.error('commodityFollow: ', error);
    }
}

async function commodityUnfollow(username, cid) {
    try {
        await db.query('USE ??', [my_database]);

        await db.query(`
            DELETE FROM user_follow
            WHERE username = ? AND cid = ?
        `, [username, cid]);
    } catch (error) {
        console.error('commodityUnfollow: ', error);
    }
}

async function commodityHistory(cid) {
    try {
        await db.query('USE ??', [my_database]);

        const [result] = await db.query(`
            SELECT price, createAt FROM price_history
            WHERE cid = ?
        `, [cid]);

        const chartData = result.map(item => ({
            label: new Date(item.createAt).getTime(),
            value: parseFloat(item.price),
        }));
        return chartData;
    } catch (error) {
        console.error('commodityHistory: ', error);
    }
}

module.exports = {
    commodityCrawl,
    commodityFollow,
    commodityUnfollow,
    commodityHistory,
};