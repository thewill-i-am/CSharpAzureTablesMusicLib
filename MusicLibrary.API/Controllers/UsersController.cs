using Microsoft.AspNetCore.Mvc;
using MusicLibrary.Core.Users.Interfaces;
using MusicLibrary.Core.Users.Models;
using System;

namespace MusicLibrary.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService userServices;
        public UsersController(IUsersService userServices)
        {
            this.userServices = userServices;
        }

        [HttpPost("register")]
        public ActionResult register([FromBody] UserModel user)
        {
            try
            {
                this.userServices.Add(user);
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("login")]
        public ActionResult login([FromBody] UserModel user)
        {
            try
            {
                UserModel isValid = userServices.Verification(user);
                if (isValid != null)
                {
                    return Ok(isValid);
                }
                else
                {
                    return BadRequest();
                }
             
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
