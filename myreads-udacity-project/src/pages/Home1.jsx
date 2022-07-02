import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import MyShelves from "../components/MyShelves";

function Home1({handleMovingBook}) {
  const [books, setNewBooks] = useState([])
  useEffect(() => {
    BooksAPI.getAll().then((data) => setNewBooks(data));
  }, []);

  


  return (
    <div>
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <MyShelves books={books} handleMovingBook={handleMovingBook} />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home1;
