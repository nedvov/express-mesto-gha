const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '635e7ba126e5078aa839bed1',
  };
  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.listen(PORT, () => {
  console.log(`Приложение слушает на ${PORT} порте`);
});
