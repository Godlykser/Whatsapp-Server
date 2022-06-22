using Microsoft.AspNetCore.SignalR;

namespace WhatsappServer.Hubs
{
    public class FirebaseNotificationHub : Hub
    {
        // maps user id to token
        public static Dictionary<string, string> TokenMap = new Dictionary<string, string>();

        public void AddUser(string username, string token)
        {
            if (TokenMap.ContainsKey(username))
            {
                TokenMap.Remove(username);
            }
            TokenMap.Add(username, token);
        }
    }
}
