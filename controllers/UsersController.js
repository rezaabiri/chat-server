// customerController.js

const UsersModel = require('../models/UsersModel');

class UsersController {
  constructor() {
    this.UsersModel = new UsersModel();
  }

  async addUser(req, res) {
    const { username, password, email } = req.params;
    
    try {
      await this.UsersModel.insertCustomer(username, password, email);
      res.send('Customer added successfully.');
    } catch (error) {
      console.error('Error adding customer:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = UsersController;
