using DAL.Data;
using DOL;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.UserRepository
{
    public class UserRepository : IUser
    {
        private readonly ProductContext _context;

        public UserRepository(ProductContext context)
        {
            _context = context;
        }

        //Adding New user to Database
        public async void Add(User user)
        {
            await _context.AddAsync(user);
        }

        //Getting list of all users from Database
        public async Task<List<User>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
