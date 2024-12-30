const db = require('./db');
const my_database = 'price_comparison_website';

async function userFollowed(username) {
    try {
        await db.query('USE ??', [my_database]);

        const [results] = await db.query(`
            SELECT c.cid, c.title, c.platform, c.price, c.imgUrl, c.link, c.updateAt, uf.createAt
            FROM commodities c
            JOIN user_follow uf ON c.cid = uf.cid
            WHERE uf.username = ?
        `, [username]);

        for (let item of results) {
            item.priceInt = item.price.split('.')[0];
            item.priceDec = item.price.split('.')[1];
            item.price = parseFloat(item.price);
            item.followed = true;
        }
        
        return results;
    } catch (error) {
        console.error('userFollowed: ', error);
    }
}

module.exports = {
    userFollowed,
};