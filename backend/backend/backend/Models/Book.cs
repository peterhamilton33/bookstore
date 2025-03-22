using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Book
    {
        [Key]
        [Column("BookID")] // Map to actual database column
        public int Id { get; set; }

        public string Title { get; set; }
        public string Author { get; set; }
        public string Publisher { get; set; }
        public string ISBN { get; set; }
        public string Classification { get; set; }
        public string Category { get; set; }  // Ensure it matches the database
        public int PageCount { get; set; }    // Matches "PageCount"
        public decimal Price { get; set; }
    }
}