const { Client, Environment, ApiError } = require('square');
const { randomUUID } = require('crypto');
const catchAsync = require('../utils/catchAsync');

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
    next(err);
  }
});
