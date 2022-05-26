import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import {
  GetLastMessage,
  GetContacts,
  GetNickname,
  GetChat,
  GetImage,
  GetTime,
} from "../../DBAdapater";
import AddContactButton from "./AddContactButton";
import LogoutButton from "./LogoutButton";

function Sidebar(props) {

  const [contacts, setContacts] = useState(undefined);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(contacts);

  useEffect(() => {
    GetContacts(setContacts);
  },[]);

  useEffect(() => {
    if (contacts !== undefined) {
      const filteredContacts = contacts.filter((name) =>
        GetNickname(name).toLowerCase().includes(search.toLowerCase())
      );
      setFilter(filteredContacts);
    }
  }, [search, JSON.stringify(contacts), props.updateLastMessage]); // stringify since useEffect doesn't catch array changes

  function sortContacts(contactsList) {
    if (contactsList === undefined) return [];
    contactsList.sort((a, b) => {
        const dateA = new Date(a.lastdate);
        const dateB = new Date(b.lastdate);
        return dateB - dateA;
    });
    return contactsList;
  }

  const s = () => { 
    if (contacts === undefined) return "";
    const con = (filter === undefined) ? contacts : filter;
    return (
    sortContacts(con).map((contact) => {
      return (
      <SidebarChat
        setActiveContact={props.setActiveContact}
        activeContact={props.activeContact}
        contact={contact}
        nickname={GetNickname(contact)}
        lastMessage={{Content: contact.last, Time: contact.lastdate}}
        key={contact.id}
      />
    )}));
  }

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <span>
          <img alt="profile" src={GetImage(props.activeUser)} />
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
        {/* {sortContacts(GetContacts()).map((key, contact) => {
          return (
          <SidebarChat
            setActiveContact={props.setActiveContact}
            contact={contact}
            nickname={GetNickname(contact)}
            lastMessage={GetLastMessage(GetChat(props.activeUser, contact))}
            key={contact}
          />
        )})} */}
        {s()}
      </div>
    </div>
  );
}

export default Sidebar;
