// app.js — входной файл
// Здесь мы подключаем Express для создания сервера, Mongoose для работы с MongoDB
const express = require('express');
const mongoose = require('mongoose');
// пакет celebrate
const { errors } = require('celebrate');
const cors = require('cors');

// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
const helmet = require('helmet');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

// Здесь мы создаем экземпляр приложения Express и настраиваем middleware для обработки JSON-данных.
const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());

// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use(requestLogger); // подключаем логгер запросов
app.use(routes);
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
