import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import ChatBody from "../ChatBody/ChatBody";
import Tooltip from "../Tooltip/Tooltip";
import UserGoogle from "../UserGoogle/UserGoogle";

const ChatPrincipal = () => {

    return (
        <>
            <UserGoogle />
            <div className="chat glassmorphism">
                <div className="chat-temporal-heading">
                    <div className="heading-tooltip">
                        <h1>Chat Principal</h1>
                        <button className="tooltip">
                            <i className="fa-solid fa-info"></i>
                            <Tooltip msg={"Los mensajes enviados en este chat son permanentes."} />
                        </button>
                    </div>
                    <Link to="/temporal" state={{ "p": true }} className="btn"> Chat Temporal <i className="fa-solid fa-arrow-right"></i></Link>
                </div>
                <ChatBody type={"principal"} />
                <Toaster position="top-right"
                    reverseOrder={false} />
            </div>
        </>
    )
}

export default ChatPrincipal