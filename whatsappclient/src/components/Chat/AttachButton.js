import React from "react";
import { NavDropdown } from "react-bootstrap";
import { useState } from "react";
import "./AttachButton.css";
import SendImageButton from "./SendImageButton";
import SendVideoButton from "./SendVideoButton";

function AttachButton(props) {
    const [show, setShow] = useState(false);

    return (
        <div className="dropup">
            <NavDropdown title={<i className="bi bi-paperclip attachment-icon" />} id="chat-attachment"
                show={show} onMouseEnter={() => { setShow(true); }} onMouseLeave={() => { setShow(false); }} onClick={() => {setShow(false);}}>
                <SendVideoButton {...props} />
                <SendImageButton {...props} />
            </NavDropdown> 
        </div>
    )
}

export default AttachButton;
