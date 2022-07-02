import React from "react";

import MyBooks from "./MyBooks";

function MyBookShelf({books , shelfName, handleMovingBook}) {
     
  return (
    <div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          {books.map((book)=>{
              return(
                <li key={book.id}>
                  <MyBooks key={book.id} books={book} handleMovingBook= {handleMovingBook}/>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default MyBookShelf;
