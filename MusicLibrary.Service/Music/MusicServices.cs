using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using MusicLibrary.Core.Music.Interfaces;
using MusicLibrary.Core.Music.Models;
using System;
using System.Collections.Generic;
using System.Net;

namespace MusicLibrary.Services.Music
{
    public class MusicServices : IMusicServices
    {
        private string azureConection;
        public MusicServices(string azureConection)
        {
            this.azureConection = azureConection;
        }
        public CloudTable verification()
        {
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(this.azureConection);
            CloudTableClient client = storageAccount.CreateCloudTableClient();
            CloudTable table = client.GetTableReference("Music");
            table.CreateIfNotExistsAsync();
            return table;
        }
        public void Add(MusicModel Song)
        {

            try { 
            CloudTable table = verification();
            var Music = new MusicModel(Song.Songname, Song.Artist);
            TableOperation insertOp = TableOperation.Insert(Music);
            table.ExecuteAsync(insertOp);
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
        }
        public List<MusicModel> Get()
        {
            CloudTable table = verification();
            TableContinuationToken token = null;
            var entities = new List<MusicModel>();
            var queryResult = table.ExecuteQuerySegmentedAsync(new TableQuery<MusicModel>(), token);
            entities.AddRange(queryResult.Result);
            return entities;
        }
    }
}
