import { React, useState, useEffect } from "react";
import "./AddContactButton.css";
import { UserExists, AddContact, GetChat, GetContact } from "../../DBAdapater";

function AddContactButton(props) {
  const [disabled, setDisabled] = useState(true);
  const [contact, setContact] = useState("");
  const [name, setName] = useState("");
  const [server, setServer] = useState("");

  useEffect(() => {
    var temp = (!UserExists(contact.id) || contact.id===props.activeUser);
    setDisabled(temp);
  }, [contact]);

  const addContact = async () => {
    if (contact === '' || contact === '' || server === '') return;
    if (UserExists(contact) && contact !== props.activeUser) {
      await AddContact(contact, name, server);
      const newContact = await GetContact(contact);
      await GetChat(newContact, props.setCurChat);
      props.setActiveContact(newContact);
      setContact("");
      setName("");
      setServer("");
    }
    // const updatedContacts = props.contacts;
    // props.setContacts(updatedContacts);
  };

  const clearContact = () => {
    setContact("");
  };

  return (
    <div>
      <button
        type="button"
        className="btn addContact"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <i className="bi bi-person-plus"></i>
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addContact();
            }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add new contact
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={clearContact}
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    placeholder="Contact's id"
                    id="contactid"
                    className="form-control"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                  <label htmlFor="contactid">ID</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    placeholder="Contact's name"
                    id="contactname"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label htmlFor="contactname">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    placeholder="Contact's server"
                    id="contactser"
                    className="form-control"
                    value={server}
                    onChange={(e) => setServer(e.target.value)}
                  />
                  <label htmlFor="contactser">Server</label>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="addContact"
                  disabled={disabled}
                  data-bs-dismiss="modal"
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddContactButton;
