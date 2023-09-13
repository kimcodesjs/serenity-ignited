const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./utils/errorHandler');

// ROUTER IMPORTS
const userRouter = require('./routes/userRouter');
const sessionRouter = require('./routes/sessionRouter');
const appointmentRouter = require('./routes/appointmentRouter');
const eventRouter = require('./routes/eventRouter');
const practitionerRouter = require('./routes/practitionerRouter');

const app = express();

// GLOBAL MIDDLEWARE
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(compression());

// ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/sessions', sessionRouter);
app.use('/api/v1/appointments', appointmentRouter);
app.use('/api/v1/events', eventRouter);
app.use('/api/v1/practitioners', practitionerRouter);

app.use(globalErrorHandler);
module.exports = app;
