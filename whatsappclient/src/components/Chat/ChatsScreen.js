import { useState, useEffect } from "react";
import "./ChatsScreen.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { GetChat } from "../../DBAdapater";
import NotLogged from "../Forms/NotLogged";

export default function ChatsScreen({ activeUser }) {

  const [activeContact, setActiveContact] = useState('');
  const [curChat, setCurChat] = useState(undefined);
  const [updateLastMessage, setUpdateLastMessage] = useState(false)
  
  useEffect(() => {
    if (activeContact !== '') {
      GetChat(activeContact, setCurChat);
      // setCurChat(GetChat(activeUser, activeContact));
    }
  }, [activeContact]);

    if (activeUser === '') {
      return <NotLogged />;
    }

    return (
        <div className="chats__body">
            <Sidebar
                activeUser={activeUser}
                activeContact={activeContact}
                setActiveContact={setActiveContact}
                updateLastMessage={updateLastMessage} />
            <Chat
                curChat={curChat}
                setCurChat = { setCurChat }
                activeUser={activeUser}
                curContact={activeContact}
                setUpdateLastMessage={setUpdateLastMessage}
                updateLastMessage={updateLastMessage} />
        </div>
    );
}
