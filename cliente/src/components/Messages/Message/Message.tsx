
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../services/firebase.service'

interface Props {
    msg: any
    type: "principal" | "temporal"
}

const MessageComponent = ({ msg, type }: Props) => {
    const [user] = useAuthState(auth)
    return (
        <>
            {
                type === "principal"
                    ? <div className={msg.name === user?.displayName ? "my-message message" : "message"}>
                        <div className="message-content">
                            {msg.name === user?.displayName ? "" : <span>{`${msg.name}:`}</span>} {msg.text}
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