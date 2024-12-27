import "./App.css";
import { useState, useEffect } from "react";
import Books from "./components/Books";
import BookForm from "./components/BookForm";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:7000/api/books/");
        const data = await response.json();
        setBooks(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="app">
      <div className="flex flex-col justify-center items-center bg-slate-900">
        <h1 className="text-3xl font-bold text-cyan-300">Welcome to Books!</h1>
        <BookForm setBooks={setBooks} />
        <Books data={books} setBooks={setBooks} />
      </div>
    </div>
  );
}

export default App;
