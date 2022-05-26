using Domain;
using Microsoft.AspNetCore.Mvc;
using Services;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

namespace WhatsappServer.Controllers
{
    [ApiController]
    [Route("api")]
    public class LoginRegisterController : ControllerBase
    {
        public IConfiguration _configuration;
        public LoginRegisterController(IConfiguration config)
        {
            _configuration = config;
        }

        UserService userService = new UserService();
        [HttpGet("{id}")]
        public IActionResult UserAvailable(string id)
        {
            try
            {
                userService.UserAvailable(id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("login")]
        [HttpPost]
        public IActionResult Login([FromBody] User user)
        {
            try
            {
                userService.Login(user);

                // the username and password match
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, _configuration["JWTParams:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(DateTime.Now).ToUnixTimeSeconds().ToString()),
                    new Claim("username", user.username)
                };
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWTParams:SecretKey"]));
                var mac = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    _configuration["JWTParams:Issuer"],
                    _configuration["JWTParams:Audience"],
                    claims,
                    expires: DateTime.UtcNow.AddMinutes(20),
                    signingCredentials: mac);
                var options = new CookieOptions { Expires = DateTime.UtcNow.AddMinutes(20), HttpOnly = true, Secure = true, SameSite = SameSiteMode.None };
                Response.Cookies.Append("jwt", new JwtSecurityTokenHandler().WriteToken(token), options);
                return Ok("Welcome!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        
        [Route("register")]
        [HttpPost]
        public IActionResult Register([FromBody] User user)
        {
            try
            {
                userService.CreateUser(user);
                return Created("",user.username);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
