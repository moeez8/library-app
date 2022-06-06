import React from "react";

const Header = () => {
  return (
    <header className="bg-white flex justify-between rounded-md shadow-md p-4 m-2">
      <div className="flex flex-col justify-around ">
        <h1 className="text-xl font-bold">BookWorm</h1>
      </div>
      <div className="flex flex-col justify-around ">
        <div className="flex gap-4">
          <h2 className="rounded-sm shadow-md p-2">Home</h2>
          <h2 className="rounded-sm shadow-md p-2">Books</h2>
          <h2 className="rounded-sm shadow-md p-2">Add A Book</h2>
          <h2 className="rounded-sm shadow-md p-2">Request A Book</h2>
        </div>
      </div>
    </header>
  );
};

export default Header;
