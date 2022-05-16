using Domain;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace WhatsappServer.Controllers
{
    [ApiController]
    [Route("api/contacts")]
    public class ContactsController : ControllerBase
    {
        public string user = "chen";
        ContactsService service = new ContactsService();

        [HttpGet]
        public IActionResult getAllContacts()
        {
            try
            {
                return Ok(service.getAll(user));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public IActionResult addContact([FromBody] Contact contact)
        {
            try
            {
                contact.belongTo = user;
                service.add(contact);
                return Created("", contact);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult getDetails(string id)
        {
            try
            {
                return Ok(service.getDetails(user, id));
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
                contact.belongTo = user;
                contact.id = id;
                service.edit(contact);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult deleteContact(string id)
        {
            try
            {
                service.delete(user, id);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}