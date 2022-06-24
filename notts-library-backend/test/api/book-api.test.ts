import app from "../../src/app";
import request from "supertest";

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
	});
});

describe("POST /book", () => {
	describe("given required data for a new book", () => {
		const book = {
			title: "Test-Book",
			author: "Test-Author",
			description: "Test-Description",
			ISBN: "Test-ISBN",
			user: "Test-User",
		};

		test("should respond with a 200 status code", async () => {
			const res = await request(app).post("/book").send(book);

			expect(res.statusCode).toBe(200);
		});

		test("should specify json in the content type header", async () => {
			const res = await request(app).post("/book").send(book);
			expect(res.header["content-type"]).toEqual(expect.stringContaining("json"));
		});

		test("response should contain new book id", async () => {
			const res = await request(app).post("/book").send(book);
			console.log(res.body);
			expect(res.body.book.id).toBeDefined();
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
	const book = {
		title: "Test-Book",
		author: "Test-Author",
		description: "Test-Description",
		ISBN: "Test-ISBN",
		user: "Test-User",
	};

	beforeEach(async () => {
		const res = await request(app).post("/book").send(book);
		id = res.body.book.id;
	});

	var id = -1;

	describe("given valid id", () => {
		test("should respond with a 200 status code", async () => {
			const res = await request(app)
				.put("/book/" + id)
				.send();

			expect(res.statusCode).toBe(200);
		});

		test("should specify json in the content type header", async () => {
			const res = await request(app)
				.put("/book/" + id)
				.send();
			expect(res.header["content-type"]).toEqual(expect.stringContaining("json"));
		});
	});

	describe("given invalid id", () => {
		test("should respond with a 400 status code", async () => {
			const res = await request(app)
				.put("/book/" + -1)
				.send();

			expect(res.statusCode).toBe(400);
		});
	});
});

describe("DELETE /book:id", () => {
	const book = {
		title: "Test-Book",
		author: "Test-Author",
		description: "Test-Description",
		ISBN: "Test-ISBN",
		user: "Test-User",
	};

	beforeEach(async () => {
		const res = await request(app).post("/book").send(book);
		id = res.body.book.id;
	});

	var id = -1;

	describe("given valid id", () => {
		test("should respond with a 200 status code", async () => {
			const res = await request(app)
				.delete("/book/" + id)
				.send();

			expect(res.statusCode).toBe(200);
		});

		test("should specify json in the content type header", async () => {
			const res = await request(app)
				.delete("/book/" + id)
				.send();
			expect(res.header["content-type"]).toEqual(expect.stringContaining("json"));
		});
	});

	describe("given an invalid id", () => {
		test("should respond with a 400 status code", async () => {
			const res = await request(app)
				.delete("/book/" + -1)
				.send();

			expect(res.statusCode).toBe(400);
		});
	});
});
