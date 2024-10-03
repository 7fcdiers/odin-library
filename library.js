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

function displayLibrary() {
  
  const contChildren = container.children;
  for(const child of contChildren) {
    console.log(child);
    container.removeChild(child);
  }
  
  if(myLibrary.length > 0){
    for (i = 0; i <= myLibrary.length - 1; i++) {
      addCard(myLibrary[i]);
    }

  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  displayLibrary();
}

function removeBookFromLibraryById(idBook){
  delete myLibrary[idBook];
  console.log(myLibrary);
  myLibrary.filter((book) => book != null);
  console.log(myLibrary);
  displayLibrary();
}

function findBookIndexInLibrary(book){
  for(i=0;i<=myLibrary.length-1;i++) {
    if(book === myLibrary[i]) {
      return i
    }
  }
  return -1 // book not in library

}


const newBookBtn = document.getElementById("newBook");
const dialog = document.querySelector("dialog");

newBookBtn.addEventListener("click", function () {
  dialog.showModal();
})

const form = document.querySelector("#newBookForm");
let inputTitle = document.querySelector("#inputTitle");
let inputAuthor = document.querySelector("#inputAuthor");
let inputPages = document.querySelector("#inputPages");
let inputRead = document.querySelector("#inputRead");


btnClose = document.querySelector("#btn-close");
btnClose.addEventListener("click", () => {
  dialog.close();
});

const container = document.querySelector("#container-grid");


function updateCard(idBook) {

    console.log(idBook);
    console.log(myLibrary[idBook]);

    const card = document.querySelector("#card-" + idBook)
    const title = document.querySelector("#title-" + idBook);
    title.textContent = myLibrary[idBook].title;
    
    const author = document.querySelector("#author-"+ idBook);
    author.textContent = myLibrary[idBook].author;
    
    const pages = document.querySelector("#pages-"+ idBook);
    pages.textContent = myLibrary[idBook].pages + " pages";
    
    const read = document.querySelector("#read-"+ idBook);
    if(myLibrary[idBook].read){
      read.textContent = "Read : ✅"
    } else {
      read.textContent = "Read : ❌"
    }

}

function addCard(book) {
  if(Object.getPrototypeOf(book) === Book.prototype) {

    const idBook = findBookIndexInLibrary(book);

    const card = document.createElement("div");
    card.className = "card";
    card.id = "card-" + idBook;

    const title = document.createElement("div");
    title.className = "title";
    title.id = "title-" + idBook;
    title.textContent = book.title;
    card.appendChild(title);

    const author = document.createElement("div");
    author.className = "author";
    author.id = "author-" + idBook
    author.textContent = book.author;
    card.appendChild(author);

    const info = document.createElement("div");
    info.className = "info";

    const pages = document.createElement("div");
    pages.className = "pages";
    pages.id = "pages-" + idBook
    pages.textContent = book.pages + " pages";
    info.appendChild(pages);

    const read = document.createElement("div");
    read.id = "read-" + idBook;
    console.log(book.isRead);
    if(book.isRead){
      read.clasName = "is-read";
      read.textContent = "Read : ✅"
    } else {
      read.clasName = "not-read";
      read.textContent = "Read : ❌"
    }

    info.appendChild(read);

    divAction = document.createElement("div");
    divAction.className = "div-action";

    btnRemove = document.createElement("button");
    btnRemove.className = "btn-remove";
    btnRemove.textContent = "Remove";
    btnRemove.id= "rm-" + idBook;

    btnRemove.addEventListener("click", (e) => {
      removeBookFromLibraryById(idBook);
    })
    divAction.appendChild(btnRemove);

    const btnRead = document.createElement("button");
    if(!book.isRead){
      
      btnRead.className = "btn-read";
      btnRead.textContent = "Read"
      btnRead.id = "markRead-" + idBook;

      btnRead.addEventListener("click", (e) => {
          myLibrary[idBook].read = true;
          updateCard(idBook);
          divAction.removeChild(btnRead);
      })
      divAction.appendChild(btnRead);
    }


    card.appendChild(divAction);



    card.appendChild(info);

    container.appendChild(card);



  }
}

form.addEventListener("submit", () => {

  const book = new Book(inputTitle.value,
                  inputAuthor.value,
                  inputPages.value,
                  inputRead.checked);
    
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = "";
    inputRead.checked = false;
    
    addBookToLibrary(book);
  
})