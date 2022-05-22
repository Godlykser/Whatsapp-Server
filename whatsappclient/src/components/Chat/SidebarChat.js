import React from "react";
import "./SidebarChat.css";
import { GetImage, GetTime } from "../../DBAdapater";

export default function SidebarChat(props) {
  const lastMessage = (msg) => {
    if (msg === undefined) return "";
    if (msg.Type === "text") return <span className="sidebar__overflow">{msg.Content.length<43 ? msg.Content : msg.Content.substring(0,43) + "..."}</span>;
    if (msg.Type === "image")
      return (
        <span>
          <i className="bi bi-card-image" /> Image
        </span>
      );
    if (msg.Type === "video")
      return (
        <span>
          <i className="bi bi-film" /> Video
        </span>
      );
    else
      return (
        <span>
          <i className="bi bi-mic-fill" /> Voice Message
        </span>
      );
  };

  const lastMessageTime = props.lastMessage === undefined ? "" : GetTime(props.lastMessage.Time);

  return (
    <div
      className="sidebarChat"
      onClick={() => props.setActiveContact(props.contact.toLowerCase())}
    >
      <span>
        <img alt={props.contact} src={GetImage(props.contact)} />
        <div className="sidebarChat__info">
          <h2>{props.nickname}</h2>
          <p>{lastMessage(props.lastMessage)}</p>
        </div>
      </span>
      <span>
        <div className="lastMessageTime">{lastMessageTime}</div>
      </span>
    </div>
  );
}
