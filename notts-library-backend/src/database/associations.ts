const associations = (sequelize: any) => {
	const { book, copy, withdraw, tag, request } = sequelize.models;

	book.hasMany(copy, { foreignKey: "book_id", as: "copies" });
	copy.belongsTo(book, { foreignKey: "book_id", as: "book" });

	copy.hasMany(withdraw, { foreignKey: "copy_id", as: "withdraws" });
	withdraw.belongsTo(copy, { foreignKey: "copy_id", as: "copy" });

	book.belongsToMany(tag, {
		through: "books_tag",
		as: "tags",
		foreignKey: "book_id",
	});

	tag.belongsToMany(book, {
		through: "books_tag",
		as: "books",
		foreignKey: "tag_id",
	});

	book.hasMany(request, { foreignKey: "book_id", as: "requests" });
	request.belongsTo(book, { foreignKey: "book_id", as: "book" });
};

export { associations };
