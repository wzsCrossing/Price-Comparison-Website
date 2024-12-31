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
            item.updateAt = item.updateAt.toISOString().split('T')[0];
            item.createAt = item.createAt.toISOString().split('T')[0];
        }

        return results;
    } catch (error) {
        console.error('userFollowed: ', error);
    }
}

async function userQuery(username) {
    try {
        await db.query('USE ??', [my_database]);

        const [results] = await db.query(`
            SELECT username, email, createAt
            FROM users
            WHERE username = ?
        `, [username]);

        results[0].createAt = results[0].createAt.toISOString().split('T')[0];
        return results[0];
    } catch (error) {
        console.error('userQuery: ', error);
    }
}

async function userUpdateUsername(username, newUsername) {
    try {
        await db.query('USE ??', [my_database]);

        await db.query(`
            UPDATE users
            SET username = ?
            WHERE username = ?
        `, [newUsername, username]);
        return 1;
    } catch (error) {
        return 0;
    }
}

async function userUpdatePassword(username, oldPassword, newPassword) {
    try {
        await db.query('USE ??', [my_database]);

        const [results] = await db.query(`
            SELECT password
            FROM users
            WHERE username = ?
        `, [username]);

        if (results[0].password === oldPassword) {
            if (oldPassword === newPassword) {
                return -1;
            }

            await db.query(`
                UPDATE users
                SET password = ?
                WHERE username = ?
            `, [newPassword, username]);
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.error('userUpdatePassword: ', error);
        return -1;
    }
}

module.exports = {
    userFollowed,
    userQuery,
    userUpdateUsername,
    userUpdatePassword,
};