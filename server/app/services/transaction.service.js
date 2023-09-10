const db = require("../models");
const transactions = db.transactions;

exports.getBalanceByWalletId = async (walletId) => {
  const data = await transactions.findOne({
    where: { userWalletId: walletId },
    order: [["createdAt", "DESC"]],
    attributes: ["balance", "createdAt"],
    raw: true,
  });
  return data?.balance
    ? { balance: Number(data.balance), createdAt: data.createdAt }
    : { balance: 0, createdAt: null };
};

exports.getTransactions = async (userWalletId, limit = 0, offset = 10, sort="createdAt", order="DESC" ) => {
  const transactionCount  = await transactions.count({
     where: { userWalletId },
  })
  const transactionList = await transactions.findAll({
    where: { userWalletId },
    order: [[sort, order]],
    attributes: [
      ["transactionId", "id"],
      ["userWalletId", "walletId"],
      ["createdAt", "date"],
      "amount", "balance","description"
    ],
    offset,
    limit,
  });
  const list = transactionList.map((transaction) => {
    const type = Number(transaction.dataValues.amount)>=0? "CREDIT":"DEBIT";
    return {...transaction.dataValues, type}
  });
  return {list, totalCount: transactionCount};
};
