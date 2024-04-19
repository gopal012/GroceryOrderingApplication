using DOL;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Data
{
    public class ProductContext : DbContext
    {
        public ProductContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Cart> Cart_Items { get; set; }
        public DbSet<ProductReview> ProductReview { get; set; }
        public DbSet<Order> Orders { get; set; }

        public DbSet<OrderDetail> OrderDetails { get; set; }


        //Adding Admin data through Seed Method
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Primary Key for Cart Model
            modelBuilder.Entity<Cart>()
            .HasKey(nameof(Cart.UserId), nameof(Cart.ProductId));

            //modelBuilder.Entity<OrderDetail>().HasOne(x=>x.Order).WithMany(z=>z.OrderDetails).HasForeignKey(x=>x.OrderId).IsRequired();
            //modelBuilder.Entity<Order>().HasMany(x => x.OrderDetails).WithOne(z => z.Order);

            //modelBuilder.Entity<Order>().HasKey(nameof(Order.Id));

            modelBuilder.Entity<User>().HasData(
                new
                {
                    Id = 1,
                    FullName="Admin1",
                    Email="Admin1@gmail.com",
                    PhoneNumber= "123456789",
                    Password="Admin1@12345",
                    IsAdmin=true,
                    Role = "Admin",
                    Token = ""

                },
                new
                {
                    Id = 2,
                    FullName = "Admin2",
                    Email = "Admin2@gmail.com",
                    PhoneNumber = "123456788",
                    Password = "Admin2@12345",
                    IsAdmin = true,
                    Role = "Admin",
                    Token = ""
                },
                new
                {
                    Id = 3,
                    FullName = "Admin3",
                    Email = "Admin3@gmail.com",
                    PhoneNumber = "123456787",
                    Password = "Admin3@12345",
                    IsAdmin = true,
                    Role = "Admin",
                    Token = ""
                },
                new
                {
                    Id = 4,
                    FullName = "Admin4",
                    Email = "Admin4@gmail.com",
                    PhoneNumber = "123456786",
                    Password = "Admin4@12345",
                    IsAdmin = true,
                    Role = "Admin",
                    Token = ""
                },
                new
                {
                    Id = 5,
                    FullName = "Admin5",
                    Email = "Admin5@gmail.com",
                    PhoneNumber = "123456785",
                    Password = "Admin5@12345",
                    IsAdmin = true,
                    Role = "Admin",
                    Token = ""
                }
                );
        }
    }
}
