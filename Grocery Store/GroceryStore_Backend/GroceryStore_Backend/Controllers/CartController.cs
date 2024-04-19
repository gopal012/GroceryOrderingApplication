using DAL.NewFolder;
using DAL.Repository;
using DOL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GroceryStore_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICart _cart;

        public CartController(ICart cart)
        {
            _cart = cart;
        }

        [HttpGet]
        [Route("{UserId:int}")]
        public ActionResult GetAllItem(int UserId) 
        {
            var item = _cart.GetAllCartItems(UserId).Result;
            return Ok(item);
        }

        [HttpGet]
        [Route("{UserId}/{ProductId}")]
        public ActionResult GetItem(int UserId,string ProductId)
        {
            var items = _cart.GetAllCartItems(UserId).Result;
            var item = items.Where(x => x.UserId == UserId && x.ProductId == ProductId).FirstOrDefault();
            return Ok(item);
        }

        [HttpPost]
        public ActionResult AddItem([FromBody] Cart cart)
        {
            _cart.AddItemToCart(cart);
            _cart.SaveChanges();
            return Ok(cart);
        }

        [HttpPut]
        public ActionResult UpdateCart([FromBody] Cart cart)
        {
            var items = _cart.GetAllCartItems(cart.UserId).Result;
            if(cart == null || items.Count == 0)
            {
                return BadRequest();
            }
            else if(items.Where(x=>x.UserId == cart.UserId && x.ProductId == cart.ProductId) == null)
            {
                return BadRequest();
            }
            else
            {
                _cart.UpdateCart(cart);
                _cart.SaveChanges();
                return Ok(cart);
            }
        }

        [HttpDelete]
        [Route("{userId}/{ProductId}")]
        public ActionResult DeleteItemFromCart(int userId,string ProductId)
        {
            var item = _cart.GetAllCartItems(userId).Result;
            Cart cart = item.FirstOrDefault(x => x.ProductId == ProductId && x.UserId == userId);
            if(cart == null)
            {
                return NotFound();
            }
            _cart.DeleteFromCart(cart);
            _cart.SaveChanges();
            return Ok(cart);
        }

    }
}
