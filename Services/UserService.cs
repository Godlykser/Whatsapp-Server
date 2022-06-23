using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repository;
using Domain;

namespace Services
{
    public class UserService
    {
        private Context context = new Context();

        public void UserAvailable(string id)
        {
            if (context.Users.Find(id) != null) throw new Exception("User already exists");
        }

        public void UserNotExists(string id)
        {
            if (context.Users.Find(id) == null) throw new Exception("User does not exist");
        }

        public void CreateUser(User user)
        {
            if (context.Users.Find(user.username)!=null) throw new Exception("User already exists");
            context.Users.Add(user);
            context.SaveChanges();
        }

        public void Login(User user)
        {
            if (user == null)
            {
                throw new Exception("User does not exist");
            }
            User? user2 = context.Users.Find(user.username);
            if (user2 == null|| user2.password != user.password)
            {
                throw new Exception("Incorrect password");
            }
        }
    }
}
