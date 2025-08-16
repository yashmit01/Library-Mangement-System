import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { BookOpen, Plus, Search, Users, BarChart3, Trash2, Edit } from 'lucide-react'
import './App.css'

function App() {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      pages: 1178,
      price: 25.50,
      isbn: "978-0618053267",
      category: "Fantasy"
    },
    {
      id: 2,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      pages: 310,
      price: 15.00,
      isbn: "978-0345339683",
      category: "Fantasy"
    },
    {
      id: 3,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      pages: 279,
      price: 12.75,
      isbn: "978-0141439518",
      category: "Romance"
    },
    {
      id: 4,
      title: "1984",
      author: "George Orwell",
      pages: 328,
      price: 10.20,
      isbn: "978-0451524935",
      category: "Dystopian"
    }
  ])

  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    pages: '',
    price: '',
    isbn: '',
    category: ''
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [searchAuthor, setSearchAuthor] = useState('')

  const addBook = () => {
    if (newBook.title && newBook.author && newBook.pages && newBook.price && newBook.isbn) {
      const book = {
        id: books.length + 1,
        title: newBook.title,
        author: newBook.author,
        pages: parseInt(newBook.pages),
        price: parseFloat(newBook.price),
        isbn: newBook.isbn,
        category: newBook.category || 'General'
      }
      setBooks([...books, book])
      setNewBook({ title: '', author: '', pages: '', price: '', isbn: '', category: '' })
    }
  }

  const deleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id))
  }

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.includes(searchTerm)
  )

  const booksByAuthor = books.filter(book => 
    book.author.toLowerCase().includes(searchAuthor.toLowerCase())
  )

  const totalBooks = books.length
  const totalValue = books.reduce((sum, book) => sum + book.price, 0)
  const categories = [...new Set(books.map(book => book.category))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="h-10 w-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Library Management System</h1>
          </div>
          <p className="text-gray-600 text-lg">Manage your library collection with ease</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Books</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{totalBooks}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${totalValue.toFixed(2)}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{categories.length}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Pages</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {totalBooks > 0 ? Math.round(books.reduce((sum, book) => sum + book.pages, 0) / totalBooks) : 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Browse Books
            </TabsTrigger>
            <TabsTrigger value="add" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Book
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search by Author
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Browse Books Tab */}
          <TabsContent value="browse">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle>All Books</CardTitle>
                <CardDescription>Browse and search through your library collection</CardDescription>
                <div className="flex gap-4">
                  <Input
                    placeholder="Search by title, author, or ISBN..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredBooks.map((book) => (
                    <Card key={book.id} className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{book.title}</CardTitle>
                            <CardDescription className="text-sm text-gray-600">by {book.author}</CardDescription>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteBook(book.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Pages:</span>
                            <span className="font-medium">{book.pages}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Price:</span>
                            <span className="font-medium text-green-600">${book.price}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">ISBN:</span>
                            <span className="font-mono text-xs">{book.isbn}</span>
                          </div>
                          <div className="pt-2">
                            <Badge variant="secondary">{book.category}</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {filteredBooks.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No books found matching your search criteria.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Add Book Tab */}
          <TabsContent value="add">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle>Add New Book</CardTitle>
                <CardDescription>Add a new book to your library collection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Title</label>
                    <Input
                      placeholder="Enter book title"
                      value={newBook.title}
                      onChange={(e) => setNewBook({...newBook, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Author</label>
                    <Input
                      placeholder="Enter author name"
                      value={newBook.author}
                      onChange={(e) => setNewBook({...newBook, author: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Pages</label>
                    <Input
                      type="number"
                      placeholder="Number of pages"
                      value={newBook.pages}
                      onChange={(e) => setNewBook({...newBook, pages: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Price</label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Price in USD"
                      value={newBook.price}
                      onChange={(e) => setNewBook({...newBook, price: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">ISBN</label>
                    <Input
                      placeholder="ISBN number"
                      value={newBook.isbn}
                      onChange={(e) => setNewBook({...newBook, isbn: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <Input
                      placeholder="Book category"
                      value={newBook.category}
                      onChange={(e) => setNewBook({...newBook, category: e.target.value})}
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <Button onClick={addBook} className="w-full md:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Book
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Search by Author Tab */}
          <TabsContent value="search">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle>Search by Author</CardTitle>
                <CardDescription>Find all books by a specific author</CardDescription>
                <Input
                  placeholder="Enter author name..."
                  value={searchAuthor}
                  onChange={(e) => setSearchAuthor(e.target.value)}
                  className="max-w-sm"
                />
              </CardHeader>
              <CardContent>
                {searchAuthor && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Books by "{searchAuthor}" ({booksByAuthor.length} found)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {booksByAuthor.map((book) => (
                        <Card key={book.id} className="hover:shadow-md transition-shadow border-l-4 border-l-green-500">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg">{book.title}</CardTitle>
                            <CardDescription className="text-sm text-gray-600">by {book.author}</CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Pages:</span>
                                <span className="font-medium">{book.pages}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Price:</span>
                                <span className="font-medium text-green-600">${book.price}</span>
                              </div>
                              <div className="pt-2">
                                <Badge variant="secondary">{book.category}</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    {booksByAuthor.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No books found by this author.
                      </div>
                    )}
                  </div>
                )}
                {!searchAuthor && (
                  <div className="text-center py-8 text-gray-500">
                    Enter an author name to search for their books.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle>Category Distribution</CardTitle>
                  <CardDescription>Books by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categories.map((category) => {
                      const count = books.filter(book => book.category === category).length
                      const percentage = (count / totalBooks * 100).toFixed(1)
                      return (
                        <div key={category} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{category}</Badge>
                            <span className="text-sm text-gray-600">{count} books</span>
                          </div>
                          <span className="text-sm font-medium">{percentage}%</span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle>Library Statistics</CardTitle>
                  <CardDescription>Overview of your collection</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Most Expensive Book:</span>
                      <span className="font-medium">
                        ${Math.max(...books.map(book => book.price)).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Least Expensive Book:</span>
                      <span className="font-medium">
                        ${Math.min(...books.map(book => book.price)).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Longest Book:</span>
                      <span className="font-medium">
                        {Math.max(...books.map(book => book.pages))} pages
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shortest Book:</span>
                      <span className="font-medium">
                        {Math.min(...books.map(book => book.pages))} pages
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average Price:</span>
                      <span className="font-medium">
                        ${(totalValue / totalBooks).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App

