import DB from "./DB.json";
import $ from 'jquery';

const server = "http://localhost:5064/api/";

// function UserExists(username) {
//   const user = DB.Users.find((u) => u.Username === username.toLowerCase());
//   return user !== undefined ? true : false;
// }

// Checks if username already exists.
async function UserExists(username) {
  if (username === undefined || username.length < 1 ) return false;
  let response;
  await $.ajax({
    url: server + username,
    type: 'GET',
    contentType: 'application/json',
    success: (data) => { response = false; },
  }).catch(() => { response = true; })
  return response;
}

// function AddUser(username, nickname, password, image) {
//   if (UserExists(username)) return;
//   DB.Users.push({
//     Username: username.toLowerCase(),
//     Nickname: nickname,
//     Password: password,
//     Image: image,
//     LastSeen: "Now",
//     Contacts: []
//   });
// }

// Adds user to the DB.
async function AddUser(username, nickname, password, image) {
  const userJSON = { username, password, server: 'http://localhost:' + window.location.port };
  await $.ajax({
    url: server + 'register',
    type: 'POST',
    data: JSON.stringify(userJSON),
    contentType: 'application/json; charset=utf-8'
  })
}

// Adds a message to the chat
async function AddMessage(sender, receiver, content) {
  const userJSON = { content: content, sent: true };
  await $.ajax({
    url: server + 'contacts/' + receiver + '/messages',
    type: 'POST',
    xhrFields: { withCredentials: true },
    data: JSON.stringify(userJSON),
    contentType: 'application/json; charset=utf-8'
  }).catch((ex) => console.log(ex))
}

// function AddContact(username, contact) {
//   if (UserExists(username) && UserExists(contact)) {
//     const user = DB.Users.find((user) => user.Username === username);
//     if (!user.Contacts.find((t) => t === contact)) {
//       user.Contacts.push(contact);
//       const cont = DB.Users.find((c) => c.Username === contact)
//       cont.Contacts.push(username);
//       DB.Chats.push({
//         Contact1: username,
//         Contact2: contact,
//         Messages: [],
//       });
//     }
//   }
// }

async function AddContact(id, name, contactServer) {
  const contactJSON = { id: id, name: name, server: contactServer }
  await $.ajax({
    url: server + 'contacts/',
    type: 'POST',
    xhrFields: { withCredentials: true },
    data: JSON.stringify(contactJSON),
    contentType: 'application/json; charset=utf-8'
  }).catch((ex) => console.log(ex))
}

// function LoginCheck(username, password) {
//   if (!UserExists(username)) return false;
//   const user = DB.Users.find((user) => user.Username === username);
//   return user.Password === password;
// }

// Checks if details are valid for login.
async function Login(username, password) {
  const userJSON = { username, password };
  let response;
  await $.ajax({
    url: server + "login",
    type: 'POST',
    xhrFields: { withCredentials: true },
    data: JSON.stringify(userJSON),
    contentType: 'application/json; charset=utf-8',
    success: () => { response = true; }
  }).catch(() => { response = false; })
  return response;
}

// async function Login(username, password) {
//   await axios.post(
//     server + 'login',
//     { username, password },
//     { withCredentials: true }
//   )
//   return true;
// }

// Returns user's nickname.
// function GetNickname(username) {
//   if (UserExists(username)) {
//     const user = DB.Users.find((user) => user.Username === username);
//     return user.Nickname;
//   }
// }

// Returns user's nickname.
// async function GetNickname(username) {
//   let response;
//   await $.ajax({
//     url: server + username,
//     type: 'GET',
//     contentType: 'application/json',
//     success: (data) => { console.log(data.data); },
//   }).catch(() => { response = true; })
//   return response;
// }

function GetNickname(contact) {
  return contact.name;
}

// Returns user's image.
// function GetImage(username) {
//   if (UserExists(username)) {
//     const user = DB.Users.find((user) => user.Username === username);
//     return user.Image;
//   }
// }

// Returns a picture of a crying cat brushing his tiny teeth
function GetImage(username) {
  return '/images/gpic.jpg';
}

// Returns user's last seen.
function GetLastSeen(contact) {
  // if (UserExists(username)) {
  //   const user = DB.Users.find((user) => user.Username === username);
  //   return user.LastSeen;
  // }
  return "Online";
}


// function GetContacts(username) {
//   if (UserExists(username)) {
//     const user = DB.Users.find((user) => user.Username === username);
//     return user.Contacts !== undefined ? user.Contacts : [];
//   }
//   return [];
// }

// Returns a JSON of the user's contacts.
async function GetContacts(setter) {
  // get json of contacts
  const func = await $.ajax({
    url: server + "contacts",
    type: 'GET',
    xhrFields: { withCredentials: true },
    contentType: 'application/json',
    dataType: 'json',
    success: (data) => { return data; },
  }).catch(() => { response = {}; }).then((data) => {
    return data;
  })
  const response = await func;
  setter(response);
}

async function GetContact(username) {
  if (username === undefined || username.length < 1 ) return undefined;
  let response;
  await $.ajax({
    url: server + 'contacts/' + username,
    type: 'GET',
    xhrFields: { withCredentials: true },
    contentType: 'application/json',
    success: (data) => { return data },
  }).catch(() => { response = true; }).then((data) => {response = data;})
  return response;
}

// Returns the chat of the user with another user, if exists.
// function GetChat(username, recipient) {
//   const user = DB.Users.find((u) => u.Username === username);
//   if (user !== undefined) {
//     const recip = DB.Users.find((r) => r.Username === recipient);
//     if (recip !== undefined) {
//       const chat = DB.Chats.find(
//         (c) =>
//           (c.Contact1 === recipient && c.Contact2 === username) ||
//           (c.Contact1 === username && c.Contact2 === recipient)
//       );
//       return chat;
//     }
//   }
//   return undefined;
// }

async function GetChat(contact, setter) {
  const func = await $.ajax({
    url: server + 'contacts/' + contact.id + '/messages',
    type: 'GET',
    xhrFields: { withCredentials: true },
    contentType: 'application/json',
    dataType: 'json',
    success: (data) => { return data; },
  }).catch(() => { response = {}; }).then((data) => { return data })
  const response = await func;
  setter(response);
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
  Login,
  UserExists,
  GetNickname,
  GetImage,
  GetChat,
  GetContacts,
  GetContact,
  GetLastMessage,
  GetLastSeen,
  GetTime
};
