import app from "../../src/app";
import request from "supertest";

const mockBookService = {
	searchBooks: jest.fn(),
	getAllBooks: jest.fn(),
	getBookByID: jest.fn(),
	createNewBook: jest.fn(),
	updateBookByID: jest.fn(),
	getCopiesByBookID: jest.fn(),
	getTagsByBookID: jest.fn(),
	deleteBookByID: jest.fn(),
};

describe("GET /book", () => {
	describe("on request", () => {
		test("should respond with a 200 status code", async () => {
			const res = await request(app).get("/book").send();
			expect(res.statusCode).toBe(200);
		});

		test("should specify json in the content type header", async () => {
			const res = await request(app).get("/book").send();
			expect(res.header["content-type"]).toEqual(expect.stringContaining("json"));
		});

		test("response should contain array of books", async () => {
			const res = await request(app).get("/book").send();
			expect(res.body.books).toBeDefined();
		});
	});
});

describe("POST /book", () => {
	describe("given required data for a new book", () => {
		test("should respond with a 200 status code", async () => {
			const res = await request(app).post("/book").send({
				title: "",
				author: "",
				description: "",
				ISBN: "",
			});

			expect(mockBookService.createNewBook.mock.calls.length).toBe(1);
			expect(res.statusCode).toBe(200);
		});

		test("should specify json in the content type header", async () => {
			const res = await request(app).post("/book").send();
			expect(res.header["content-type"]).toEqual(expect.stringContaining("json"));
		});

		test("response should contain new book id", async () => {
			const res = await request(app).post("/book").send();
			expect(res.body.bk).toBeDefined();
		});
	});

	describe("given incomplete data for a new book", () => {
		test("should respond with a 400 status code", async () => {
			const res = await request(app).post("/book").send();

			expect(res.statusCode).toBe(400);
		});
	});
});

describe("GET /book:id", () => {
	describe("given valid id", () => {
		test("should respond with a 200 status code", async () => {
			const res = await request(app)
				.get("/book/" + 2)
				.send();

			expect(res.statusCode).toBe(200);
		});

		test("should specify json in the content type header", async () => {
			const res = await request(app)
				.get("/book/" + 999999)
				.send();
			expect(res.header["content-type"]).toEqual(expect.stringContaining("json"));
		});
	});

	describe("given invalid id", () => {
		test("should respond with a 400 status code", async () => {
			const res = await request(app)
				.get("/book/" + 999)
				.send();

			expect(res.statusCode).toBe(400);
		});
	});
});

describe("PUT /book:id", () => {
	describe("given valid id", () => {
		test("should respond with a 200 status code", async () => {
			const res = await request(app)
				.put("/book/" + 2)
				.send();

			expect(res.statusCode).toBe(200);
		});

		test("should specify json in the content type header", async () => {
			const res = await request(app)
				.put("/book/" + 2)
				.send();
			expect(res.header["content-type"]).toEqual(expect.stringContaining("json"));
		});
	});

	describe("given invalid id", () => {
		test("should respond with a 400 status code", async () => {
			const res = await request(app)
				.put("/book/" + 2)
				.send();

			expect(res.statusCode).toBe(400);
		});
	});
});

describe("DELETE /book:id", () => {
	describe("given valid id", () => {
		test("should respond with a 200 status code", async () => {
			const res = await request(app)
				.delete("/book/" + 2)
				.send();

			expect(res.statusCode).toBe(200);
		});

		test("should specify json in the content type header", async () => {
			const res = await request(app)
				.delete("/book/" + 2)
				.send();
			expect(res.header["content-type"]).toEqual(expect.stringContaining("json"));
		});
	});

	describe("given an invalid id", () => {
		test("should respond with a 400 status code", async () => {
			const res = await request(app)
				.delete("/book/" + 2)
				.send();

			expect(res.statusCode).toBe(400);
		});
	});
});
