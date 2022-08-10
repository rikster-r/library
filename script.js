function handleSubmit(form) {
  const title = form.get('title');
  const author = form.get('author');
  const pagesCount = form.get('pagesCount');
  const readBook = form.get('readBook');
  const comment = form.get('comment');

  const book = new Book(title, author, pagesCount, readBook, comment);
  createBookElement(book);
}

function Book(title, author, pagesCount, readBook, comment) {
  this.title = title;
  this.author = author;
  this.pagesCount = pagesCount;
  this.readBook = readBook;
  this.comment = comment;
}

function changeReadStatus(bookCard, img) {
  bookCard.classList.toggle('complete');
  img.classList.toggle('completed-img-src');
}

function updateButtonsEventListeners(changeStatusButton, removeBookButton) {
  changeStatusButton.addEventListener('click', function () {
    console.log(this)
    let bookCard = this.parentElement.parentElement;
    let img = this.firstElementChild;
    changeReadStatus(bookCard, img);
  });
  removeBookButton.addEventListener('click', function () {
    let bookCard = this.parentElement.parentElement;
    bookCard.remove();
  })
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
  bookCardControls.classList.add('book-card-controls', 'inline');
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
    changeReadStatus(bookCard, bookCheckImg);
  }

  updateButtonsEventListeners(changeStatusButton, removeBookButton);
}

const modalForm = document.querySelector('[data-modal]');
const openFormButton = document.querySelector('[data-open-form]');
const closeFormButton = document.querySelector('[data-close-form]');
const formElement = document.querySelector('[data-form]')
const formInputs = document.querySelectorAll('[data-form-input]');
const booksContainer = document.querySelector('[data-books-container]');
const changeStatusButton = document.querySelector('[data-change-status]');
const removeBookButton = document.querySelector('[data-remove-book]');

updateButtonsEventListeners(changeStatusButton, removeBookButton);

openFormButton.addEventListener('click', function () {
  formInputs.forEach(input => input.value = '');
  modalForm.showModal();
})

closeFormButton.addEventListener('click', function () {
  modalForm.close();
})

formElement.addEventListener('submit', function () {
  const form = new FormData(this);
  handleSubmit(form);
})