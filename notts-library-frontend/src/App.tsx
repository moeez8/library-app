import Header from "./components/Header";
import BookList from "./components/BookList";
import AddForm from "./components/AddForm";

function App() {
  return (
    <div className="max-w-7xl m-auto">
      <Header />
      <BookList />
      <AddForm />

    </div>
  );
}

export default App;
