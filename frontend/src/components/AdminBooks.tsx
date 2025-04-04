import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import axios from 'axios';

const AdminBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [newBook, setNewBook] = useState<Book>({
    id: 0,
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    classification: '',
    category: '',
    pageCount: 0,
    price: 0,
  });

  const fetchBooks = async () => {
    try {
      const response = await axios.get('https://bookstore-backend-hamilton1.azurewebsites.net/api/books?page=1&pageSize=100');
      setBooks(response.data.books);
    } catch (error) {
      console.error('Failed to fetch books', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: name === 'pageCount' || name === 'price' ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBook) {
        await axios.put(`https://bookstore-backend-hamilton1.azurewebsites.net/api/books/${editingBook.id}`, newBook);
      } else {
        await axios.post('https://bookstore-backend-hamilton1.azurewebsites.net/api/books', newBook);
      }
      setNewBook({
        id: 0, title: '', author: '', publisher: '', isbn: '',
        classification: '', category: '', pageCount: 0, price: 0
      });
      setEditingBook(null);
      fetchBooks();
    } catch (error) {
      console.error('Failed to save book', error);
    }
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setNewBook(book);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://bookstore-backend-hamilton1.azurewebsites.net/api/books${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Failed to delete book', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>📚 Admin Book List</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          {['title', 'author', 'publisher', 'isbn', 'classification', 'category'].map((field) => (
            <div className="col-md-4" key={field}>
              <input
                type="text"
                className="form-control mb-2"
                placeholder={field}
                name={field}
                value={(newBook as any)[field]}
                onChange={handleInputChange}
              />
            </div>
          ))}
          <div className="col-md-2">
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Page Count"
              name="pageCount"
              value={newBook.pageCount}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              step="0.01"
              className="form-control mb-2"
              placeholder="Price"
              name="price"
              value={newBook.price}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button className="btn btn-primary" type="submit">
          {editingBook ? 'Update Book' : 'Add Book'}
        </button>
      </form>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Title</th><th>Author</th><th>Publisher</th><th>ISBN</th><th>Classification</th>
            <th>Category</th><th>Pages</th><th>Price</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td><td>{book.author}</td><td>{book.publisher}</td><td>{book.isbn}</td>
              <td>{book.classification}</td><td>{book.category}</td><td>{book.pageCount}</td>
              <td>${book.price.toFixed(2)}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(book)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBooks;
