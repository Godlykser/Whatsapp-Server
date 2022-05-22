import $ from "jquery";
import React, { useState } from "react";
import {
  AddMessage,
  GetImage,
  GetLastSeen,
  GetNickname,
  GetTime
} from "../../DBAdapater";
import AttachButton from "./AttachButton";
import "./Chat.css";
import SendButton from "./SendButton";
// import SendVoiceButton from "./SendVoiceButton";
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

  // Make everything work smoothly
  const cleanUp = () => {
    setMessageInput("");
    const upd = !props.updateLastMessage;
    props.setUpdateLastMessage(upd);
    $("#chatBody").scrollTop(0);
  };

  // Adds sender design to messages
  const isSender = (msg) => {
    return msg.Sender === props.activeUser ? "chat__sender" : "";
  };

  // Displays the message by type
  const displayMessageContent = (msg) => {
    if (msg.Type === "text")
      return <span className="message__text">{msg.Content}</span>;
    else if (msg.Type === "image")
      return <img className="chatImage" alt="" src={msg.Content} />;
    else if (msg.Type === "video")
      return (
        <video className="chatVideo" src={msg.Content} controls="controls" />
      );
    else {
      return (
        <>
          <audio
            className={`${
              isSender(msg) === "chat__sender"
                ? "chatAudioSender"
                : "chatAudioReciever"
            }`}
            controls
          >
            <source src={msg.Content} type="audio/mp3" />
          </audio>
          <img
            className="audioAvatar"
            alt={msg.Sender}
            src={GetImage(msg.Sender)}
          />
        </>
      );
    }
  };

  // Sends a message to the chat
  function sendMessage(e, type, content) {
    e.preventDefault();
    if (content !== "") {
      AddMessage(props.curChat, props.activeUser, type, content);
      cleanUp();
    }
  }

  // Displays all messages in chat
  const displayMessages = () => {
    return props.curChat === undefined ? (
      <></>
    ) : (
      <>
        {props.curChat.Messages.map((msg) => (
          <div
            className={
              "chat__message " + isSender(msg) + " " + msg.Type + "__message"
            }
            key={k++}
          >
            {displayMessageContent(msg)}
            <span className="chat__timestamp">{GetTime(msg.Time)}</span>
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
              {/* <SendVoiceButton sendMessage={sendMessage} /> */}
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