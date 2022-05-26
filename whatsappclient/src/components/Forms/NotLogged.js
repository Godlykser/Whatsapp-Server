import { useNavigate } from "react-router-dom";

export default function NotLogged() {
    const navi = useNavigate()

    return (
        <div className="mainContainer">
            <div className="welcomeText" >OOPS!</div>
            <div className="notLoggedMessage" >You must log in to view this content!</div>
            <button id='registerSubmit' className="mainButton w-50 btn mt-3" onClick={() => {navi("/")}}>Back to Homepage</button>
        </div>
    );
}