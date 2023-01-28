const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./utils/errorHandler');

// ROUTER IMPORTS
const userRouter = require('./routes/userRouter');
const sessionRouter = require('./routes/sessionRouter');

const app = express();

// GLOBAL MIDDLEWARE
app.use(helmet());
app.use(cors());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/sessions', sessionRouter);

app.use(globalErrorHandler);
module.exports = app;
