import Book from "./Book";

function Books({ data, setBooks }) {
  if (!data || data.length === 0) {
    return <p className="text-white">No books available</p>;
  }

  return (
    <section>
      <div className="flex items-center justify-center">
        <h1 className="text-3xl text-cyan-300">Books</h1>
      </div>
      <div className="flex flex-wrap justify-center">
        {data.map((book) => (
          <Book
            key={book.id}
            id={book.id}
            title={book.title}
            release_year={book.release_year}
            setBooks={setBooks}
          />
        ))}
      </div>
    </section>
  );
}

export default Books;
