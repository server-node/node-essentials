// initializing the Express

const express = require('express');

const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// !initializing the Express

// setting the databse
const Database = require('./database/_core')

const db = new Database()


//setting the additional essensial variables
app.use((req, res, next) => {
  res.locals.db = db
  next();
})

// setting the routes and middlewares

app.get('/test', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});

app.use('/api/v1', api);
app.use(middlewares.notFound);

app.use(middlewares.errorHandler);

module.exports = app;
