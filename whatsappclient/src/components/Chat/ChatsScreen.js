import { useState, useEffect } from "react";
import "./ChatsScreen.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { GetChat } from "../../DBAdapater";
import NotLogged from "../Forms/NotLogged";

export default function ChatsScreen(props) {

  const [activeContact, setActiveContact] = useState('');
  const [curChat, setCurChat] = useState(undefined);
  const [receiveMessage, setReceiveMessage] = useState(false);
  
  useEffect(() => {
    if (activeContact !== '') {
      GetChat(activeContact, setCurChat);
      props.setUpdateLastMessage(!props.updateLastMessage);
    }
  }, [activeContact]);

    if (props.activeUser === '') {
      return <NotLogged />;
    }

    return (
        <div className="chats__body">
            <Sidebar
                activeUser={props.activeUser}
                activeContact={activeContact}
                setActiveContact={setActiveContact}
                updateLastMessage={props.updateLastMessage}
                setCurChat={setCurChat} />
            <Chat
                curChat={curChat}
                setCurChat = { setCurChat }
                activeUser={props.activeUser}
                curContact={activeContact}
                setUpdateLastMessage={props.setUpdateLastMessage}
                updateLastMessage={props.updateLastMessage} 
                setReceiveMessage={setReceiveMessage}
                receiveMessage={receiveMessage} />
        </div>
    );
}
