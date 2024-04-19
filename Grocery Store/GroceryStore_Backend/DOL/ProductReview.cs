using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOL
{
    public class ProductReview
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required] 
        public string userName { get; set; }
        [Required]
        public string ProductId { get; set; }
        [Required]
        public string Review { get; set; }
    }
}
