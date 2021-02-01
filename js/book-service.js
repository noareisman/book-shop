'use strict';

const KEY = 'booksDB';
const PAGE_SIZE = 5;
var gBooks;
var gPageIdx = 0;
_createBooks();
var numOfPages = Math.round(gBooks.length / PAGE_SIZE);
var gCurrPagesRangeStart=0;

function prevPage() {
    if (gPageIdx === 0) return;
    gPageIdx--;
    gPageClicked--
    if (gPageIdx<gCurrPagesRangeStart) gCurrPagesRangeStart--;
    return gPageIdx;
}

function nextPage() {
    if (gPageIdx * PAGE_SIZE >= gBooks.length) return;
    gPageIdx++;
    gPageClicked++
    if (gPageIdx>gCurrPagesRangeStart+2) gCurrPagesRangeStart++;
    return gPageIdx;
}

function switchPage(num) {
    gPageIdx = gCurrPagesRangeStart+num - 1;
    return gPageIdx;
}

function getBooks() {
    var startIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE)
}

function _createBooks() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = []
        for (var i = 0; i < 16; i++) {
            books.push(_createBook(`book${i}`, getRandomIntInclusive(1, 100), i))
        }
    }
    gBooks = books;
    console.log(gBooks);
    _saveBooksToStorage();
}

function _createBook(name, price = getRandomIntInclusive(1, 100), imgNum = 1) {
    return {
        id: makeId(),
        name: name,
        price: price,
        img: imgNum,
        rate: 0
    }
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}


function removeBook(bookId) {
    var idx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    })
    gBooks.splice(idx, 1);
    _saveBooksToStorage();
}

function addBook(name, price) {
    gBooks.unshift(_createBook(name, price))
    _saveBooksToStorage();
}

function updateBook(bookId, newPrice) {
    var idx = getBookById(bookId);
    gBooks[idx].price = newPrice;
    _saveBooksToStorage();
}

function getBookById(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    })
    return bookIdx;
}

function changeBookRating(plusOrMinus) {
    if (plusOrMinus === 'plus' && gBooks[gCurrBookIdx].rate < 10) {
        gBooks[gCurrBookIdx].rate++;
    } else if (plusOrMinus === 'minus' && gBooks[gCurrBookIdx].rate > 0) {
        gBooks[gCurrBookIdx].rate--;
    }
    _saveBooksToStorage();
}

function sortBy(param) {
    if (param === 'title') {
        gBooks.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            } else if (a.name > b.name) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (param === 'price') {
        gBooks.sort(function (a, b) {
            return a.price - b.price
        })
    }
    _saveBooksToStorage();
}