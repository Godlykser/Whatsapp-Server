import { useRef } from "react"


export default function InputForm({ placeholder, type, id, max, setter }) {

    const target = useRef("");
    
    return (
        <div className="form-floating mb-3">
            <input onKeyUp={() => {setter(target.current.value);}} ref={target} className={"form-control styledInput"} id={id} type={type} placeholder=" " maxLength={max}/>
            <label className="input-label-margin" htmlFor={id}>{placeholder}</label>
        </div>
    )
}
