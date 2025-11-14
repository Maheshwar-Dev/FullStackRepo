import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [library, setLibrary] = useState([]);
  const [bookForm, setBookForm] = useState({ name: "", writer: "" });
  const [query, setQuery] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/books")
      .then((res) => res.json())
      .then((data) => setLibrary(data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  const handleInput = (e) => {
    setBookForm({ ...bookForm, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (editId) {
      fetch(`http://localhost:3001/books/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookForm),
      })
        .then((res) => res.json())
        .then((updated) => {
          setLibrary(library.map((b) => (b.id === editId ? updated : b)));
          setEditId(null);
          setBookForm({ name: "", writer: "" });
        });
    } else {
      fetch("http://localhost:3001/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookForm),
      })
        .then((res) => res.json())
        .then((created) => {
          setLibrary([...library, created]);
          setBookForm({ name: "", writer: "" });
        });
    }
  };

  const handleEdit = (book) => {
    setEditId(book.id);
    setBookForm({ name: book.title, writer: book.author });
  };

  const handleRemove = (id) => {
    fetch(`http://localhost:3001/books/${id}`, {
      method: "DELETE",
    }).then(() => {
      setLibrary(library.filter((b) => b.id !== id));
    });
  };

  const visibleBooks = library.filter((b) =>
    b.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="app-container">

      <img src="logo.png" alt="App Logo" className="app-logo" />

      <h1 className="title">My Book Tracker</h1>

      <form onSubmit={handleSave} className="book-form">
        <input
          type="text"
          name="name"
          placeholder="Book title"
          value={bookForm.name}
          onChange={handleInput}
          required
        />

        <input
          type="text"
          name="writer"
          placeholder="Author name"
          value={bookForm.writer}
          onChange={handleInput}
          required
        />

        <button type="submit" className="btn-primary">
          {editId ? "Save Changes" : "Add Book"}
        </button>
      </form>

      <input
        type="text"
        placeholder="Search titles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-box"
      />

      <ul className="book-list">
        {visibleBooks.map((book) => (
          <li key={book.id} className="book-card">
            <img src="book.png" alt="Book" className="book-icon" />
            <div className="book-info">
              <strong>{book.title}</strong>
              <span className="author">{book.author}</span>
            </div>

            <div className="btn-group">
              <button onClick={() => handleEdit(book)} className="icon-btn">
                <img src="edit.png" alt="Edit" />
              </button>

              <button onClick={() => handleRemove(book.id)} className="icon-btn delete">
                <img src="delete.png" alt="Delete" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
