import app from "../../src/app";
import request from "supertest";

describe("GET /book", () => {
	describe("on request", () => {
		test("should respond with a 200 status code", async () => {
			const res = await request(app).post("/book").send();
			expect(res.statusCode).toBe(200);
		});

		test("should specify json in the content type header", async () => {
			const res = await request(app).post("/book").send();
			expect(res.header["content-type"]).toEqual(expect.stringContaining("json"));
		});

		test("response should contain array of books", async () => {
			const res = await request(app).post("/book").send();
			expect(res.body.books).toBeDefined();
		});
	});
});

describe("POST /book", () => {
	describe("given required data for a new book", () => {
		test("should respond with a 200 status code", async () => {
			const res = await request(app).post("/book").send();

			expect(res.statusCode).toBe(200);
		});

		test("should specify json in the content type header", async () => {
			const res = await request(app).post("/book").send();
			expect(res.header["content-type"]).toEqual(expect.stringContaining("json"));
		});

		test("response should contain new book id", async () => {
			const res = await request(app).post("/book").send();
			expect(res.body.book_id).toBeDefined();
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
			const res = await request(app).post("/book").send();

			expect(res.statusCode).toBe(200);
		});

		test("should specify json in the content type header", async () => {
			const res = await request(app).post("/book").send();
			expect(res.header["content-type"]).toEqual(expect.stringContaining("json"));
		});
	});

	describe("given invalid id", () => {
		test("should respond with a 400 status code", async () => {
			const res = await request(app).post("/book").send();

			expect(res.statusCode).toBe(400);
		});
	});
});

describe("PUT /book:id", () => {
	describe("given valid id", () => {
		test("should respond with a 200 status code", async () => {
			const res = await request(app).post("/book").send();

			expect(res.statusCode).toBe(200);
		});

		test("should specify json in the content type header", async () => {
			const res = await request(app).post("/book").send();
			expect(res.header["content-type"]).toEqual(expect.stringContaining("json"));
		});
	});

	describe("given invalid id", () => {
		test("should respond with a 400 status code", async () => {
			const res = await request(app).post("/book").send();

			expect(res.statusCode).toBe(400);
		});
	});
});

describe("DELETE /book:id", () => {
	describe("given valid id", () => {
		test("should respond with a 200 status code", async () => {
			const res = await request(app).post("/book").send();

			expect(res.statusCode).toBe(200);
		});

		test("should specify json in the content type header", async () => {
			const res = await request(app).post("/book").send();
			expect(res.header["content-type"]).toEqual(expect.stringContaining("json"));
		});
	});

	describe("given invalid id", () => {
		test("should respond with a 400 status code", async () => {
			const res = await request(app).post("/book").send();

			expect(res.statusCode).toBe(400);
		});
	});
});
