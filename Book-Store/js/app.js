class Book {
  constructor(title, author, isbn) {
      this.title = title;
      this.author = author;
      this.isbn = isbn;
  }
}

class UIOperations {
  addBooks(book) {
    const list = document.querySelector(".book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td>
                <i class="fa fa-trash delete" style="cursor:pointer;"></i> 
            </td>
        `;
    list.appendChild(row);
    this.clearFields();
    //show message
  }
  showAlert(message, className) {
    M.toast({ html: message, classes: className });
  }
  deleteBook(target) {
    if (target.classList.contains("delete")) {
      target.parentElement.parentElement.remove();
      StoreToLS.removeBook(
        target.parentElement.previousElementSibling.textContent
      );
      this.showAlert("Book Removed.", "red");
    }
  }
  clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";

    const titleLabel = document.querySelector("#title-label"),
      authorLabel = document.querySelector("#author-label"),
      isbnLabel = document.querySelector("#isbn-label");

    titleLabel.className = "";
    authorLabel.className = "";
    isbnLabel.className = "";
  }

  clearBookList() {
    if (confirm("Are You Sure?")) {
      const list = document.querySelector(".book-list");
      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }
      StoreToLS.clearLS();
      this.showAlert("List Cleared.", "green");
    }
  }
}

class StoreToLS {
  static checkLS() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static SaveToLS(book) {
    const books = StoreToLS.checkLS();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static displayBooks() {
    const books = StoreToLS.checkLS();
    books.forEach(function (book) {
      const ui = new UIOperations();
      ui.addBooks(book);
    });
  }

  static removeBook(isbn) {
    console.log(isbn);
    const books = StoreToLS.checkLS();
    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }

  static clearLS() {
    localStorage.clear();
  }
}

// General Events
document.addEventListener("DOMContentLoaded", StoreToLS.displayBooks);

document.querySelector("#book-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;
  const ui = new UIOperations();
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please Fill Out All The Fields.", "red");
  } else {
    const book = new Book(title, author, isbn);

    ui.addBooks(book);
    StoreToLS.SaveToLS(book);
    ui.showAlert("Book Added.", "blue");
  }
});

document.querySelector(".book-list").addEventListener("click", function (e) {
  const ui = new UIOperations();
  if (confirm("Are You Sure?")) ui.deleteBook(e.target);
});

document.querySelector(".claerAll").addEventListener("click", function (e) {
  const ui = new UIOperations();
  ui.clearBookList();
});
