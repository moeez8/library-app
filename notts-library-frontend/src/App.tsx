import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import BookList from "./components/BookList";
import AddForm from "./components/AddForm";

function App() {
  return (
    <div className="max-w-7xl m-auto">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/AddBook" element={<AddForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
