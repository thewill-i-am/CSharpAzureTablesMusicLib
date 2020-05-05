using Microsoft.WindowsAzure.Storage.Table;
using MusicLibrary.Core.Music.Models;
using System.Collections.Generic;

namespace MusicLibrary.Core.Music.Interfaces
{
    public interface IMusicServices
    {
        void Add(MusicModel Song);
        public List<MusicModel>  Get();

    }
}
