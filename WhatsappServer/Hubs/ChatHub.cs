using Microsoft.AspNetCore.SignalR;

namespace WhatsappServer.Hubs
{
    public class ChatHub : Hub
    {
        public static Dictionary<string, string> UserMap = new Dictionary<string, string>();

        public void AddUser(string username)
        {
            if (UserMap.ContainsKey(username))
            {
                UserMap.Remove(username);
            }
            UserMap.Add(username, Context.ConnectionId);
        }
    }
}
