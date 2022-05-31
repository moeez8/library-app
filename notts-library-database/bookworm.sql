DROP TABLE IF EXISTS withdrawals;
DROP TABLE IF EXISTS copies;
DROP TABLE IF EXISTS books;

CREATE TABLE books 
(
	id serial NOT NULL PRIMARY KEY,
	title varchar,
	iban varchar,
	author varchar,
	type varchar,
	category varchar,
	cover_photo varchar,
	description varchar
);

CREATE TABLE copies
(
	id serial NOT NULL PRIMARY KEY,
	book_id serial NOT NULL,
	CONSTRAINT fk_book_id FOREIGN KEY (book_id) REFERENCES books(id)
);

CREATE TABLE withdrawals
(
	id serial NOT NULL PRIMARY KEY,
	copy_id serial NOT NULL,
	CONSTRAINT fk_copy_id FOREIGN KEY (copy_id) REFERENCES copies(id)
)