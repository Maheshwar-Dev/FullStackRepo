import React, { useState, useEffect } from "react";

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
          setLibrary(
            library.map((b) => (b.id === editId ? updated : b))
          );
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
    <div style={{ padding: "25px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>My Book Tracker</h1>
      
      <form onSubmit={handleSave} style={{ marginBottom: "15px" }}>
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
        <button type="submit">
          {editId ? "Save Changes" : "Add Book"}
        </button>
      </form>

      <input
        type="text"
        placeholder="Search titles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: "20px", width: "100%", padding: "5px" }}
      />

      <ul style={{ listStyle: "none", padding: 0 }}>
        {visibleBooks.map((book) => (
          <li
            key={book.id}
            style={{
              marginBottom: "10px",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <strong>{book.title}</strong> — {book.author}
            <div style={{ marginTop: "5px" }}>
              <button onClick={() => handleEdit(book)}>✏️ Edit</button>
              <button
                onClick={() => handleRemove(book.id)}
                style={{ marginLeft: "8px" }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
