using DAL.Data;
using DOL;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository
{
    public class ProductRepository : IProduct
    {
        private readonly ProductContext _context;

        public ProductRepository(ProductContext productContext)
        {
            _context = productContext;
        }

        //Adding Product To Database
        public async void Add(Product product)
        {
            await _context.Products.AddAsync(product);
        }

        //Deleting product from Database
        public async void Delete(Product product)
        {
            _context.Products.Remove(product);
        }

        //Get List of All Products
        public async Task<List<Product>> GetAllProducts()
        {
            return await _context.Products.ToListAsync();
        }

        //Get product by Id from Database
        public async Task<Product> GetProductById(Guid id)
        {
            return await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        //Updating product from Database
        public void Update(Guid id,Product product)
        {
            Product updateProduct = _context.Products.FirstOrDefault(x => x.Id == id);

            updateProduct.ProductName = product.ProductName;
            updateProduct.Description = product.Description;
            updateProduct.Category = product.Category;
            updateProduct.Quantity = product.Quantity;
            updateProduct.ImageUrl = product.ImageUrl;
            updateProduct.Price = product.Price;  
            updateProduct.Discount = product.Discount;
            updateProduct.Description = product.Description;
        }
    }
}
