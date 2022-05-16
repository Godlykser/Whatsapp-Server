using Domain;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace WhatsappServer.Controllers
{
    [ApiController]
    [Route("api")]
    public class LoginRegisterController : ControllerBase
    {
        UserService userService = new UserService();
        [Route("login")]
        [HttpPost]
        public IActionResult login([FromBody] User user)
        {
            try
            {
                userService.login(user);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        
        [Route("register")]
        [HttpPost]
        public IActionResult register([FromBody] User user)
        {
            try
            {
                userService.createUser(user);
                return Created("",user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
