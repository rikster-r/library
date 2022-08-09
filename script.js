let myLibrary = [];

function handleSubmit(form) {
    const title = form.get('title');
    const author = form.get('author');
    const pagesCount = form.get('pagesCount');
    const readBook = form.get('readBook');
    const comment = form.get('comment');

    const book = new Book(title, author, pagesCount, readBook, comment);
    addBookToLibrary(book);
    updateCardButtons()
}

function updateCardButtons() {
    changeStatusButtons = document.querySelectorAll('[data-change-status]');
    removeBookButtons = document.querySelectorAll('[data-remove-book]');

    changeStatusButtons.forEach(button => button.addEventListener('click', function(e) {
        let img;
        if (this.tagName === 'IMG') {
            bookCard = this.parentElement.parentElement.parentElement;
            img = this;
        } else {
            bookCard = this.parentElement.parentElement;
            img = this.firstElementChild;
        }
        changeReadStatus(bookCard, img);
    }));
}

function Book(title, author, pagesCount, readBook, comment) {
    this.title = title;
    this.author = author;
    this.pagesCount = pagesCount;
    this.readBook = readBook;
    this.comment = comment;
}

function addBookToLibrary(book) {
    myLibrary.push(book);

    createBookElement(book);
}

function createBookElement(book) {
    /* example
    <div class="book-card" data-card-num="0">
            <div class="text">
                <h2>Harry Potter</h2>
                <p>Author: Joan Rowling</p>
                <p>Pages Count: 348</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa harum iure maxime obcaecati!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic pariatur molestias, rerum dolorum quas
                    similique, fugit quod quae enim maxime ex ab doloremque vero voluptate perferendis nobis sit,
                    quaerat aspernatur?</p>
            </div>

            <div class="book-card-controls">
                <button type="button" data-complete-book><img src="icons/book-check.svg" alt=""></button>
                <button type="button" data-remove-book><img src="icons/remove.svg" alt=""></button>
            </div>
        </div>
    */

    //submitted text
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.dataset.cardNum = `${myLibrary.length - 1}`;
    booksContainer.appendChild(bookCard);

    const textDiv = document.createElement('div');
    textDiv.classList.add('text');
    bookCard.appendChild(textDiv);

    const title = document.createElement('h2');
    title.innerText = `${book.title}`;
    textDiv.appendChild(title);

    const author = document.createElement('p');
    author.innerText = `Author: ${book.author}`;
    textDiv.appendChild(author);

    const pagesCount = document.createElement('p');
    pagesCount.innerText = `Pages Count: ${book.pagesCount}`;
    textDiv.appendChild(pagesCount)

    if (book.comment) {
        const comment = document.createElement('p');
        comment.innerText = `${book.comment}`;
        textDiv.appendChild(comment);
    }


    //buttons
    const bookCardControls = document.createElement('div');
    bookCardControls.classList.add('book-card-controls');
    bookCard.appendChild(bookCardControls);

    const changeStatusButton = document.createElement('button');
    changeStatusButton.setAttribute('type', 'button');
    changeStatusButton.dataset.changeStatus = '';
    bookCardControls.appendChild(changeStatusButton)

    const bookCheckImg = document.createElement('img');
    bookCheckImg.src = "icons/book-check.svg";
    changeStatusButton.appendChild(bookCheckImg);

    const removeBookButton = document.createElement('button');
    removeBookButton.setAttribute('type', 'button');
    removeBookButton.dataset.removeBook = '';
    bookCardControls.appendChild(removeBookButton)

    const trashcanImg = document.createElement('img');
    trashcanImg.src = "icons/remove.svg";
    removeBookButton.appendChild(trashcanImg);

    if (book.readBook) {
        changeReadStatus(bookCard, changeStatusButton);
    }
}

function changeReadStatus(bookCard, img) {
    bookCard.classList.toggle('complete');

    console.log(img.src)
    if (img.src == `${document.location.origin}/icons/book-check.svg`) {
        img.src = 'icons/book-uncheck.svg';
    } else {
        img.src = 'icons/book-check.svg';
    }
}

const modalForm = document.querySelector('[data-modal]');
const openFormButton = document.querySelector('[data-open-form]');
const closeFormButton = document.querySelector('[data-close-form]');
const formElement = document.querySelector('[data-form]')
const formInputs = document.querySelectorAll('[data-form-input]');
const booksContainer = document.querySelector('[data-books-container]');
let changeStatusButtons = undefined;
let removeBookButtons = undefined;

updateCardButtons();

openFormButton.addEventListener('click', function () {
    formInputs.forEach(input => input.value = '');
    modalForm.showModal();
})

closeFormButton.addEventListener('click', function () {
    modalForm.close();
})

formElement.addEventListener('submit', function (e) {
    const form = new FormData(this);
    handleSubmit(form);
})

//TODO 1.fix bug with book not complete on form sumbit;
//TODO 2.add remove functionality with array
//TODO 3.fix bug with book not toggling complete after adding new book
//TODO 4.fix bug with horizontal overflow with long comment in newly added book;
//TODO 5.define working sizing for cards