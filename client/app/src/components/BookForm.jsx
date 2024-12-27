import { useRef } from "react";
import axios from "axios";

function BookForm({ setBooks }) {
  const bookTitle = useRef(null);
  const bookYear = useRef(null);

  async function handleSubmit() {
    const title = bookTitle.current.value;
    const release_year = bookYear.current.value;

    const payload = {
      title,
      release_year: parseInt(release_year, 10), // Ensure it's an integer
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:7000/api/books/create/",
        payload
      );
      console.log("Book created successfully:", response.data);
      setBooks((prev) => [...prev, response.data]);
      // Clear inputs
      bookTitle.current.value = "";
      bookYear.current.value = "";
    } catch (e) {
      console.log("Error submitting the book:", e.response?.data || e.message);
    }
  }

  return (
    <div className="flex flex-col my-8">
      <input
        ref={bookTitle}
        className="border border-white my-4 p-2"
        type="text"
        placeholder="Title of book"
      />
      <input
        ref={bookYear}
        className="border border-white my-4 p-2"
        type="number"
        placeholder="Year of book"
      />
      <button
        onClick={handleSubmit}
        className="btn py-4 px-8 my-4 bg-cyan-500 text-white hover:bg-cyan-700"
      >
        Submit
      </button>
    </div>
  );
}

export default BookForm;
