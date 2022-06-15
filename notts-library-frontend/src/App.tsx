import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import Book from "./pages/Book";
import BookSearch from "./pages/BookSearch";
import BookRequests from "./pages/BookRequests";
import Request from "./pages/Request";

function App() {
	return (
		<div className="max-w-3xl m-auto">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/AddBook" element={<AddBook />} />
					<Route path="/Book/:id" element={<Book />} />
					<Route path="/Search" element={<BookSearch />} />
					<Route path="/Requests" element={<BookRequests />} />
					<Route path="/Request/:id" element={<Request />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
