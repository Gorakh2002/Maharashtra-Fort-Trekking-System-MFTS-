using Transaction3.Models;

namespace Transaction3.Repositories
{
    public interface IAdminRepository
    {
        Admin Validate(string userId, string pwd);
        void UpdateAdmin(Admin admin);
    }
}
