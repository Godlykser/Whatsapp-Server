using Domain;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace WhatsappServer.Controllers
{
    [ApiController]
    [Route("api/contacts/{id}/messages")]
    public class MessagesController : ControllerBase
    {
        public string user = "chen";
        MessagesService messagesService = new MessagesService();
        ContactsService contactsService = new ContactsService();

        [HttpGet]
        public IActionResult getMessages(string? id)
        {
            try
            {
                return Ok(messagesService.getAll(user, id));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public IActionResult addMessage(string id, [FromBody] Message message)
        {
            try
            {
                message.sent = true;
                message.contactUsername = id;
                message.belongs = user;
                message.created = DateTime.Now;
                messagesService.add(message);
                Contact contact = new Contact { belongTo = user, id=id, lastdate = DateTime.Now, last = message.content };
                contactsService.edit(contact);
                return Created("", message);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{id2}")]
        public IActionResult getMessage(string id,int id2)
        {
            try
            {
                return Ok(messagesService.getMessage(user, id, id2));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id2}")]
        public IActionResult EditMessage(string id, int id2, [FromBody] Message message)
        {
            try
            {
                message.belongs = user;
                message.contactUsername = id;
                message.id = id2;
                messagesService.edit(message);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id2}")]
        public IActionResult deleteMessage(string id, int id2)
        {
            try
            {
                messagesService.delete(user,id, id2);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}