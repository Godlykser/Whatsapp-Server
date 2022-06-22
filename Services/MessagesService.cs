using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repository;
using Domain;

namespace Services
{
    public class MessagesService
    {
        private Context context = new Context();
        /// <summary>
        /// Get all messages between user and contact from db
        /// </summary>
        /// <param name="user">user's username</param>
        /// <param name="contact">contact's username</param>
        /// <returns></returns>
        public List<Message> GetAll(string user, string contact)
        {
            return context.Messages.Where(message => (message.recipient == contact 
                                            && message.sender == user)
                                            || message.recipient == user
                                            && message.sender == contact).ToList();
        }
        /// <summary>
        /// Gets specific message between user and contact from db
        /// </summary>
        /// <param name="user">user's username</param>
        /// <param name="contact">contact's username</param>
        /// <param name="id2">message's id</param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public Message GetMessage(string user, string contact, int id2)
        {
            Message message = context.Messages.Find(id2);
            if (message != null && message.sender == user && message.recipient == contact) return message;
            else throw new Exception("Message not found");
        }

        /// <summary>
        /// Adds message to db
        /// </summary>
        /// <param name="message">message to add</param>
        public void Add(Message message)
        {
            context.Messages.Add(message);
            context.SaveChanges();
        }

        /// <summary>
        /// Edits message in db
        /// </summary>
        /// <param name="message">message to edit</param>
        /// <exception cref="Exception">returns exception if message not found</exception>
        public void Edit(Message message)
        {
            Message oldMessage = context.Messages.Find(message.id);
            if (oldMessage == null || oldMessage.sender != message.sender && oldMessage.recipient != message.recipient)
            {
                throw new Exception("Message not found");
            }
            if (message.content != null)
            {
                oldMessage.content = message.content;
            }
            if (message.created != null)
            {
                oldMessage.created = message.created;
            }
            if (message.sent != null)
            {
                oldMessage.sent = message.sent;
            }
            context.SaveChanges();
        }
        /// <summary>
        /// Deletes message from db
        /// </summary>
        /// <param name="user">message's sender</param>
        /// <param name="contact">message's recipient</param>
        /// <param name="id2">message's id</param>
        /// <exception cref="Exception">throws exception if message not found</exception>
        public void Delete(string user, string contact,int id2)
        {
            Message message = context.Messages.Find(id2);
            if (message != null && message.sender == user && message.recipient == contact)
            {
                context.Messages.Remove(message);
            }
            else throw new Exception("Message not found");
            context.SaveChanges();
        }
    }
}
