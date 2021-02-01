'use strict'

var gCurrBookIdx;
var gPageClicked = 1;

function onNextPage() {
    nextPage();
    getBooks();
    renderBooks();
    renderPagesNav();
}

function onSwitchPage(num) {
    switchPage(num);
    gPageClicked = num;
    renderPagesNav()
    getBooks();
    renderBooks();
}

function onPrevPage() {
    prevPage();
    getBooks();
    renderBooks();
    renderPagesNav();
}

function onInit() {
    renderBooks();
    renderPagesNav();
}

function renderBooks() {
    var books = getBooks()
    var strHtmls = books.map(function (book) {
        return `
    <tr>
        <td>${book.id}</td> 
        <td><h5 class="book-name">${book.name}</h5></td> 
        <td class="price">$${book.price}</td>
        <td><span class="read-btn" onclick="onReadBook('${book.id}')">Read</span></td>
        <td><span class="update-btn" onclick="onUpdateBook('${book.id}')">Update</span></td>
        <td><span class="delete-btn" onclick="onRemoveBook('${book.id}')">Remove</span></td>
    </tr>`
    })
    document.querySelector('tbody').innerHTML = strHtmls.join('')
}

function renderPagesNav() {
    document.querySelector('.first-page').innerText = `${gCurrPagesRangeStart + 1}`
    document.querySelector('.second-page').innerText = `${gCurrPagesRangeStart + 2}`
    document.querySelector('.third-page').innerText = `${gCurrPagesRangeStart + 3}`
    switch (gPageClicked) {
        case 1:
            document.querySelector('.first-page').style = "background-color: lightgray"
            document.querySelector('.second-page').style = "background-color: gray"
            document.querySelector('.third-page').style = "background-color: gray"
            break;
        case 2:
            document.querySelector('.first-page').style = "background-color: gray"
            document.querySelector('.second-page').style = "background-color: lightgray"
            document.querySelector('.third-page').style = "background-color: gray"
            break;
        case 3:
            document.querySelector('.first-page').style = "background-color: gray"
            document.querySelector('.second-page').style = "background-color: gray"
            document.querySelector('.third-page').style = "background-color: lightgray"
            break;
    }
}

function onSortBy(param) {
    sortBy(param);
    renderBooks();
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}

function onAddBook() {
    var name = document.querySelector('input[name=book-name]').value;
    var price = document.querySelector('input[name=price]').value;
    addBook(name, price)
    renderBooks()
}

function onUpdateBook(bookId) {
    var newPrice = prompt('Enter new price');
    updateBook(bookId, newPrice);
    renderBooks();
}

function onReadBook(bookId) {
    gCurrBookIdx = getBookById(bookId);
    document.querySelector('.img').innerHTML = `<img src="img/${gBooks[gCurrBookIdx].img}.jpg">`;
    document.querySelector('p').innerText = makeLorem(60);
    document.querySelector('.book-details-price').innerText = `Price: $${gBooks[gCurrBookIdx].price}`;
    document.querySelector('.chosen-rating').innerText = gBooks[gCurrBookIdx].rate;
    document.querySelector('.modal').hidden = false;
    document.querySelector('table').hidden = true;
}

function onPlus() {
    changeBookRating('plus');
    document.querySelector('.chosen-rating').innerText = gBooks[gCurrBookIdx].rate;
}

function onMinus() {
    changeBookRating('minus');
    document.querySelector('.chosen-rating').innerText = gBooks[gCurrBookIdx].rate;
}

function onCloseModal() {
    document.querySelector('.modal').hidden = true
    document.querySelector('table').hidden = false
}
