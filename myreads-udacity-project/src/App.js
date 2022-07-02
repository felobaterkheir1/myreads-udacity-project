import React, {useState} from "react";

import { Routes, Route } from "react-router-dom";
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import Search from "./pages/Search";
import Home1 from "./pages/Home1";

function BooksApp() {
  const [books, setNewBooks] = useState([]);
  const movingBook = (book, shelf) => {
    BooksAPI.update(book, shelf).catch((err) => {
      console.log(err);
      setNewBooks({ error: true });
    });
    if (shelf === "none") {
      setNewBooks(books.filter((b) => b.id !== book.id));
    } else {
      book.shelf = shelf;
      setNewBooks(books.filter((b) => b.id !== book.id).concat(book));
    }
  };
  return (
    <div className="app">
      {/*Search page*/}
      <Routes>
        <Route exact path="/search" element={<Search handleMovingBook={movingBook}/>} />
        {/*Main Page*/}
        <Route exact path="/" element={<Home1 handleMovingBook={movingBook} />} />
      </Routes>
    </div>
  );
}

export default BooksApp;
