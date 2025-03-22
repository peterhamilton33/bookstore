import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Form, Container, Button } from "react-bootstrap";
import "../styles.css"; // Import CSS file

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

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    axios
      .get(`http://localhost:5135/api/books?page=${page}&pageSize=${pageSize}`)
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, [page, pageSize]);

  return (
    <Container className="page-container">
     <div className="header-container">
    <h2 className="mb-4">📚 Bookstore</h2>
    </div>
      {/* Books per page dropdown */}
      <div className="controls-container">
        <Form.Group controlId="pageSize">
          <Form.Label className="fw-bold">Books per page:</Form.Label>
          <Form.Select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="text-center"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </Form.Select>
        </Form.Group>
      </div>

      {/* Fully Centered Table */}
      <div className="table-container">
        <Table striped bordered hover responsive>
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
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.isbn}</td>
                <td>{book.classification}</td>
                <td>{book.category}</td>
                <td>{book.pageCount}</td>
                <td>${book.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination - Fully Centered */}
      <div className="pagination-container">
        <Button variant="primary" onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </Button>
        <span className="fs-5 mx-3">Page {page}</span>
        <Button variant="primary" onClick={() => setPage(page + 1)}>Next</Button>
      </div>
    </Container>
  );
};

export default BookList;
