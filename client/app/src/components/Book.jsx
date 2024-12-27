import { useState } from "react";
import axios from "axios";

function Book({ id, title, release_year, setBooks }) {
  const [newTitle, setNewTitle] = useState("");

  const updateTitle = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:7000/api/books/${id}/`,
        {
          title: newTitle,
          release_year,
        }
      );
      console.log("Book updated successfully:", response.data);
      setBooks((prev) =>
        prev.map((book) =>
          book.id === id ? { ...book, title: newTitle } : book
        )
      );
      setNewTitle("");
    } catch (e) {
      console.log("Error updating the book:", e.response?.data || e.message);
    }
  };

  const deleteBook = async () => {
    console.log("Deleting...");
    try {
      await axios.delete(`http://127.0.0.1:7000/api/books/${id}/`);
      console.log("Book deleted successfully");
      setBooks((prev) => prev.filter((book) => book.id !== id)); // Remove the deleted book from the state
    } catch (e) {
      console.log("Error deleting the book:", e.response?.data || e.message);
    }
  };

  return (
    <div className="p-8 m-8 border border-zinc-300">
      <div style={{ marginTop: "-20px" }} className="flex justify-end mb-4">
        <span
          onClick={deleteBook}
          className="py-2 px-4 bg-red-500 text-white hover:bg-red-700 hover:cursor-pointer"
        >
          X
        </span>
      </div>
      <p className="text-white">Title: {title}</p>
      <p className="text-white">Release Year: {release_year}</p>
      <input
        type="text"
        placeholder="New Title..."
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        className="border border-white p-2 my-2"
      />
      <button
        onClick={updateTitle}
        className="block bg-cyan-500 text-white py-4 px-8 my-4 hover:bg-cyan-700"
      >
        Change Title
      </button>
    </div>
  );
}

export default Book;
