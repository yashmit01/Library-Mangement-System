# Library Management System

A **console-based Library Management System** written in C++ with a **React frontend** for interactive user interface. This project allows users to manage books in a library, including adding, deleting, searching, sorting, and displaying books with details such as title, author, pages, price, and ISBN.

---

## Features

- **Add Book**: Add a new book to the library with title, author, pages, price, and ISBN.
- **Display All Books**: List all books in the library.
- **Find Books by Author**: Search and display books written by a specific author.
- **Count Total Books**: Display the total number of books in the library.
- **Search Book by Title**: Search for a book by its title.
- **Delete Book by ISBN**: Remove a book from the library using its ISBN.
- **Sort Books by Title**: Sort and display books alphabetically by title.
- **Sort Books by Author**: Sort and display books alphabetically by author.
- **Prevent Duplicate ISBNs**: Ensures no two books have the same ISBN.
- **Interactive React Frontend**: Provides a modern UI for managing the library.

---

### Prerequisites

- C++ compiler (e.g., g++, clang++)
- Node.js and npm (for React frontend)
- Any IDE or terminal to compile and run C++ programs

### Running the Program

Run the following commands **in one go**:

```bash
git clone https://github.com/shivvrai/Library-Mangement-System.git
cd Library-Mangement-System
g++ -o library main.cpp
./library
cd frontend
npm install
npm start
