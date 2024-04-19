using DOL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository
{
    public interface IProduct
    {
        Task<List<Product>> GetAllProducts();
        Task<Product> GetProductById(Guid id);
        void Add(Product product);
        void Update(Guid id, Product product);
        void Delete(Product product);
        void SaveChanges();
    }
}
