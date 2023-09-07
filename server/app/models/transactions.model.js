module.exports = (sequelize, Sequelize) => {
    const Transactions = sequelize.define("transactions", {
        transactionId: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
        },
        description: {
            type: Sequelize.TEXT,
        },
        amount: {
            type: Sequelize.DECIMAL(10,4),
            allowNull: false,
        },
        balance: {
            type: Sequelize.DECIMAL(10,4),
            allowNull: false,
        },
    });

    return Transactions;
};
