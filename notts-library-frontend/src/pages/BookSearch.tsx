import Header from "../components/Header";
import SearchBar from "../components/bookSearch/SearchBar";
import SearchBookList from "../components/bookSearch/SearchBookList";
import { useSearchParams } from "react-router-dom";

import { useState } from "react";

const BookSearch = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const [searchTerm, setsearchTerm] = useState(() => searchParams.get("term")?.toString());

	const updateSearch = (term: string) => {
		setsearchTerm(term);
	};

	return (
		<>
			<Header />
			<SearchBar OnSearchSubmit={updateSearch} />
			<SearchBookList searchTerm={searchTerm} />
		</>
	);
};

export default BookSearch;
