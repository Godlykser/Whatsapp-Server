import $ from "jquery";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "./AttachButton.css";
import SendButton from "./SendButton";

export default function SendImageButton(props) {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState("");

  // Sends the image in chat
  const sendImage = (e) => {
    if (image !== "") {
      props.sendMessage(e, "image", image);
      close();
    } else {
      $(".didntUpload").show();
      setTimeout(() => {
        $(".didntUpload").hide();
      }, 4500);
    }
  };

  // Shows the image preview
  const previewImage = (e) => {
    $("#imagePreview").show(300);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  // Closes the modal
  const close = () => {
    setShow(false);
    setImage("");
    $("#imagePreview").hide(300);
  };

  return (
    <>
      <li
        onClick={() => {
          setShow(true);
        }}
      >
        <span className="dropdown-item">
          <i className="bi bi-image attachment-icon" />
        </span>
      </li>
      <Modal show={show} onHide={close} centered>
        <Modal.Header>
          <Modal.Title>Send an image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="attachModalBody">
          <input
            id="attachImage"
            type="file"
            accept="image/*"
            onChange={previewImage}
          />
          <label className="attachIcon" htmlFor="attachImage">
            <i className="bi bi-cloud-arrow-up" />
          </label>
          <br />
          <label className="attachLabel" htmlFor="attachImage">
            Click to upload your image
          </label>
          <div id="imagePreview">
            <img alt="preview" src={image} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <span className="didntUpload">
            Oops! You did not select an image!{" "}
          </span>
          <Button className="closeModalButton" onClick={close}>
            Cancel
          </Button>
          <form onSubmit={sendImage}>
            <SendButton />
          </form>
        </Modal.Footer>
      </Modal>
    </>
  );
}
