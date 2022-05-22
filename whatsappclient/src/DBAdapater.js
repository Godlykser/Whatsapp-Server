import DB from "./DB.json";

// Checks if username already exists.
function UserExists(username) {
  const user = DB.Users.find((u) => u.Username === username.toLowerCase());
  return user !== undefined ? true : false;
}

// Adds user to the DB.
function AddUser(username, nickname, password, image) {
  if (UserExists(username)) return;
  DB.Users.push({
    Username: username.toLowerCase(),
    Nickname: nickname,
    Password: password,
    Image: image,
    LastSeen: "Now",
    Contacts: []
  });
}

// Adds a message to the chat
function AddMessage(chat, sender, type, content) {
  chat.Messages.push({
    Sender: sender,
    Time: new Date().toJSON(),
    Type: type,
    Content: content,
  });
}

function AddContact(username, contact) {
  if (UserExists(username) && UserExists(contact)) {
    const user = DB.Users.find((user) => user.Username === username);
    if (!user.Contacts.find((t) => t === contact)) {
      user.Contacts.push(contact);
      const cont = DB.Users.find((c) => c.Username === contact)
      cont.Contacts.push(username);
      DB.Chats.push({
        Contact1: username,
        Contact2: contact,
        Messages: [],
      });
    }
  }
}

// Checks if details are valid for login.
function LoginCheck(username, password) {
  if (!UserExists(username)) return false;
  const user = DB.Users.find((user) => user.Username === username);
  return user.Password === password;
}

// Returns user's nickname.
function GetNickname(username) {
  if (UserExists(username)) {
    const user = DB.Users.find((user) => user.Username === username);
    return user.Nickname;
  }
}

// Returns user's image.
function GetImage(username) {
  if (UserExists(username)) {
    const user = DB.Users.find((user) => user.Username === username);
    return user.Image;
  }
}

// Returns user's last seen.
function GetLastSeen(username) {
  if (UserExists(username)) {
    const user = DB.Users.find((user) => user.Username === username);
    return user.LastSeen;
  }
}

// Returns all the users that this user has chat history with.
function GetContacts(username) {
  if (UserExists(username)) {
    const user = DB.Users.find((user) => user.Username === username);
    return user.Contacts !== undefined ? user.Contacts : [];
  }
  return [];
}

// Returns the chat of the user with another user, if exists.
function GetChat(username, recipient) {
  const user = DB.Users.find((u) => u.Username === username);
  if (user !== undefined) {
    const recip = DB.Users.find((r) => r.Username === recipient);
    if (recip !== undefined) {
      const chat = DB.Chats.find(
        (c) =>
          (c.Contact1 === recipient && c.Contact2 === username) ||
          (c.Contact1 === username && c.Contact2 === recipient)
      );
      return chat;
    }
  }
  return undefined;
}

// Returns the last message in the chat
function GetLastMessage(chat) {
  if (chat.Messages !== undefined && chat.Messages.length > 0)
    return chat.Messages.at(-1);
  return undefined;
}

function GetTime(date) {
  const d = new Date(date);
  const time =
    String(d.getHours()).padStart(2, "0") +
    ":" +
    String(d.getMinutes()).padStart(2, "0");
  return time;
}

export {
  AddUser,
  AddMessage,
  AddContact,
  LoginCheck,
  UserExists,
  GetNickname,
  GetImage,
  GetChat,
  GetContacts,
  GetLastMessage,
  GetLastSeen,
  GetTime
};
