import React from "react";

const Header = () => {
  return (
    <header className="bg-white flex justify-between rounded-md shadow-md p-4 m-2">
      <div className="flex flex-col justify-around ">
        <h1 className="text-xl font-bold">BookWorm</h1>
      </div>
      {/* <div className="flex flex-col justify-around ">
        <div className="flex gap-4">
          <h2 className="rounded-md shadow-md p-2 bg-slate-100">Home</h2>
          <h2 className="rounded-sm shadow-md p-2 bg-slate-100">Books</h2>
          <h2 className="rounded-sm shadow-md p-2 bg-slate-100">Add A Book</h2>
          <h2 className="rounded-sm shadow-md p-2 bg-slate-100">
            Request A Book
          </h2>
        </div>
      </div> */}
    </header>
  );
};

export default Header;
