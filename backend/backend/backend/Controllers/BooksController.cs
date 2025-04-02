using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data; // Replace with your actual namespace
using backend.Models; // Replace with your actual namespace
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly BookstoreContext _context;

        public BooksController(BookstoreContext context)
        {
            _context = context;
        }

        // GET /api/books
        [HttpGet]
        public async Task<IActionResult> GetBooks(int page = 1, int pageSize = 5, string? category = null)
        {
            var query = _context.Books.AsQueryable();

            if (!string.IsNullOrEmpty(category))
            {
                query = query.Where(b => b.Category == category);
            }

            var totalBooks = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalBooks / (double)pageSize);

            if ((page - 1) * pageSize >= totalBooks && totalBooks > 0)
            {
                page = 1;
            }

            var books = await query
                .OrderBy(b => b.Title)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new
            {
                books,
                totalPages,
                total = totalBooks,
                currentPage = page,
                pageSize
            });
        }

        // GET /api/books/categories
        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _context.Books
                .Select(b => b.Category)
                .Distinct()
                .OrderBy(c => c)
                .ToListAsync();

            return Ok(categories);
        }
    }
}
