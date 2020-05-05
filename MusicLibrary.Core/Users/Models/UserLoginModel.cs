using Microsoft.WindowsAzure.Storage.Table;
namespace MusicLibrary.Core.Users.Models
{
    public class UserLoginModel : TableEntity
    {
        public UserLoginModel()
        {

        }
        public UserLoginModel(string firstName, string email, string password)
        {
            FirstName = firstName;
            Email = email;
            Password = password;
            PartitionKey = Email.Substring(0, 1);
            RowKey = email;

        }
        public string FirstName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
