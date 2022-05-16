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
        public List<Message> getAll(string belong, string contact)
        {
            return context.Messages.Where(message => message.contactUsername == contact).ToList();
        }

        public void add(Message message)
        {
            context.Messages.Add(message);
            context.SaveChanges();
        }

        public Message getMessage(string belongs, string contactUsername, int id2)
        {
            Message message = context.Messages.Find(id2);
            if (message != null && message.belongs == belongs && message.contactUsername == contactUsername) return message;
            else throw new Exception("Message not found");
        }

        public void edit(Message message)
        {
            Message oldMessage = context.Messages.Find(message.id);
            if (oldMessage == null || oldMessage.belongs != message.belongs && oldMessage.contactUsername != message.contactUsername) throw new Exception("Message not found");
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

        public void delete(string belongs, string contactUsername,int id2)
        {
            Message message = context.Messages.Find(id2);
            if (message != null && message.belongs == belongs && message.contactUsername == contactUsername) context.Messages.Remove(message);
            else throw new Exception("Message not found");
            context.SaveChanges();
        }


    }


}
