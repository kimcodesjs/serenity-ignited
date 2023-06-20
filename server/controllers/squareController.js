const { Client, Environment, ApiError } = require('square');
const { randomUUID } = require('crypto');
const catchAsync = require('../utils/catchAsync');
const squareErrorHandler = require('../utils/squareErrorHandler');

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

const { customersApi } = client;

exports.creatCustomer = catchAsync(async (req, res, next) => {
  try {
    const response = await customersApi.createCustomer({
      givenName: req.body.firstName,
      familyName: req.body.lastName,
      emailAddress: req.body.email,
      idempotencyKey: randomUUID(),
    });
    req.body.squareId = response.result.customer.id;
    next();
  } catch (err) {
    next(squareErrorHandler.formatError(err));
  }
});

exports.createPayment = catchAsync(async (req, res, next) => {
  try {
    const response = await client.paymentsApi.createPayment({
      sourceId: req.body.paymentToken,
      idempotencyKey: randomUUID(),
      amountMoney: {
        amount: req.body.price * 100,
        currency: 'USD',
      },
      customerId: req.user.squareId,
      statementDescriptionIdentifier: 'Serenity Ignited LLC',
    });
    res.status(201).json({
      status: 'success',
    });
  } catch (err) {
    console.log(err);
    next(squareErrorHandler.formatError(err));
  }
});
