#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <map>

using namespace std;

// Structure to represent a Book
struct Book {
    string title;
    string author;
    int pages;
    double price;
    string isbn;

    Book(string title, string author, int pages, double price, string isbn)
        : title(title), author(author), pages(pages), price(price), isbn(isbn) {}

    void display() const {
        cout << "Title: " << title
             << ", Author: " << author
             << ", Pages: " << pages
             << ", Price: $" << price
             << ", ISBN: " << isbn << endl;
    }
};

// Class to manage the Library System
class Library {
private:
    vector<Book> books;
    map<string, int> isbnIndex;

public:
    void addBook(const Book& book) {
        if (isbnIndex.count(book.isbn) > 0) {
            cout << "Error: Book with ISBN " << book.isbn << " already exists." << endl;
            return;
        }
        books.push_back(book);
        isbnIndex[book.isbn] = books.size() - 1;
        cout << "Book added successfully!" << endl;
    }

    void displayAllBooks() const {
        if (books.empty()) {
            cout << "No books in the library." << endl;
            return;
        }
        cout << "\n--- All Books in Library ---" << endl;
        for (const auto& book : books) {
            book.display();
        }
        cout << "----------------------------" << endl;
    }

    void findBooksByAuthor(const string& authorName) const {
        bool found = false;
        cout << "\n--- Books by " << authorName << " ---" << endl;
        for (const auto& book : books) {
            if (book.author == authorName) {
                book.display();
                found = true;
            }
        }
        if (!found) {
            cout << "No books found by " << authorName << "." << endl;
        }
        cout << "----------------------------" << endl;
    }

    int countBooks() const {
        return books.size();
    }

    Book* searchBookByTitle(const string& title) {
        for (auto& book : books) {
            if (book.title == title) {
                return &book;
            }
        }
        return nullptr;
    }

    void deleteBookByIsbn(const string& isbn) {
        auto it = isbnIndex.find(isbn);
        if (it == isbnIndex.end()) {
            cout << "Error: Book with ISBN " << isbn << " not found." << endl;
            return;
        }

        int indexToDelete = it->second;
        books.erase(books.begin() + indexToDelete);

        for (auto& pair : isbnIndex) {
            if (pair.second > indexToDelete) {
                pair.second--;
            }
        }

        isbnIndex.erase(it);
        cout << "Book with ISBN " << isbn << " deleted successfully." << endl;
    }

    void sortBooksByTitle() {
        sort(books.begin(), books.end(), [](const Book& a, const Book& b) {
            return a.title < b.title;
        });
        cout << "Books sorted by title." << endl;
    }

    void sortBooksByAuthor() {
        sort(books.begin(), books.end(), [](const Book& a, const Book& b) {
            return a.author < b.author;
        });
        cout << "Books sorted by author." << endl;
    }
};

void displayMenu() {
    cout << "\n--- Library Management System Menu ---" << endl;
    cout << "1. Add Book" << endl;
    cout << "2. Display All Books" << endl;
    cout << "3. Find Books by Author" << endl;
    cout << "4. Count Total Books" << endl;
    cout << "5. Search Book by Title" << endl;
    cout << "6. Delete Book by ISBN" << endl;
    cout << "7. Sort Books by Title" << endl;
    cout << "8. Sort Books by Author" << endl;
    cout << "9. Exit" << endl;
    cout << "--------------------------------------" << endl;
    cout << "Enter your choice: ";
}

int main() {
    Library myLibrary;
    int choice;

    myLibrary.addBook(Book("The Lord of the Rings", "J.R.R. Tolkien", 1178, 25.50, "978-0618053267"));
    myLibrary.addBook(Book("The Hobbit", "J.R.R. Tolkien", 310, 15.00, "978-0345339683"));
    myLibrary.addBook(Book("Pride and Prejudice", "Jane Austen", 279, 12.75, "978-0141439518"));
    myLibrary.addBook(Book("1984", "George Orwell", 328, 10.20, "978-0451524935"));

    do {
        displayMenu();
        cin >> choice;
        cin.ignore();

        switch (choice) {
            case 1: {
                string title, author, isbn;
                int pages;
                double price;
                cout << "Enter Title: ";
                getline(cin, title);
                cout << "Enter Author: ";
                getline(cin, author);
                cout << "Enter Pages: ";
                cin >> pages;
                cout << "Enter Price: ";
                cin >> price;
                cin.ignore();
                cout << "Enter ISBN: ";
                getline(cin, isbn);
                myLibrary.addBook(Book(title, author, pages, price, isbn));
                break;
            }
            case 2:
                myLibrary.displayAllBooks();
                break;
            case 3: {
                string authorName;
                cout << "Enter Author Name: ";
                getline(cin, authorName);
                myLibrary.findBooksByAuthor(authorName);
                break;
            }
            case 4:
                cout << "Total books in library: " << myLibrary.countBooks() << endl;
                break;
            case 5: {
                string searchTitle;
                cout << "Enter Title to search: ";
                getline(cin, searchTitle);
                Book* foundBook = myLibrary.searchBookByTitle(searchTitle);
                if (foundBook) {
                    cout << "Book found: ";
                    foundBook->display();
                } else {
                    cout << "Book with title '" << searchTitle << "' not found." << endl;
                }
                break;
            }
            case 6: {
                string deleteIsbn;
                cout << "Enter ISBN of book to delete: ";
                getline(cin, deleteIsbn);
                myLibrary.deleteBookByIsbn(deleteIsbn);
                break;
            }
            case 7:
                myLibrary.sortBooksByTitle();
                myLibrary.displayAllBooks();
                break;
            case 8:
                myLibrary.sortBooksByAuthor();
                myLibrary.displayAllBooks();
                break;
            case 9:
                cout << "Exiting Library Management System. Goodbye!" << endl;
                break;
            default:
                cout << "Invalid choice. Please try again." << endl;
                break;
        }
    } while (choice != 9);

    return 0;
}
