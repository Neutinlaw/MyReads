import "./App.css";
import PropTypes from "prop-types";
import { map } from "lodash";
import React from "react";

const SearchBookResult = ({ bookResult, handleUpdateSelf }) => {
    return (
        <div className="search-books-results">
            <ol className="books-grid">
                {
                    bookResult.map((book) => (
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div
                                        className="book-cover"
                                        style={{
                                            width: 128,
                                            height: 193,
                                            backgroundImage:
                                                `url("${book.imageLinks.thumbnail}")`,
                                        }}
                                    ></div>
                                    <div className="book-shelf-changer">
                                        <select value={book.shelf || "none"}
                                            onChange={(ev) => handleUpdateSelf(book, ev.target.value)}
                                        >
                                            <option value="" disabled>
                                                Move to...
                                            </option>
                                            <option value="currentlyReading">
                                                Currently Reading
                                            </option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">
                                    {map(book.authors, (author) =>
                                        <a key={author}>{author}</a>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ol>
        </div>
    )
};

SearchBookResult.propTypes = {
    bookResult: PropTypes.array,
    handleUpdateSelf: PropTypes.func,
}

export default SearchBookResult;