const wallet = require("../controllers/wallet.controller");
// const validator = require('../validators/validator')
const schemas = require("../validators/schemas");
const joiSwagger = require("../validators/validator");
const router = joiSwagger.wrapRouter(require("express").Router(), "/api");

router.post(
  "/setup",
  {
    summary: "Sets up intial wallet",
    description: "Sets up the intial wallet",
    validate: {
      body: schemas.setUp,
    },
  },
  wallet.setUp
);
// Retrieve all Tutorials
router.post(
  "/transact/:walletId",
  {
    summary: "Add a transaction",
    description: "Adds a transaction to wallet",
    validate: {
      body: schemas.addTransaction,
    },
  },
  wallet.addTransaction
);

router.get(
  "/wallet/:walletId",
  {
    summary: "Retrieve a wallet with id",
    description: "Retrieve a wallet with id",
    validate: {
      params: schemas.findWallet,
    },
  },
  wallet.getWalletDetails
);

router.get(
  "/transactions",
  {
    summary: "Get all transactions",
    description: "Gets a list of transactions for a wallet",
    validate: {
      query: schemas.findAllTransaction,
    },
  },
  wallet.findAll
);
module.exports = router.expressRouter;
