using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOL
{
    public class OrderDetail
    {
        public int Id { get; set; }
        public string ProductId { get; set; }
        public int Quantity { get; set; }
        public Guid OrderId { get; set; }
        //public virtual Order Order { get; set; }
    }
}
