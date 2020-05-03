'use strict';

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const data = require('./data');
const middleware = require('./middleware');
const mongoose = require('mongoose');
require('dotenv/config');

// DB connection
  mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true,  useUnifiedTopology: true })
  const db = mongoose.connection;
  db.on('error',console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('DB connected!!!');
  });

// import routes
const productsRoute = require('./routes/products');

// middlewares
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/products' , productsRoute);


// 
app.get('/', function (req, res) {
  res.send('Home page');
})

app.post('/api/auth', (req,res) => {
  let user = data.users.filter((user) => {
    return user.name == req.body.name && user.password == req.body.password;
  });
  if (user.length){
      // create a token using user name and password vaild for 2 hours
      let token_payload = {name: user[0].name, password: user[0].password};
      let token = jwt.sign(token_payload, "jwt_secret_password", { expiresIn: '2h' });
      let response = { message: 'Token Created, Authentication Successful!', token: token };

      // return the information including token as JSON
      return res.status(200).json(response);

  } else {
      return res.status("409").json("Authentication failed. admin not found.");
  }
});

const PORT = 5000;

app.listen(PORT);
console.log('api runnging on port ' + PORT + ': ');