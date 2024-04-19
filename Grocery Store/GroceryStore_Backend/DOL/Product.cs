using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOL
{
    public class Product
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(100, ErrorMessage = "Maximum 100 characters allowed")]
        public string ProductName { get; set; }

        [Required]
        [MaxLength(255, ErrorMessage = "Maximum 255 characters allowed")]
        public string Description { get; set; }

        [Required]
        [MaxLength(100, ErrorMessage = "Maximum 100 characters allowed")]
        public string Category { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        [Required]
        public decimal Price { get; set; }

        public decimal Discount { get; set; }

        [MaxLength(100, ErrorMessage = "Maximum 100 characters")]
        public string Specification { get; set; }
    }
}
