import { useState, useRef } from "react";
import { Overlay, Tooltip } from "react-bootstrap";
import '../forms.css'


export default function ({ setter }) {
    const id = "register-password";

    const [show, setShow] = useState(false);

    const [li1, setli1] = useState("");
    const [li2, setli2] = useState("");
    const [li3, setli3] = useState("");
    const [li4, setli4] = useState("");
    const [li5, setli5] = useState("");

    const [validli1, setValidli1] = useState("");
    const [validli2, setValidli2] = useState("");
    const [validli3, setValidli3] = useState("");
    const [validli4, setValidli4] = useState("");
    const [validli5, setValidli5] = useState("");

    const [inputValid, setInputValid] = useState("")


    const target = useRef("");

    function poppy() {
        validate();
        setShow(!show);

    }

    let f1, f2, f3, f4, f5;

    function validate() {
        let val = target.current.value;

        if (val.length < 8 || val.length > 22) {
            setli1(<span><i className="bi bi-x-lg"></i> 8 to 22 chars</span>)
            setValidli1('badInput');
            f1 = false;
        } else {
            setli1(<span><i className="bi bi-check-lg"></i> 8 to 22 chars</span>)
            setValidli1('goodInput');
            f1 = true;
        }

        if (val.match(/[a-z]/) && val.length > 0) {
            setli2(<span><i className="bi bi-check-lg"></i> Small letter</span>)
            setValidli2('goodInput');
            f2 = true;
        } else {
            setli2(<span><i className="bi bi-x-lg"></i> Small letter</span>)
            setValidli2('badInput');
            f2 = false;
        }

        if (val.match(/[A-Z]/) && val.length > 0) {
            setli3(<span><i className="bi bi-check-lg"></i> Capital letter</span>)
            setValidli3('goodInput');
            f3 = true;
        } else {
            setli3(<span><i className="bi bi-x-lg"></i> Capital letter</span>)
            setValidli3('badInput');
            f3 = false;
        }

        if (val.match(/[0-9]/) && val.length > 0) {
            setli4(<span><i className="bi bi-check-lg"></i> Any number</span>)
            setValidli4('goodInput');
            f4 = true;
        } else {
            setli4(<span><i className="bi bi-x-lg"></i> Any number</span>)
            setValidli4('badInput');
            f4 = false;
        }

        if (val.match(/[~!@#$%^&*()\\{}[\]._/\-+="':;`]/) && val.length > 0) {
            setli5(<span><i className="bi bi-check-lg"></i> Special symbol</span>)
            setValidli5('goodInput');
            f5 = true;
        } else {
            setli5(<span><i className="bi bi-x-lg"></i> Special symbol</span>)
            setValidli5('badInput');
            f5 = false;
        }

        if (f1 && f2 && f3 && f4 && f5) {
            setter(val);
            setInputValid('is-valid')
        } else {
            setter('');
            setInputValid('is-invalid')
        }
        if (val.length === 0) setInputValid('')

    }


    return (
        <div className="form-floating mb-3">
            <input className={inputValid + " form-control styledInput"} type="password" id={id} placeholder=" " maxLength="22"
                ref={target} onKeyUp={validate} onFocus={poppy} onBlur={() => { setShow(!show); }} />
            <label className="input-label-margin" htmlFor={id}>Password</label>
            <Overlay target={target.current} show={show} placement="right">
                {(props) => (
                    <Tooltip {...props}>
                        <ul className="align-left">
                            <li>Choose you password.<br/>Please include:</li>
                            <li id="passwordli1" className={validli1}>{li1}</li>
                            <li id="passwordli2" className={validli2}>{li2}</li>
                            <li id="passwordli3" className={validli3}>{li3}</li>
                            <li id="passwordli4" className={validli4}>{li4}</li>
                            <li id="passwordli5" className={validli5}>{li5}</li>
                        </ul>
                    </Tooltip>
                )}
            </Overlay>
        </div>
    );
}