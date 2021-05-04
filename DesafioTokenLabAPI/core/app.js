const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const eventController = require('./controllers/EventController');
const userController = require('./controllers/UserController');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(
  'mongodb://localhost:27017/event_api',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use('/event', eventController);
app.use('/user', userController);

app.listen(3000);