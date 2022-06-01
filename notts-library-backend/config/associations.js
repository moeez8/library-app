function associations(sequelize) {
    const { book, copy } = sequelize.models;

    book.hasMany(copy, { foreignKey: 'book_id', as: 'copies' });
    copy.belongsTo(book, { foreignKey: 'book_id', as: 'book' });
}

module.exports = { associations };