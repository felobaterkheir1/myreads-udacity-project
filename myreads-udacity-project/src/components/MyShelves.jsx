import React from 'react'

import MyBookShelf from './MyBookShelf';


function MyShelves({books, handleMovingBook}) {
    
    const shelf1 = books.filter((book)=> book.shelf === "currentlyReading");
    const shelf2 = books.filter((book)=> book.shelf === "wantToRead");
    const shelf3 = books.filter((book)=> book.shelf === "read");
  return (
    <div>
      <MyBookShelf shelfName="Currently Reading" books={shelf1} handleMovingBook= {handleMovingBook}/>
      <MyBookShelf shelfName="Want to Read" books={shelf2} handleMovingBook= {handleMovingBook}/>
      <MyBookShelf shelfName="Read" books={shelf3} handleMovingBook= {handleMovingBook}/>
    </div>
  )
}

export default MyShelves
