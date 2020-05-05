using Microsoft.AspNetCore.Mvc;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;
using System;

namespace Auth.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class Auth : ControllerBase
    {
        [HttpGet]
        public ActionResult GetAzureSASToken()
        {
            try
            {
                string accountName = "devstoreaccount1";
                string accountKey = "Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==";
                CloudStorageAccount storageAccount = new CloudStorageAccount(new StorageCredentials(accountName, accountKey), true);
                CloudBlobClient client = storageAccount.CreateCloudBlobClient();
                CloudBlobContainer blobContainer = client.GetContainerReference("assets");
                SharedAccessBlobPolicy sasConstraints = new SharedAccessBlobPolicy();
                sasConstraints.SharedAccessExpiryTime = DateTimeOffset.UtcNow.AddMinutes(5);
                sasConstraints.Permissions = SharedAccessBlobPermissions.Create | SharedAccessBlobPermissions.List;
                string sasContainerToken = blobContainer.GetSharedAccessSignature(sasConstraints);
                return Ok(sasContainerToken);
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}