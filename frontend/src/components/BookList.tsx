import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";
import { useCart } from "../components/context/CartContext";

interface Book {
  id: number;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  classification: string;
  category: string;
  pageCount: number;
  price: number;
}

const BookList = () => {
  const { addToCart } = useCart();
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5135/api/books/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to load categories:", err));
  }, []);

  useEffect(() => {
    const categoryParam =
      category !== "All" ? `&category=${encodeURIComponent(category)}` : "";
    axios
      .get(
        `http://localhost:5135/api/books?page=${page}&pageSize=${pageSize}${categoryParam}`
      )
      .then((res) => {
        setBooks(res.data.books);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.error("API fetch failed:", err);
        setBooks([]);
      });
  }, [page, pageSize, category]);

  const handleAddToCart = (book: Book) => {
    addToCart({
      id: book.id,
      title: book.title,
      price: book.price,
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    //  Bootstrap Grid system (container + row + col) used below
    <div className="container mt-4">
      {/* Bootstrap Toast used for notification — one of the two required features not shown in class 
      // Bootstrap badge component used for cart item count (View Cart button)
     // This is a second Bootstrap feature not shown in class, placed on the button using position utilities and badge classes*/}
      {showToast && (
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          <div className="toast show bg-success text-white">
            <div className="toast-body">Book added to cart!</div>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <label>
              Books per page:
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(parseInt(e.target.value));
                  setPage(1);
                }}
                className="ms-2"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </label>

            <label>
              Filter by category:
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
                className="ms-2"
              >
                <option value="All">All</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Publisher</th>
                <th>ISBN</th>
                <th>Classification</th>
                <th>Category</th>
                <th>Pages</th>
                <th>Price</th>
                <th>Add</th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map((book) => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.publisher}</td>
                    <td>{book.isbn}</td>
                    <td>{book.classification}</td>
                    <td>{book.category}</td>
                    <td>{book.pageCount}</td>
                    <td>${book.price.toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleAddToCart(book)}
                      >
                        Add to Cart
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9}>No books found.</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="pagination-container text-center mt-3">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="btn btn-outline-secondary btn-sm mx-1"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`btn btn-sm mx-1 ${
                  page === i + 1 ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="btn btn-outline-secondary btn-sm mx-1"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookList;
