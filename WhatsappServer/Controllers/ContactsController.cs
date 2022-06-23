using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace WhatsappServer.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/contacts")]
    public class ContactsController : ControllerBase
    {
        ContactsService service = new ContactsService();
        UserService userService = new UserService();

        [HttpGet]
        public IActionResult GetAllContacts()
        {
            try
            {
                var user = HttpContext.User.FindFirst("username")?.Value;
                return Ok(service.GetAll(user));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public IActionResult AddContact([FromBody] Contact contact)
        {
            try
            {
                userService.UserNotExists(contact.id);
                var user = HttpContext.User.FindFirst("username")?.Value;
                contact.belongTo = user;
                contact.last = null;
                contact.lastdate = null;
                service.Add(contact);
                return Created("", contact);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetDetails(string id)
        {
            try
            {
                var user = HttpContext.User.FindFirst("username")?.Value;
                return Ok(service.GetDetails(user, id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult EditContact(string id, [FromBody] Contact contact)
        {
            try
            {
                var user = HttpContext.User.FindFirst("username")?.Value;
                contact.belongTo = user;
                contact.id = id;
                service.Edit(contact);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteContact(string id)
        {
            try
            {
                var user = HttpContext.User.FindFirst("username")?.Value;
                service.Delete(user, id);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}