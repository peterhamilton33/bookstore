import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Form, Container, Button, Row, Col } from "react-bootstrap";

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
    <Container className="d-flex flex-column align-items-center justify-content-center mt-4">
      <h2 className="text-center mb-4">
        📚 Bookstore
      </h2>

      {/* Books per page dropdown - centered */}
      <Row className="w-100 justify-content-center mb-3">
        <Col xs="auto">
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
        </Col>
      </Row>

      {/* Center the table properly */}
      <div className="d-flex justify-content-center w-100">
        <div className="table-responsive w-75">
          <Table striped bordered hover className="text-center">
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
      </div>

      {/* Pagination buttons - fully centered */}
      <Row className="w-100 justify-content-center mt-3">
        <Col xs="auto">
          <div className="d-flex align-items-center gap-3">
            <Button variant="primary" onClick={() => setPage(page - 1)} disabled={page === 1}>
              Previous
            </Button>
            <span className="fs-5">Page {page}</span>
            <Button variant="primary" onClick={() => setPage(page + 1)}>Next</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BookList;
