import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import ChatBody from "../ChatBody/ChatBody";
import UserGoogle from "../UserGoogle/UserGoogle";

const ChatPrincipal = () => {

    return (
        <>
            <UserGoogle />
            <div className="chat glassmorphism">
                <div className="chat-temporal-heading">
                    <h1>Chat Principal</h1>
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