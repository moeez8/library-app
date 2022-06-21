describe("Add Book", () => {
	it("User Can Add Book", () => {
		cy.visit("http://localhost:3000/");
		//Visit Add Book Page
		cy.findByRole("link", { name: /add a book/i }).click();

		//Fill in ISBN
		cy.findByPlaceholderText("Please enter 10 or 13 digit ISBN").click().type("1234-67890");

		//Check Ok (Enter form info manually) Book
		cy.findByPlaceholderText("Book Title").click()
		cy.findByRole("button", {
			name: /ok/i,
		}).click();

		//Fill In Form Info
		cy.findByPlaceholderText("Book Title").click().type("The Goldfish");
		cy.findByPlaceholderText("Book Author").click().type("Mo");
		cy.findByPlaceholderText("Book Description").click().type("The Goldfish");

		//Check Add Book
		cy.findByRole("radio", {
			name: /add book/i,
		}).check();
		//Submit Form
		cy.findByRole("button", {
			name: /submit/i,
		}).click();

		//Return To Book List

		//Verify Book Was Added
	});
});
