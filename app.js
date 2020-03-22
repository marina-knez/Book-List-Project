class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.querySelector('.book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `;
        list.appendChild(row);
    }

    showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');
        const form = document.querySelector('.book-form');

        container.insertBefore(div, form);

        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

class Store {
    static getBooks() {
        let books;

        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI();

            ui.addBookToList(book);
        })
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach(function(book, index) {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

document.addEventListener('DOMContentLoaded', Store.displayBooks);

document.querySelector('.btn').addEventListener('click', function(e) {
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value

    const book = new Book(title, author, isbn);

    const ui = new UI();

    if(title === '' || author === '' || isbn === '') {
        ui.showAlert('Please fill in all fields!', 'error');
    } else {
        ui.addBookToList(book);
        Store.addBook(book);
        ui.showAlert('Book added!', 'success');
        ui.clearFields();
    }

    e.preventDefault();
});

document.querySelector('.book-list').addEventListener('click', function(e){
    const ui = new UI();

    ui.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    ui.showAlert('Book removed!', 'success');

    e.preventDefault();
});


let selection = document.querySelector('.list');

selection.addEventListener('change', function() {
    let selectedItem = selection.options[selection.selectedIndex];

    if (selectedItem.value === 'title') {

    document.querySelector('#filter').addEventListener('keyup', filterBooks);

    function filterBooks() {
        const input = document.querySelector('#filter');
        const filter = input.value.toLowerCase();
        const table = document.querySelector('.table');
        const tr = table.getElementsByTagName('tr');

        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName('td')[0];
            if (td) {
                const text = td.textContent || td.innerText;
                if (text.toLowerCase().indexOf(filter) != -1) {
                    tr[i].style.display = '';
                } else {
                    tr[i].style.display = 'none';
                }
            } 
        }
    }
    } else if (selectedItem.value === 'author') {

        document.querySelector('#filter').addEventListener('keyup', filterBooks);

        function filterBooks() {
        const input = document.querySelector('#filter');
        const filter = input.value.toLowerCase();
        const table = document.querySelector('.table');
        const tr = table.getElementsByTagName('tr');
        
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName('td')[1];
            if (td) {
                const text = td.textContent || td.innerText;
                if (text.toLowerCase().indexOf(filter) != -1) {
                    tr[i].style.display = '';
                } else {
                    tr[i].style.display = 'none';
                }
            } 
        }
    }
    } else {
        document.querySelector('#filter').addEventListener('keyup', filterBooks);

        function filterBooks() {
            const input = document.querySelector('#filter');
            const filter = input.value.toLowerCase();
            const table = document.querySelector('.table');
            const tr = table.getElementsByTagName('tr');
        
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName('td')[2];
                if (td) {
                    const text = td.textContent || td.innerText;
                    if (text.toLowerCase().indexOf(filter) != -1) {
                        tr[i].style.display = '';
                    } else {
                        tr[i].style.display = 'none';
                    }
                } 
            }
        }
    }
});