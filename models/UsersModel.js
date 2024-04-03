// customerModel.js

const Database = require('../config/Database');

class UsersModel {
  constructor() {
    this.db = new Database();
  }

  async insertCustomer(username, password, email) {
    try {
      await this.db.connect();
      const sql = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
      const result = await this.db.query(sql, [username, password, email]);
      console.log("1 record inserted, ID:", result.insertId);
      return result;
    } catch (error) {
      console.error('Error inserting record:', error);
      throw error;
    } finally {
      this.db.end();
    }
  }
}

module.exports = UsersModel;
