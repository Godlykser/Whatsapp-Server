using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using System;

namespace PushNotifications
{
    class Program
    {
        static void Main(string[] args)
        {
            FirebaseApp.Create(new AppOptions()
            {
            });
        }
    }
}