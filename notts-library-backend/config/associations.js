function associations(sequelize) {
    const { book, copy, withdraw } = sequelize.models;

    book.hasMany(copy, { foreignKey: 'book_id', as: 'copies' });
    copy.belongsTo(book, { foreignKey: 'book_id', as: 'book' });

    copy.hasMany(withdraw, { foreignKey: 'copy_id', as: 'withdraws' });
    withdraw.belongsTo(copy, { foreignKey: 'copy_id', as: 'copy' });
}

module.exports = { associations };