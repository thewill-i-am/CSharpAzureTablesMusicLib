using MusicLibrary.Core.Users.Interfaces;
using MusicLibrary.Core.Users.Models;
using Microsoft.WindowsAzure.Storage.Table;
using Microsoft.WindowsAzure.Storage;
using System.Net;

namespace MusicLibrary.Services.Users
{
    public class UsersServices : IUsersService
    {
        private string azureConection;
        public UsersServices(string azureConection)
        {
            this.azureConection = azureConection;
        }
        public CloudTable verification()
        {
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(this.azureConection);
            CloudTableClient client = storageAccount.CreateCloudTableClient();
            CloudTable table = client.GetTableReference("Users");
            table.CreateIfNotExistsAsync();
            return table;
        }
        public void Add(UserModel user)
        {
            CloudTable table = verification();
            var Usuario = new UserModel(user.FirstName, user.LastName, user.Email, user.Password, user.Rol);
            UserModel userVerification = RetrieveRecord(table, Usuario.PartitionKey, Usuario.RowKey);
            if (userVerification == null)
            {
                TableOperation insertOp = TableOperation.Insert(Usuario);
                table.ExecuteAsync(insertOp);
            }
            else
            {
                throw new HttpResponseException("Customer does not have any account", HttpStatusCode.BadRequest);
            }
        }
        public UserModel Verification(UserModel user)
        {
            CloudTable table = verification();
            var Usuario = new UserModel(user.FirstName, user.LastName, user.Email, user.Password, user.Rol);
            UserModel userVerification = RetrieveRecord(table, Usuario.PartitionKey, Usuario.RowKey);
            if (Usuario.Email == userVerification.Email && Usuario.Password == userVerification.Password)
            {
                return userVerification;
            }
            else
            {
                throw new HttpResponseException("Customer does not have any account", HttpStatusCode.BadRequest);
            }
        }
        public UserModel RetrieveRecord(CloudTable table, string partitionKey, string rowKey)
        {
            TableOperation tableOperation = TableOperation.Retrieve<UserModel>(partitionKey, rowKey);
            TableResult tableResult = table.ExecuteAsync(tableOperation).Result;
            return tableResult.Result as UserModel;
        }
    }
}
