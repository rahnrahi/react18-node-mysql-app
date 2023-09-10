const db = require("../models");
const users = db.users;
const transactions = db.transactions;
const {
  getBalanceByWalletId,
  getTransactions,
} = require("../services/transaction.service");

// Create and Save a new Tutorial
exports.setUp = async (req, res) => {
  const { username, balance } = req.body;
  try {
    const user = await users.create({ username });
    const transact = await transactions.create({
      amount: balance,
      userWalletId: user.walletId,
      balance,
    });
    res.send({
      id: user.walletId,
      balance,
      transactionId: transact.transactionId,
      name: username,
      date: user.createdAt,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
};

// Retrieve all transactions.
exports.findAll = async (req, res) => {
  const { walletId, limit, offset, sort, order } = req.query;
  const transactions = await getTransactions(walletId, parseInt(limit), parseInt(offset), sort, order );
  return res.json(transactions);
};

// Find wallet details
exports.getWalletDetails = async (req, res) => {
  const walletId = req.params.walletId;
  try {
    const user = await users.findByPk(walletId);
    const { balance, createdAt } = await getBalanceByWalletId(walletId);
    res.send({
      id: user.walletId,
      balance,
      name: user.username,
      date: createdAt,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error retrieving wallet with walletId=" + walletId,
    });
  }
};

exports.addTransaction = async (req, res) => {
  const userWalletId = req.params.walletId;

  const { amount, description } = req.body;
  try {
    const user = await users.findByPk(userWalletId);
    if (!user) {
      return res.status(404).send("Wallet not found");
    }
    const lastTransaction = await getBalanceByWalletId(userWalletId);
    const balance = lastTransaction["balance"] + Number(amount);

    const transact = await transactions.create({
      amount,
      description,
      userWalletId,
      balance,
    });

    res.send({
      transactionId: transact.transactionId,
      balance: transact.balance,
    });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the transaction.",
    });
  }
};
