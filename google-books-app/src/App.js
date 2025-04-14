import React, {useState} from 'react';
import './App.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');

  const searchBooks = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
      const data = await response.json();
      setBooks(data.items || []);
    } catch (error) {
      console.log ('Error fetching books:', error);
    }
  };

return (
  <div className="p-4 max-w-xl mx-auto">
    <h1 className="text-2xl font-bold mb-4">Google Books Search</h1>

    <form onSubmit={searchBooks} className="mb-4 flex gap-2">
      <input
        type="text"
        placeholder="Search for books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 flex-grow rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Search
      </button>
    </form>

    <div className="space-y-4">
      {books.map((book) => (
        <div key={book.id} className="border p-4 rounded shawow">
          <h2 className="text-xl font-semibold">{book.volumeInfo.title}</h2>
          <p className="text-sm text-gray-600">
            {book.volumeInfo.authors?.join(', ') || "Unkown Author"}
            </p>
          {book.volumeInfo.imageLinks && (
            <img src={book.volumeInfo.imageLinks.thumbnail}
              alt={book.volumeInfo.title}
              className="mt-2"
            />
          )}
        </div>
      ))}
    </div>
  </div>
)

}

export default App;
