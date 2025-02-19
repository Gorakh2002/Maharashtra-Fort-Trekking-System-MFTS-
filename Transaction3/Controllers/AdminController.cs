using Transaction3.Repositories;
using Microsoft.AspNetCore.Mvc;
using Transaction3.Models;

namespace Transaction3.Controllers
{
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminRepository _adminRepository;

        public AdminController(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }

        [HttpPost("validate")]
        public IActionResult ValidateUser([FromBody] LoginDTO dto)
        {
            Console.WriteLine($"Login Attempt - UserId: {dto.UserId}, Password: {dto.Pwd}");
            var admin = _adminRepository.Validate(dto.UserId, dto.Pwd);

            if (admin != null)
            {
                Console.WriteLine("Login Successful!");
                return Ok(admin);
            }
            else
            {
                Console.WriteLine("Invalid credentials!");
                return NotFound("Invalid credentials");
            }
        }

        [HttpPost]
        public IActionResult UpdateProfile([FromBody] Admin admin)
        {
            Console.WriteLine($"Updating Profile - UserId: {admin.Userid}");
            _adminRepository.UpdateAdmin(admin);
            return Ok("Profile updated successfully");
        }
    }
}
