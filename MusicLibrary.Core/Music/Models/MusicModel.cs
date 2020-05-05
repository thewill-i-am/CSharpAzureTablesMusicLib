using Microsoft.WindowsAzure.Storage.Table;
namespace MusicLibrary.Core.Music.Models
{
    public class MusicModel : TableEntity
    {
        public MusicModel()
        {
        }
        public MusicModel(string songname, string artist)
        {
            Artist = artist;
            Songname = songname;
            PartitionKey = Artist.Substring(0, 1);
            RowKey = Songname;
        }
        public string Artist { get; set; }
        public string Songname { get; set; }
    }
}
