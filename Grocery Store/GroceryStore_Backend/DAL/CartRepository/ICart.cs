using DOL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.NewFolder
{
    public interface ICart
    {
        Task<List<Cart>> GetAllCartItems(int UserId);
        void AddItemToCart(Cart cart);
        void DeleteFromCart(Cart cart);
        void UpdateCart(Cart cart);
        void SaveChanges();


    }
}
