import "./App.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import SearchBookResult from "./SearchBookResult";
import { search, update, getAll } from "./BooksAPI";
import { isEmpty } from "lodash";
import Modal from "react-modal";

const SearchBooks = () => {
  const [valueSearch, setValueSearch] = useState("");
  const [listAllBook, setListAllBook] = useState([]);
  const [bookSearchResult, setbookSearchResult] = useState([]);
  const [bookSearchResultDisplay, setbookSearchResultDisplay] = useState([]);
  const [modalFlag, setModalFlag] = useState(false);
  const handleChangeValue = (e) => {
    setValueSearch(e.target.value);
  }

  const getAllBook = async () => {
    const allBook = await getAll();
    if (!isEmpty(allBook)) {
      setListAllBook(allBook);
    }
  };

  const searchBook = async () => {
    if (!isEmpty(valueSearch)) {
      const bookSearch = await search(valueSearch);
      console.log(bookSearch);
      if (bookSearch && !bookSearch.error) {
        setbookSearchResult(bookSearch);
      } else {
        setbookSearchResultDisplay([]);
      } 
    } else {
      setbookSearchResultDisplay([]);
    };
  }

  const handleUpdateSelf = async (book, shelf) => {
    const updateBook = await update(book, shelf);
    if (!isEmpty(updateBook)) {
      getAllBook();
      setModalFlag(!modalFlag);
    }
  };

  const waitTime = (func, delay) => {
    let lastCall = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) return;
      lastCall = now;
      func.apply(this, args);
    };
  };

  const waitSearchBook = waitTime(searchBook, 1000); 

  useEffect(() => {
    getAllBook();
  }, []);

  useEffect(() => {
    waitSearchBook();
  }, [valueSearch]);

  useEffect(() => {
    if (!isEmpty(listAllBook) && !isEmpty(bookSearchResult)) {
      const newListBookFinal = [];
      bookSearchResult.forEach(bookInfor => {
        const mergeBook = listAllBook.filter((book) => book.id === bookInfor.id)
        if (!isEmpty(mergeBook)) {
          newListBookFinal.push(...mergeBook);
        } else {
          newListBookFinal.push(bookInfor);
        }
      });
      const filterNewListBookFinal = newListBookFinal.filter((book) => !isEmpty(book?.imageLinks?.thumbnail) && !isEmpty(book?.authors));
      setbookSearchResultDisplay(filterNewListBookFinal);
    } else if (isEmpty(listAllBook)) {
      const filterBookSearch = bookSearchResult.filter((book) => !isEmpty(book?.imageLinks?.thumbnail) && !isEmpty(book?.authors));
      setbookSearchResultDisplay(filterBookSearch);
    }
  }, [listAllBook, bookSearchResult]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/"> Close </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            value={valueSearch}
            onChange={handleChangeValue}
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <SearchBookResult
        bookResult={bookSearchResultDisplay}
        handleUpdateSelf={handleUpdateSelf}
      />
      <div className="modal">
        <Modal
          isOpen={modalFlag}
          contentLabel="Status Modal"
          onRequestClose={() => setModalFlag(!modalFlag)}
          appElement={document.getElementById("root")}
        >
          <p>You Update Book Self Success!</p>
          <button onClick={() => setModalFlag(!modalFlag)}>OK</button>
        </Modal>
      </div>
    </div>
  )
}


export default SearchBooks;