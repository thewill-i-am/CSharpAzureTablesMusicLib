using Microsoft.WindowsAzure.Storage.Table;

namespace MusicLibrary.Core.Users.Models
{
    public class UserModel : TableEntity
    {
        public UserModel()
        {
        }
        public UserModel(string firstName, string lastName,string email, string password, string rol)
        {
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Password = password;
            Rol = rol;
            PartitionKey = Email.Substring(0, 1);
            RowKey = email;
        }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Rol { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
