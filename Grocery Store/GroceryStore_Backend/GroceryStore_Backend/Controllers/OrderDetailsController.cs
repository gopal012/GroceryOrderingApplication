using DAL.Data;
using DOL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GroceryStore_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailsController : ControllerBase
    {
        private readonly ProductContext _context;

        public OrderDetailsController(ProductContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("{orderId}")]
        public IActionResult GetDetails(Guid OrderId)
        {
            var result = _context.OrderDetails.Where(x=>x.OrderId == OrderId).ToList();
            return Ok(result);
        }

        [HttpPost]
        public ActionResult AddOrderDetail(OrderDetail orderDetail)
        {
            _context.OrderDetails.Add(orderDetail);
            _context.SaveChanges();
            return Ok(orderDetail);
        }
    }
}
