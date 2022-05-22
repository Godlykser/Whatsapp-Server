import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import {
  GetLastMessage,
  GetContacts,
  GetNickname,
  GetChat,
  GetImage,
} from "../../DBAdapater";
import AddContactButton from "./AddContactButton";
import LogoutButton from "./LogoutButton";

function Sidebar(props) {
  // const contacts = GetContacts(props.activeUser);
  const [contacts, setContacts] = useState(GetContacts(props.activeUser));
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(contacts);

  useEffect(() => {
    if (contacts !== undefined) {
      const filteredContacts = contacts.filter((name) =>
        GetNickname(name).toLowerCase().includes(search.toLowerCase())
      );
      setFilter(filteredContacts);
    }
  }, [search, JSON.stringify(contacts), props.updateLastMessage]); // stringify since useEffect doesn't catch array changes

  const sortContacts = (contactA, contactB) => {
    // debugger;
    const chat1 = GetChat(props.activeUser, contactA);
    const chat2 = GetChat(props.activeUser, contactB);
    if (chat1.Messages.length === 0) return -1;
    if (chat2.Messages.length === 0) return -1;
    const time1 = new Date(GetLastMessage(chat1).Time);
    const time2 = new Date(GetLastMessage(chat2).Time);
    return time2 - time1;
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <span>
          <img alt="profile" src={GetImage(props.activeUser)} />
          {/* <span>{GetNickname(props.activeUser)}</span> */}
        </span>
        <span>
          <AddContactButton
            activeUser={props.activeUser}
            setActiveContact={props.setActiveContact}
            setContacts={setContacts}
            contacts={contacts}
          />
          <LogoutButton />
        </span>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <i className="bi bi-search" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search a chat..."
            type="text"
          />
        </div>
      </div>

      <div className="sidebar__chats">
        {filter.sort(sortContacts).map((contact) => (
          <SidebarChat
            setActiveContact={props.setActiveContact}
            contact={contact}
            nickname={GetNickname(contact)}
            lastMessage={GetLastMessage(GetChat(props.activeUser, contact))}
            key={contact}
          />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
