using Domain;
using Repository;

namespace Services
{
    public class ContactsService
    {
        private Context context = new Context();

        public List<Contact> GetAll(string belong)
        {
            return context.Contacts.Where(contact => contact.user == belong).ToList();
        }

        public void Add(Contact contact)
        {
            if(contact.contact == null || contact.name == null || contact.server == null)
            {
                throw new Exception("Not enough parameters");
            }
            else
            {
                context.Contacts.Add(contact);
                context.SaveChanges();
            }
        }

        public Contact? GetDetails(string belongTo, string id)
        {
            return context.Contacts.Find(belongTo, id);
        }

        public void Edit(Contact newContact)
        {
            var contact = context.Contacts.Find(newContact.user, newContact.contact);
            
            if (newContact.name != null)
            {
                contact.name = newContact.name;
            }
            if (newContact.server != null)
            {
                contact.server = newContact.server;
            }
            if (newContact.last != null)
            {
                contact.last = newContact.last;
            }
            if (newContact.lastdate != null)
            {
                contact.lastdate = newContact.lastdate;
            }
            context.SaveChanges();
        }

        public void Delete(string belongTo, string id)
        {
            Contact contact = context.Contacts.Find(belongTo, id);
            if (contact != null)
            {
                context.Contacts.Remove(contact);
                context.SaveChanges();
            }
            else throw new Exception("Contact not found");
        }

    }
}