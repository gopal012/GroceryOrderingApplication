using DAL.Repository;
using DOL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GroceryStore_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProduct _productRepository;

        public ProductController(IProduct productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet]
        public ActionResult GetAllProducts() 
        {
            var products = _productRepository.GetAllProducts().Result;
            return Ok(products);
        }

        [HttpPost]
        public ActionResult AddProduct([FromBody] Product product)
        {
            _productRepository.Add(product);
            _productRepository.SaveChanges();
            return Ok(product);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public ActionResult GetProduct([FromRoute] Guid id) 
        { 
            Product product = _productRepository.GetProductById(id).Result;
            if(product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public ActionResult UpdateProduct([FromRoute] Guid id,[FromBody] Product product) 
        {
            Product updateProduct = _productRepository.GetAllProducts().Result.FirstOrDefault(x => x.Id == id);
            if(updateProduct == null)
            {
                return NotFound();
            }
            else
            {
                _productRepository.Update(id,product);
                _productRepository.SaveChanges();
                return Ok(updateProduct);
            }
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public ActionResult Delete([FromRoute] Guid id)
        {
            Product deleteProduct = _productRepository.GetAllProducts().Result.FirstOrDefault(x => x.Id == id);
            if (deleteProduct == null)
            {
                return NotFound();
            }
            else
            {
                _productRepository.Delete(deleteProduct);
                _productRepository.SaveChanges();
                return Ok(deleteProduct);
            }
        }
    }
}
