import { useState } from 'react';
import $ from 'jquery'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import '../../Chat/AttachButton.css'

export default function ImageInput({ setter }) {

    const [show, setShow] = useState(false);
    const [image, setImage] = useState('')

    // Shows the image preview
    const previewImage = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        $('#imagePreview').show(200);
    }

    // Closes the modal
    const close = () => {
        setShow(false);
        $('#imagePreview').hide(300);
    }

    const upload = (e) => {
        e.preventDefault();
        if (image !== '') {
            $('#a').addClass("is-valid");
            setter(image);
            close();
        } else {
            $('#invalidImage').show();
            setTimeout(() => {$('#invalidImage').hide();}, 4500);
        }
    }

    return (
        <>
            <div id="a" className={"mb-3 styledInput register-image pointer form-control"} onClick={() => { setShow(true); }} >
                <label className="pointer" ><i className="bi bi-cloud-arrow-up" /> Upload an image</label>
            </div>
            <Modal show={show} onHide={close} centered>
                <Modal.Header>
                    <Modal.Title>Pick your profile picture</Modal.Title>
                </Modal.Header>
                <Modal.Body className='attachModalBody' >
                    <input id="register-image" type="file" accept="image/*" onChange={previewImage} />
                    <label className='attachIcon' htmlFor='register-image'><i className="bi bi-cloud-arrow-up" /></label>
                    <br />
                    <label className='attachLabel' htmlFor="register-image">Click to upload your image</label>
                    <div id='imagePreview'>
                        <img alt='preview' src={image} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <span id="invalidImage">Oops! You didn't upload an image!</span>
                    <Button className="closeModalButton" onClick={close}>Cancel</Button>
                    <Button className='uploadModalButton' onClick={upload} ><i className="bi bi-cloud-arrow-up" /> Upload</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}