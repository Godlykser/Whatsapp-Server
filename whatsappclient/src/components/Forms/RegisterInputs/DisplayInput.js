import { useState, useRef } from "react";
import { Overlay, Tooltip } from "react-bootstrap";

export default function DisplayInput ({ setter }) {
    const id = "register-display-name";
    const [show, setShow] = useState(false);

    const [li1, setli1] = useState("");
    const [li2, setli2] = useState("");

    const [validli1, setValidli1] = useState("");
    const [validli2, setValidli2] = useState("");

    const target = useRef("");

    const [inputValid, setInputValid] = useState("")

    function poppy() {
        validate();
        setShow(!show);
        
    }

    let f1, f2;

    function validate() {
        let val = target.current.value;

        if (val.match(/^[A-Za-z ._]*$/)) {
            setli2(<span><i className="bi bi-check-lg"></i> Only permitted chars</span>)
            setValidli2('goodInput');
            f2 = true;
        } else {
            setli2(<span><i className="bi bi-x-lg"></i> Only permitted chars</span>)
            setValidli2('badInput');
            f2 = false;
        }

        if (val.length > 14 || val.length < 1) {
            setli1(<span><i className="bi bi-x-lg"></i> Between 1 to 14 chars</span>)
            setValidli1('badInput');
            setli2('');
            f1 = false;
        } else {
            setli1(<span><i className="bi bi-check-lg"></i> Between 1 to 14 chars</span>)
            setValidli1('goodInput');
            f1 = true;
        }

        if (f1 && f2){
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
            <input className={inputValid + " form-control styledInput"} id={id} placeholder=" " maxLength="14"
                ref={target} onKeyUp={validate} onFocus={poppy} onBlur={() => {setShow(!show);}}/>
            <label className="input-label-margin" htmlFor={id}>Display Name</label>
            <Overlay target={target.current} show={show} placement="right">
                {(props) => (
                    <Tooltip {...props}>
                        <ul className="align-left">
                            <li>You can use letters, spaces, points and underscores.<br/> Please include:</li>
                            <li id="usernameli1" className={validli1}>{li1}</li>
                            <li id="usernameli2" className={validli2}>{li2}</li>
                        </ul>
                    </Tooltip>
                )}
            </Overlay>
        </div>
    );
}