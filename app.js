//* Book Class
class Book {
    constructor(title, author, isbn) {
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}


//* User Inputs Handle Task Class
class UI {
    static displayBooks() {
        const books = Storage.getBooks()

        books.forEach(book => UI.addBookToList(book))
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list')

        const row = document.createElement('tr')

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `

        list.appendChild(row)
    }

    static clearInputs() {
        document.querySelector('#title').value = ''
        document.querySelector('#author').value = ''
        document.querySelector('#isbn').value = ''
    }

    static removeBook(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove()
        }
    }
}


//* Local Storage Class
class Storage {
    static getBooks() {
        let books
        if(localStorage.getItem('books') === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }

        return books
    }

    static addBook(book) {
        const books = Storage.getBooks()
        
        books.push(book)

        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(isbn) {
        const books = Storage.getBooks()

        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1)
            }
        })

        localStorage.setItem('books', JSON.stringify(books))
    }
}

//* Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)

//* Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // prevent submit
    e.preventDefault()
    
    const title = document.querySelector('#title').value
    const author = document.querySelector('#author').value
    const isbn = document.querySelector('#isbn').value

    if(title === '' || author === '' || isbn === '') {
        alert('Pleas fill in all fields')
    }
    else {
        const book = new Book(title, author, isbn)

        // Add book to local storage
        Storage.addBook(book)

        // Display book in the html table
        UI.addBookToList(book)

        // clear inputs fields after btn click
        UI.clearInputs()
    }
})


//* Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    // Remove element form html table
    UI.removeBook(e.target)

    // Remove element from local storage
    Storage.removeBook(e.target.parentElement.previousElementSibling.textContent)
})