import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white flex justify-between rounded-md shadow-md p-4 m-2">
      <div className="flex flex-col justify-around ">
        <h1 className="text-xl font-bold">BookWorm</h1>
      </div>
      <div className="flex flex-col justify-around ">
        <nav className="flex gap-4">
          <Link to={"/"}>
            <h2 className="rounded-md shadow-md p-2 bg-slate-100">Home</h2>
          </Link>
          <Link to={"/AddBook"}>
            <h2 className="rounded-md shadow-md p-2 bg-slate-100">
              Add A Book
            </h2>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
