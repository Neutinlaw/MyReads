import "./App.css";
import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import Bookshelf from "./BookShelf";
import { getAll, update } from "./BooksAPI";
import { Link } from "react-router-dom";

const ListBook = () => {
    const [listAllBook, setListAllBook] = useState([]);
    const [listCurrentReading, setListCurrentReading] = useState([]);
    const [listWantToRead, setListWantToRead] = useState([]);
    const [listRead, setListRead] = useState([]);

    const getAllBook = async () => {
        const allBook = await getAll();
        if (!isEmpty(allBook)) {
            setListAllBook(allBook);
        }
    };

    const updateBook = async (book, shelf) => {
        const updateBook = await update(book, shelf);
        if (!isEmpty(updateBook)) {
            getAllBook();
        }
    };

    useEffect(() => {
        getAllBook();
    }, []);

    useEffect(() => {
        if (!isEmpty(listAllBook)) {
            console.log(listAllBook);
            const listCurrentReading = listAllBook.filter(book => book.shelf === "currentlyReading");
            setListCurrentReading(listCurrentReading);

            const listWantToRead = listAllBook.filter(book => book.shelf === "wantToRead");
            setListWantToRead(listWantToRead);

            const listRead = listAllBook.filter(book => book.shelf === "read");
            setListRead(listRead);
        }
    }, [listAllBook]);
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                {!isEmpty(listCurrentReading) && (
                    <Bookshelf
                        shelf="Currently Reading"
                        listBook={listCurrentReading}
                        handleUpdateSelf={updateBook}
                    />
                )}

                {!isEmpty(listCurrentReading) && (
                    <Bookshelf
                        shelf="Want to Read"
                        listBook={listWantToRead}
                        handleUpdateSelf={updateBook}
                    />
                )}

                {!isEmpty(listCurrentReading) && (
                    <Bookshelf
                        shelf="Read"
                        listBook={listRead}
                        handleUpdateSelf={updateBook}
                    />
                )}
            </div>
            <div className="open-search">
                <Link to={"/search"}>Add book</Link>
            </div>
        </div>
    );
}

export default ListBook;