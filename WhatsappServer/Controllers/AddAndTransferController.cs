using Domain;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace WhatsappServer.Controllers
{
    [ApiController]
    [Route("api")]
    public class AddAndTransferController : ControllerBase  
    {
        ContactsService contactsService = new ContactsService();
        MessagesService messagesService = new MessagesService();
        [Route("invitations")]
        [HttpPost]
        public IActionResult Invite([FromBody] Invite invite)
        {
            try
            {
                Contact contact = new Contact { belongTo = invite.to, id = invite.from, name = invite.from, server = invite.server };
                contactsService.Add(contact);
                return Created("", contact);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("transfer")]
        [HttpPost]
        public IActionResult Transfer([FromBody] Transfer transfer)
        {
            try
            {
                Message message = new Message { belongs = transfer.to, contactUsername = transfer.from, content = transfer.content, created = DateTime.Now, sent = false };
                messagesService.Add(message);
                contactsService.Edit(new Contact { belongTo = transfer.to, id = transfer.from, last = transfer.content, lastdate = DateTime.Now });
                return Created("", message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
