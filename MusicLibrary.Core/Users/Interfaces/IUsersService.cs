using Microsoft.WindowsAzure.Storage.Table;
using MusicLibrary.Core.Users.Models;
namespace MusicLibrary.Core.Users.Interfaces
{
    public interface IUsersService
    {
        void Add(UserModel user);
        UserModel Verification(UserModel user);
        CloudTable verification();
    }
}
