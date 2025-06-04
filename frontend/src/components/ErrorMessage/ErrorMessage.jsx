import {FaExclamationCircle} from 'react-icons/fa';
import { BsExclamationCircle } from "react-icons/bs";
import "./ErrorMessage.css";

function ErrorMessage ({message, messageId}) {
    return (
        <p id={messageId} className="error-message hidden" role="alert"><FaExclamationCircle />{message}</p>
    );
}

export default ErrorMessage;