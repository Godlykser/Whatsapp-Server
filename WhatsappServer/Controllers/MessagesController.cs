using Domain;
using WhatsappServer.Hubs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services;
using Microsoft.AspNetCore.SignalR;
using FirebaseAdmin;
using FirebaseAdmin.Messaging;
using Google.Apis.Auth.OAuth2;

namespace WhatsappServer.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/contacts/{id}/messages")]
    public class MessagesController : ControllerBase
    {
        private MessagesService messagesService;
        private ContactsService contactsService;
        private readonly IHubContext<ChatHub> hubContext;

        public MessagesController(IHubContext<ChatHub> context)
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

        [HttpGet]
        public IActionResult GetAllMessages(string? id)
        {
            try
            {
                var user = HttpContext.User.FindFirst("username")?.Value;
                return Ok(messagesService.GetAll(user, id));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddMessage(string id, [FromBody] Domain.Message message)
        {
            try
            {
                var user = HttpContext.User.FindFirst("username")?.Value;
                message.sent = message.sent;
                message.contactUsername = id;
                message.belongs = user;
                message.created = DateTime.Now;
                message.content = message.content;
                messagesService.Add(message);
                // send message
                Contact contact = new Contact { belongTo = user, id = id, lastdate = DateTime.Now, last = message.content };
                contactsService.Edit(contact);
                await SendMessage(id);
                // send notification

                if (FirebaseNotificationHub.TokenMap.ContainsKey(id))
                {
                    // checks if firebase app has already been created
                    if (FirebaseApp.DefaultInstance == null)
                    {
                        // creates firebase app
                        FirebaseApp.Create(new AppOptions()
                        {
                            Credential = GoogleCredential.FromFile("FCB_key_cred.json")
                        });
                    }
                    // gets sender's nickname in receiver's contacts
                    string? senderName = contactsService.GetContactName(id, user);
                    var messageBody = $"{senderName} sent you a message";

                    var firebase_msg = new FirebaseAdmin.Messaging.Message()
                    {
                        Data = new Dictionary<string, string>()
                        {
                            { "message", messageBody }
                        },
                        Notification = new FirebaseAdmin.Messaging.Notification()
                        {
                            Title = senderName,
                            Body = message.content
                        },
                        Token = FirebaseNotificationHub.TokenMap[id]
                    };

                    string response = await FirebaseMessaging.DefaultInstance.SendAsync(firebase_msg);
                    // prints response
                    Console.WriteLine("Message notification: " + response);
                }
                return Created("", message);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{id2}")]
        public IActionResult GetMessage(string id, int id2)
        {
            try
            {
                // user - the owner of the contacts list
                // id - username in the list
                // id2 - unique id of a message in the chat between "user" and "id"
                var user = HttpContext.User.FindFirst("username")?.Value;
                return Ok(messagesService.GetMessage(user, id, id2));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id2}")]
        public IActionResult EditMessage(string id, int id2, [FromBody] Domain.Message message)
        {
            try
            {
                var user = HttpContext.User.FindFirst("username")?.Value;
                message.belongs = user;
                message.contactUsername = id;
                message.id = id2;
                messagesService.Edit(message);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id2}")]
        public IActionResult DeleteMessage(string id, int id2)
        {
            try
            {
                var user = HttpContext.User.FindFirst("username")?.Value;
                messagesService.Delete(user, id, id2);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}