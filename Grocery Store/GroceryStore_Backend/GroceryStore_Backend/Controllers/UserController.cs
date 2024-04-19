using DAL.UserRepository;
using DOL;
using GroceryStore_Backend.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GroceryStore_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUser _user;

        public UserController(IUser user)
        {
            _user = user;
        }

        [HttpPost("Authenticate")]
        public ActionResult Authenticate([FromBody] LoginUser loginObj)
        {
            if (loginObj.Email == null || loginObj.Password == null)
            {
                return BadRequest();
            }

            var users = _user.GetUsers().Result;
            var user = users.FirstOrDefault(x => x.Email == loginObj.Email);
            if (user == null)
            {
                return NotFound(new { Message = "User Not Found !" });
            }

            if(!PasswordHasher.verifyPassword(loginObj.Password, user.Password))
            {
                return BadRequest(new { Message = "Invalid Credentials !" });
            }

            user.Token = CreateJwtToken(user);
            return Ok(user); 
        }

        [HttpPost("Register")]
        public ActionResult Register([FromBody] User userObj) 
        {
            if(userObj == null) 
            { 
                return BadRequest();
            }
            var users = _user.GetUsers().Result;
            var user = users.FirstOrDefault(x => x.Email == userObj.Email);
            if (user != null) 
            {
                return BadRequest(new { message = "User Already exists !" });
            }
            userObj.Password = PasswordHasher.HashPassword(userObj.Password);
            _user.Add(userObj);
            _user.SaveChanges();
            return Ok(new {message="User Registered Successfully !"});
        }

        private string CreateJwtToken(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysecret.....");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role,user.Role),
                new Claim(ClaimTypes.Name,user.FullName)

            });
            
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key),SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);

        }
    }
}
