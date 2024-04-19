using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOL
{
    public class Order
    {
        [Key] 
        public Guid OrderId { get; set; }

        public int UserId { get; set; }

        public int TotalItems { get; set; }

        //Navigation Property
        //public virtual List<OrderDetail> OrderDetails { get; set; }


    }
}
