const mysql = require('mysql2/promise');
const mysql2 = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error conectando a MySQL:', err);
    } else {
        console.log('Conexión a MySQL establecida ✅');
        connection.release();
    }
});

module.exports = pool;


