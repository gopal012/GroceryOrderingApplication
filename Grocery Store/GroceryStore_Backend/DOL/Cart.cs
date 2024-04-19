using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOL
{
    public class Cart
    {
        [Key]
        public int UserId { get; set; }
        public string ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
