using DAL.Data;
using DOL;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.NewFolder
{
    public class CartRepository : ICart
    {
        private readonly ProductContext _context;

        public CartRepository(ProductContext context)
        {
            _context = context;
        }

        //Adding Item to Cart In Database
        public async void AddItemToCart(Cart cart)
        {
            await _context.Cart_Items.AddAsync(cart);
        }

        //Deleting Item from Cart from Database
        public async void DeleteFromCart(Cart cart)
        {
           _context.Cart_Items.Remove(cart);
        }

        //Geting all item present in cart from database
        public async Task<List<Cart>> GetAllCartItems(int UserId)
        {
            return await _context.Cart_Items.Where(x=>x.UserId == UserId).ToListAsync();
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        //Updating Item from Cart In Database
        public void UpdateCart(Cart cart)
        {
            Cart item =  _context.Cart_Items.Where(x => x.UserId == cart.UserId && x.ProductId == cart.ProductId).FirstOrDefault();
            if (item != null)
            {
                item.Quantity = cart.Quantity;
            }
        }
    }
}
