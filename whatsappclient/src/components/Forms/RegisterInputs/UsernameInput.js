import { useState, useRef } from "react";
import { Overlay, Tooltip } from "react-bootstrap";
import { UserExists } from "../../../DBAdapater";


export default function UsernameInput ({ setter }) {
    const id = "register-username";
    const [show, setShow] = useState(false);

    const [li1, setli1] = useState("");
    const [li2, setli2] = useState("");
    const [li3, setli3] = useState("");

    const [validli1, setValidli1] = useState("");
    const [validli2, setValidli2] = useState("");
    const [validli3, setValidli3] = useState("");

    const target = useRef("");

    const [inputValid, setInputValid] = useState("")

    function poppy() {
        validate();
        setShow(!show);
    }

    let f1, f2, f3;

    function validate() {
        let val = target.current.value;
        if (UserExists(val)) {
            setli3(<span><i className="bi bi-x-lg"></i> Already in use</span>)
            setValidli3('badInput');
            f3 = false;
        } else {
            setli3(<span><i className="bi bi-check-lg"></i> Free to use!</span>)
            setValidli3('goodInput');
            f3 = true;
        }

        if (val.match(/^[a-zA-Z0-9]*$/)) {
            setli2(<span><i className="bi bi-check-lg"></i> Not using symbols</span>)
            setValidli2('goodInput');
            f2 = true;
        } else {
            setli2(<span><i className="bi bi-x-lg"></i> Using special symbols</span>)
            setValidli2('badInput');
            setli3('');
            f2 = false;
        }

        if (val.length > 12 || val.length < 3) {
            setli1(<span><i className="bi bi-x-lg"></i> Between 3 to 12 chars</span>)
            setValidli1('badInput');
            setli2('');
            setli3('');
            f1 = false;
        } else {
            setli1(<span><i className="bi bi-check-lg"></i> Between 3 to 12 chars</span>)
            setValidli1('goodInput');
            f1 = true;
        }

        if (f1 && f2 && f3){
            setter(val)
            setInputValid('is-valid');
        } else {
            setter('');
            setInputValid('is-invalid');
        }
        if (val.length === 0) setInputValid(''); 
    }


    return (
        <div className="form-floating mb-3">
            <input className={inputValid + " form-control styledInput"} id={id} placeholder=" " maxLength="12"
                ref={target} onKeyUp={validate} onFocus={poppy} onBlur={() => {setShow(!show);}}/>
            <label className="input-label-margin" htmlFor={id}>Username</label>
            <Overlay target={target.current} show={show} placement="right">
                {(props) => (
                    <Tooltip {...props}>
                        <ul className="align-left">
                            <li>Choose your username.</li>
                            <li id="usernameli1" className={validli1}>{li1}</li>
                            <li id="usernameli2" className={validli2}>{li2}</li>
                            <li id="usernameli3" className={validli3}>{li3}</li>
                        </ul>
                    </Tooltip>
                )}
            </Overlay>
        </div>
    );
}