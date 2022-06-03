import $ from 'jquery';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const noApiServer = "http://localhost:5064/";
const server = "http://localhost:5064/api/";
let signalRConnection;

// Connect to server via SignalR
const signalR = async (username, setter, value) => {
  
  try {
    const connection = new HubConnectionBuilder().withUrl(noApiServer + 'signalRHub')
                                  .configureLogging(LogLevel.Information).build();
    console.log(connection.baseUrl)
        
    await connection.start();
    connection.on('ReceiveMessage', () => { setter(!value) });
    await connection.invoke('AddUser', username);
    signalRConnection = connection;
    
  } catch (e) {
    console.log(e);
  }
}

// Returns the SignalR connection
const GetConnection = () => {
  return signalRConnection;
}

// Returns the server address
const GetServer = () => {
  return noApiServer;
}

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

// Adds user to the DB.
async function AddUser(username, nickname, password, image) {
  const userJSON = { username, password };
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

// Add a contact
async function AddContact(id, name, contactServer) {
  const contactJSON = { id, name, server: contactServer }
  console.log(JSON.stringify(contactJSON))
  await $.ajax({
    url: server + 'contacts',
    type: 'POST',
    xhrFields: { withCredentials: true },
    data: JSON.stringify(contactJSON),
    contentType: 'application/json; charset=utf-8'
  }).catch((ex) => console.log(ex))
}

// Invite a contact
async function Invitation(to, from, contactServer) {
  const contactJSON = { to, from, server: noApiServer }
  let response;
  await $.ajax({
    url: contactServer + 'invitations',
    type: 'POST',
    xhrFields: { withCredentials: true },
    data: JSON.stringify(contactJSON),
    contentType: 'application/json; charset=utf-8'
  }).catch((ex) => console.log(ex))
}

// Transfer a message
async function Transfer(to, from, content, contactServer) {
  const contactJSON = { to, from, content }
  await $.ajax({
    url: contactServer + 'transfer',
    type: 'POST',
    xhrFields: { withCredentials: true },
    data: JSON.stringify(contactJSON),
    contentType: 'application/json; charset=utf-8'
  }).catch((ex) => console.log(ex))
}

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

// Returns contacts name
function GetNickname(contact) {
  return contact.name;
}

// Returns a picture of a crying cat brushing his tiny teeth
function GetImage(username) {
  return '/images/gpic.jpg';
}

// Returns user's last seen.
function GetLastSeen(contact) {
  return "Online";
}

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

// Returns a contact JSON by id
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

// Sets up the chat with this contact
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

// Returns formatted date
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
  GetTime,
  signalR,
  GetConnection,
  GetServer,
  Invitation,
  Transfer
};
