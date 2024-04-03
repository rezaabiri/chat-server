// در فایل اصلی برنامه (مثلاً index.js)
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const UsersController = require('./controllers/UsersController');
const socketIO = require('socket.io')
const server = http.createServer();
const io = socketIO(server);

const app = express();
const usersController = new UsersController();

app.use(bodyParser.json());

io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('addUser', async (userData) => {
      const { username, password, email } = userData;
      try {
        const message = await usersController.addUser(username, password, email);
        socket.emit('userAdded', message);
      } catch (error) {
        console.error('Error adding user:', error);
        socket.emit('error', 'Error adding user');
      }
    });
});


// // مسیر اضافه کردن مشتری
// app.get('/users/:username/:password/:email', (req, res) => {
//   usersController.addUser(req, res);
// });

// شروع سرور
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
