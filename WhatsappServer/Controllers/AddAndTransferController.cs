using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Services;
using WhatsappServer.Hubs;

namespace WhatsappServer.Controllers
{
    [ApiController]
    [Route("api")]
    public class AddAndTransferController : ControllerBase  
    {
        ContactsService contactsService;
        MessagesService messagesService;
        private readonly IHubContext<ChatHub> hubContext;


        public AddAndTransferController(IHubContext<ChatHub> context)
        {
            messagesService = new MessagesService();
            contactsService = new ContactsService();
            hubContext = context;
        }

        private async Task SendMessage(string username)
        {
            if (ChatHub.UserMap.ContainsKey(username))
            {
                await hubContext.Clients.Client(ChatHub.UserMap[username]).SendAsync("ReceiveMessage");
            }
        }

        [Route("invitations")]
        [HttpPost]
        public async Task<IActionResult> Invite([FromBody] Invite invite)
        {
            try
            {
                if (invite.to == null || invite.from == null)
                {
                    throw new Exception("User cannot be null");
                }

                Contact contact = new Contact { belongTo = invite.to, id = invite.from, name = invite.from, server = invite.server };
                contactsService.Add(contact);
                await SendMessage(invite.to);
                await SendMessage(invite.from);
                return Created("", contact);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("transfer")]
        [HttpPost]
        public async Task<IActionResult> Transfer([FromBody] Transfer transfer)
        {
            try
            {
                Message message = new Message { belongs = transfer.to, contactUsername = transfer.from, content = transfer.content, created = DateTime.Now, sent = false };
                messagesService.Add(message);
                contactsService.Edit(new Contact { belongTo = transfer.to, id = transfer.from, last = transfer.content, lastdate = DateTime.Now });
                await SendMessage(transfer.to);
                await SendMessage(transfer.from);
                return Created("", message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
