const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;

  this.info = function () {
    textRead = ''
    if (this.isRead) {
      textRead = "read"
    } else {
      textRead = "not read yet"
    }
    return `${this.title} by ${this.author}, ${this.pages} pages, ${textRead}`;
  };

}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayLibrary() {
  for (i = 0; i <= myLibrary.length - 1; i++) {
    console.log(myLibrary[i].info());
  }
}

const newBookBtn = document.getElementById("newBook");
const dialog = document.querySelector("dialog");

newBookBtn.addEventListener("click", function () {
  
  dialog.showModal();
})

const form = document.querySelector("#newBookForm");
const inputTitle = document.querySelector("#inputTitle");
const inputAuthor = document.querySelector("#inputAuthor");
const inputPages = document.querySelector("#inputPages");
const inputRead = document.querySelector("#inputRead");


btnClose = document.querySelector("#btn-close");
btnClose.addEventListener("click", () => {
  inputTitle.setAttribute("required","false");
  inputAuthor.setAttribute("required","false");
  inputPages.setAttribute("required","false");

  dialog.close();
  inputTitle.setAttribute("required","true");
  inputAuthor.setAttribute("required","true");
  inputPages.setAttribute("required","true");

});

const container = document.querySelector("#container-grid");

function addCard(book) {
  if(Object.getPrototypeOf(book) === Book.prototype) {
    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("div");
    title.className = "title";
    title.textContent = book.title;
    card.appendChild(title);

    const author = document.createElement("div");
    author.className = "author";
    author.textContent = book.author;
    card.appendChild(author);

    const info = document.createElement("div");
    info.className = "info";

    const pages = document.createElement("div");
    pages.className = "pages";
    pages.textContent = book.pages + " pages";
    info.appendChild(pages);

    const read = document.createElement("div");
    if(book.read){
      read.clasName = "is-read";
      read.textContent = "Read : ✅"
    } else {
      read.clasName = "not-read";
      read.textContent = "Read : ❌"
    }

    info.appendChild(read);

    card.appendChild(info);

    container.appendChild(card);



  }
}



form.addEventListener("submit", () => {
  const book = new Book(inputTitle.value,
                  inputAuthor.value,
                  inputPages.value,
                  inputRead.value === "true");
    
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = "";
    inputRead.value = false;
    
    addBookToLibrary(book);
    dialog.close();

    addCard(book);
  
})