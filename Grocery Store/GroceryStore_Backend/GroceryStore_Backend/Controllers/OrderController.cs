using DAL.Data;
using DOL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GroceryStore_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ProductContext _context;

        public OrderController(ProductContext context)
        {
            _context = context;
        }
        [HttpGet]
        [Route("{userId}")]
        public ActionResult GetAllOrders(int userId)
        {
            var orders = _context.Orders.Where(x=>x.UserId == userId).ToList();
            return Ok(orders);
        }

        [HttpPost]
        public ActionResult AddOrder(Order order)
        {
            _context.Orders.Add(order);
            _context.SaveChanges();
            return Ok(order);
        }
    }
}
