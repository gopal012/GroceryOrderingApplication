using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOL
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50, ErrorMessage = "Maximum 50 characters allowed")]
        public string FullName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress, ErrorMessage = "E-mail is not valid")]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.PhoneNumber)]
        public string PhoneNumber { get; set; }

        [Required]
        [MinLength(8, ErrorMessage = "Minimum 8 characters required")]
        public string Password { get; set; }

        [Required]
        [NotMapped]
        [Compare("Password")]
        public string ConfirmPassword { get; set;}

        [DefaultValue(false)]
        public bool IsAdmin { get; set; }

        [DefaultValue("User")]
        public string Role { get; set; }

        [DefaultValue("")]
        public string Token { get; set; }

    }
}
