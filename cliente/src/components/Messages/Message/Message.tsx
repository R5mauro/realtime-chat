
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../../services/firebase.service'
import { doc, deleteDoc } from "firebase/firestore";

interface Props {
    msg: any
    type: "principal" | "temporal"
    id?: string
}

const MessageComponent = ({ msg, type, id }: Props) => {
    const [user] = useAuthState(auth)
    console.log(user);


    const borrarMensaje = async () => {
        // let collectionMessages = collection(db, "messages");
        await deleteDoc(doc(db, "messages", `${id}`));
        console.log("borrado");

    }
    return (
        <>
            {
                type === "principal"
                    ? <div className={msg.name === user?.displayName ? "my-message message" : "message"}>
                        <div className="message-content">
                            {msg.name === user?.displayName ? "" : <span>{`${msg.name}:`}</span>} {msg.text}
                            {/* solo mostrar cuando el admin esta logueado */
                                user?.email === "mauroromero0509@gmail.com"
                                && <button className='message-borrar' onClick={borrarMensaje}>
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            }

                        </div>
                    </div>
                    : <div className={msg.from.name === "me" ? "my-message message" : "message"}>
                        <div className="message-content">
                            {msg.from.name === "me" ? "" : <span>{`${msg.from.name}:`}</span>} {msg.body}
                        </div>
                    </div>
            }

        </>
    )
}

export default MessageComponent