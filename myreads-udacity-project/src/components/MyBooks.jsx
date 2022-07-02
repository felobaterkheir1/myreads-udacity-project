import React from "react";

function MyBooks({books, handleMovingBook}) {
   
  const bookCover = (books) => {
    const img =
      typeof books.imageLinks === "undefined"
        ? `url("https://via.placeholder.com/500")`
        : `url(${books.imageLinks.thumbnail})`;
    return img;
  };

  const authorName = (books) => {
    const author =
      typeof books.authors === "undefined"
        ? "No Author"
        : books.authors.map((author) => {
            return `${author}, `;
          });

    return author;
  };



  return (
    <div>
      
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage:
              `${bookCover(books)}`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select defaultValue={books.shelf ? books.shelf : 'none'} onChange={(event)=> handleMovingBook(books, event.target.value)} >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{books.title}</div>
        <div className="book-authors">{authorName(books)}</div>
      </div>
    </div>
  );
}

export default MyBooks;
