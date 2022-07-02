import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import MyBooks from "../components/MyBooks";

function Search({handleMovingBook}) {
  {/* states of the querey, books in search page, also the merged states that reflects on the search page from the main page */}
  const [books, setNewBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const [mergedStates, setMergedStates] = useState([]);
  const [arrayBooks, setArrayBooks] =useState(new Map())

  {/* useEffect hook to reflect all the books with their new states in the main page */}
  useEffect(() => {
    BooksAPI.getAll().then((data) => {
      setNewBooks(data)
      setArrayBooks(createMapOfBooks(data))
    }
    
    );
    ;
  }, []);

  {/* a function  to loop through the books and create new map of books to easily filter their shelves through the id */}
  const createMapOfBooks = (books) => {
    const newMap = new Map();
    books.map(book => newMap.set(book.id, book));
    return newMap
  }

  {/* A hook to combine the state of the book in the main page with its state in the search page */}
  useEffect(()=>{
    const combinedStates = searchResults.map(book=>{
      if(arrayBooks.has(book.id)){
        return arrayBooks.get(book.id);
      }else{
        return book
      }
    })
    setMergedStates(combinedStates)
  },[searchResults]
  )

  {/* A hook to search the query */}
  useEffect(() => {
    let isActive = true;
    if (searchQuery.trim()) {
      BooksAPI.search(searchQuery).then((result) => {
        if (result.error) console.log(result);
        else {
          if (isActive) {
            //let filteredResult = result.filter((result) =>
             // result.title.toLowerCase().includes(searchQuery)
            //);
            setSearchResults(result);
          }
        }
      });
    }

    return () => {
      isActive = false;
      setSearchResults([]);
    };
  }, [searchQuery]);
  return (
    <div>
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {mergedStates &&
              mergedStates.length > 0 &&
              mergedStates.map((book) => (
                <li key={book.id}>
                  <MyBooks key={book.id} books={book} handleMovingBook={handleMovingBook}  />
                  
                </li>
              ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Search;
