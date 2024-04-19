using DAL.Data;
using DOL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GroceryStore_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductReviewController : ControllerBase
    {
        private readonly ProductContext _context;

        public ProductReviewController(ProductContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult GetAllReviews(string productId)
        {
            var reviews = _context.ProductReview.Where(x=>x.ProductId == productId).ToList();
            return Ok(reviews);
        }

        [HttpPost]
        public ActionResult AddReview(ProductReview review)
        {
            _context.ProductReview.Add(review);
            _context.SaveChanges();
            return Ok(review);
        }

    }
}
