using Microsoft.AspNetCore.Mvc;
using MusicLibrary.Core.Music.Models;
using System;
using MusicLibrary.Core.Music.Interfaces;

namespace MusicLibrary.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MusicController : ControllerBase
    {
        private readonly IMusicServices musicServices;
        public MusicController(IMusicServices userServices)
        {
            this.musicServices = userServices;
        }

        [HttpPost("agregar")]
        public ActionResult register([FromBody] MusicModel Song)
        {
            try
            {
                this.musicServices.Add(Song);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                var musicinfo = this.musicServices.Get();
                return Ok(musicinfo);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
