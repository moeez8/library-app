import { useState, useEffect } from "react";

const SearchBar = ({ OnSearchSubmit }: { OnSearchSubmit?: (term: string) => void }) => {
	const [searchTerm, setSearchTerm] = useState<string>();

	const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (OnSearchSubmit && searchTerm) OnSearchSubmit(searchTerm);
	};

	const handleSearchBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	return (
		<div className="card">
			<form onSubmit={handleSearchSubmit} className="flex">
				<input className="form-input" name="search" placeholder="Search..." onChange={handleSearchBoxChange} />
				<button className="button-green" type="submit">
					Search
				</button>
			</form>
		</div>
	);
};

export default SearchBar;
