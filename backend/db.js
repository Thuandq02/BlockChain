// db.js
const mysql = require('mysql2');
require('dotenv').config();

// Tạo kết nối tới MySQL database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Kiểm tra kết nối
connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối MySQL:', err);
    return;
  }
  console.log('Đã kết nối tới MySQL!');
});

module.exports = connection;
