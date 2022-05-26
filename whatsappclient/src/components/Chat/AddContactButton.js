import { React, useState, useEffect } from "react";
import "./AddContactButton.css";
import { UserExists, AddContact } from "../../DBAdapater";

function AddContactButton(props) {
  const [disabled, setDisabled] = useState(true);
  const [contact, setContact] = useState("");

  useEffect(() => {
    var temp = (!UserExists(contact) || contact===props.activeUser);
    setDisabled(temp);
  }, [contact]);

  const addContact = () => {
    if (UserExists(contact) && contact!==props.activeUser) {
      AddContact(props.activeUser, contact);
      props.setActiveContact(contact);
    }
    setContact("");
    const updatedContacts = props.contacts;
    props.setContacts(updatedContacts);
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
                    placeholder="Contact's contact"
                    id="floatingInput"
                    className="form-control"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                  <label htmlFor="floatingInput">Add Contact</label>
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
