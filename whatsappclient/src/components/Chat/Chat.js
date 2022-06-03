import $ from "jquery";
import React, { useEffect, useState } from "react";
import {
  AddMessage,
  GetImage,
  GetLastSeen,
  GetNickname,
  GetTime,
  GetChat,
  signalR,
  GetServer,
  Transfer
} from "../../DBAdapater";
import AttachButton from "./AttachButton";
import "./Chat.css";
import SendButton from "./SendButton";
import SendVoiceButton2 from "./SendVoiceButton2";

export default function Chat(props) {
  const [messageInput, setMessageInput] = useState("");
  const [recordInput, setRecordInput] = useState("");

  let k = 1; // Unique key for messages

  const submit = (e) => {
    e.preventDefault();
    if (recordInput !== "") {
      sendMessage(e, "audio", recordInput);
      $("#voiceControl").hide(250);
      $("#validButton").hide();
      $("#pauseAudioButton").hide();
      $("#playAudioButton").hide();
      $("#stopButton").css("display", "inline-block");
      $("#playRecord").css("color", "black");
      $("#voiceTime").html("00:00");
      $("#chatInput").attr("disabled", false);
      setRecordInput("");
    } else if (messageInput !== "") sendMessage(e, "text", messageInput);
  };

  useEffect( () => {
    GetChat(props.curContact, props.setCurChat);
  }, [props.receiveMessage]);

  useEffect( async () => {
    signalR(props.activeUser, props.setReceiveMessage, props.receiveMessage);
  }, [props.activeUser]);

  // Make everything work smoothly
  const cleanUp = () => {
    setMessageInput("");
    const upd = !props.updateLastMessage;
    props.setUpdateLastMessage(upd);
    $("#chatBody").scrollTop(0);
  };

  // Adds sender design to messages
  const isSender = (msg) => {
    return msg.belongs === props.activeUser ? "chat__sender" : "";
  };

  // Displays the message by type
  const displayMessageContent = (msg) => {
    return <span className="message__text">{msg.content}</span>;
  };

  // Sends a message to the chat
  async function sendMessage(e, type, content) {
    e.preventDefault();
    if (content !== "") {
      await AddMessage(props.activeUser, props.curContact.id, content);
      if(GetServer() !== props.curContact.server) {
        await Transfer(props.curContact.id, props.activeUser, content, props.curContact.server);
      }
      await GetChat(props.curContact, props.setCurChat);
      cleanUp();
    }
  }

  // Displays all messages in chat
  const displayMessages = () => {
    return props.curChat === undefined ? (
      <></>
    ) : (
      <>
        {props.curChat.map((msg) => (
          <div
            className={
              "chat__message " + isSender(msg) + " text__message"
            }
            key={k++}
          >
            {displayMessageContent(msg)}
            <span className="chat__timestamp">{GetTime(msg.created)}</span>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      {props.curContact !== "" ? (
        <div className="chat">
          <div id="chatHeader" className="chat__header">
            <div className="chat__headerInfo">
              <img src={GetImage(props.curContact)} alt="" />
              <span>
                <p>{GetNickname(props.curContact)}</p>
                <span>{GetLastSeen(props.curContact)}</span>
              </span>
            </div>
          </div>

          <div id="chatBody" className="chat__body">
            <div>{displayMessages()}</div>
          </div>

          <div id="chatFooter" className={"chat__footer"}>
            <AttachButton {...props} sendMessage={sendMessage} />
            <form onSubmit={submit}>
              <input
                id="chatInput"
                value={messageInput}
                onChange={(e) => {
                  setMessageInput(e.target.value);
                }}
                placeholder="Type a message..."
                type="text"
              />
              <SendVoiceButton2
                input={recordInput}
                setInput={setRecordInput}
                setMessageInput={setMessageInput}
              />
              <SendButton />
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}