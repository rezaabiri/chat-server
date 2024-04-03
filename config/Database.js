// database.js

const mysql = require('mysql');

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'chat_db'
    });
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) {
          console.error('Error connecting to database:', err.stack);
          reject(err);
          return;
        }
        console.log('Connected to database as id', this.connection.threadId);
        resolve();
      });
    });
  }

  query(sql, values) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error executing query:', err.stack);
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  end() {
    this.connection.end();
  }
}

module.exports = Database;
