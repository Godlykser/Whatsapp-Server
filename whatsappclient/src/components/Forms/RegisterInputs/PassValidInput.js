import { useState, useRef } from "react"
import { Overlay, Tooltip } from "react-bootstrap";


export default function PassValidInput({ setter, password }) {

    const [inputValid, setInputValid] = useState("")
    const [show, setShow] = useState(false);

    const target = useRef("");

    const poppy = () => {
        setShow(!show);
    }

    const validate = () => {
        let val = target.current.value;
        if (val === password && val.length > 0) {
            setter(val);
            setInputValid('is-valid');
        } else {
            setter('');
            setInputValid('is-invalid');
        }
        if (val.length === 0) setInputValid('');
    }
    
    return (
        <div className="form-floating mb-3">
            <input className={inputValid + " form-control styledInput"} id={'register-pass-check'} type='password' 
            placeholder=" " maxLength="22" ref={target} onKeyUp={validate} onFocus={poppy} onBlur={poppy} />
            <label className="input-label-margin" htmlFor={'register-pass-check'}>Confirm Password</label>
            <Overlay target={target.current} show={show} placement="right">
                {(props) => (
                    <Tooltip {...props}>
                        <ul className="align-left">
                            <li>Confirm your password.</li>
                        </ul>
                    </Tooltip>
                )}
            </Overlay>
        </div>
    )
}