const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;

  this.info = function () {
    textRead =''
    if(this.isRead){
        textRead = "read"
    }
    else {
        textRead = "not read yet"
    }
    return `${this.title} by ${this.author}, ${this.pages} pages, ${textRead}`;
  }

}

function addBookToLibrary(book) {
  
}

theHobbits = Book("The Hobbit", "J.R.R. Tolkien", 295, false)

console.log(theHobbits.info())