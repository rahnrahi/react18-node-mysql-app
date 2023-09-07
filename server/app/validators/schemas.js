const Joi = require("joi");
const schemas = {
  setUp: Joi.object().keys({
    username: Joi.string().required(),
    balance: Joi.number().required(),
  }),
  addTransaction: Joi.object().keys({
    description: Joi.string().required(),
    amount: Joi.number().required(),
  }),
  findWallet: Joi.object().keys({
    walletId: Joi.string().uuid().required(),
  }),
  findAllTransaction: Joi.object().keys({
    walletId: Joi.string().uuid().required(),
    limit: Joi.number().integer().min(10).required(),
    offset: Joi.number().integer().min(0).required(),
  }),
};
module.exports = schemas;
