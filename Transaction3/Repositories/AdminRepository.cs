using Transaction3.Models;
using Microsoft.EntityFrameworkCore;

namespace Transaction3.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private readonly Mfts3Context _context;

        public AdminRepository(Mfts3Context context)
        {
            _context = context;
        }

        // ✅ Validate Admin Login
        public Admin Validate(string userId, string pwd)
        {
            var admin = _context.Admins.FirstOrDefault(a => a.Userid == userId);
            return (admin != null && admin.Pwd == pwd) ? admin : null;
        }

        // ✅ Update Admin Details
        public void UpdateAdmin(Admin admin)
        {
            var existingAdmin = _context.Admins.Find(admin.Userid);
            if (existingAdmin != null)
            {
                if (string.IsNullOrEmpty(admin.Pwd))
                {
                    admin.Pwd = existingAdmin.Pwd;
                }
                _context.Entry(existingAdmin).CurrentValues.SetValues(admin);
                _context.SaveChanges();
            }
        }
    }
}       
