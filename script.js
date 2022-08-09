let myLibrary = [];

function Book(title, author, pagesCount, readBook, comment) {
    this.title = title;
    this.author = author;
    this.pagesCount = pagesCount;
    this.readBook = readBook;
    this.comment = comment;
}

function addBookToLibrary() {
    
}

function createBookElement(book) {
}

const modalForm = document.querySelector('[data-modal-form]');
const openFormButton = document.querySelector('[data-open-form]');
const closeFormButton = document.querySelector('[data-close-form]');
const formInputs = document.querySelectorAll('[data-form-input]');


openFormButton.addEventListener('click', function() {
    modalForm.showModal();
})

closeFormButton.addEventListener('click', function() {
    formInputs.forEach(input => input.value = '')
    modalForm.close();
})