using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data; // Replace with your actual namespace
using backend.Models; // Replace with your actual namespace

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly BookstoreContext _context;

    public BooksController(BookstoreContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetBooks(int page = 1, int pageSize = 5)
    {
        // Basic validation
        if (page < 1) page = 1;
        if (pageSize < 1 || pageSize > 100) pageSize = 5;

        var totalBooks = await _context.Books.CountAsync();
        int totalPages = (int)Math.Ceiling((double)totalBooks / pageSize);

        if ((page - 1) * pageSize >= totalBooks && totalBooks > 0)
        {
            page = 1; // reset to page 1 if page is out of range
        }

        var books = await _context.Books
            .OrderBy(b => b.Title)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return Ok(new
        {
            books,
            total = totalBooks,
            totalPages,
            currentPage = page,
            pageSize
        });
    }
}