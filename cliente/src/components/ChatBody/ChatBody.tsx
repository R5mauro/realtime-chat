import { FormEvent, useEffect, useState } from 'react';
import { useNewMessages } from '../../hooks/useNewMessages';
import Messages from '../Messages/Messages';
import { FirebaseMessage } from '../../types/types';
import { auth, db } from "../../services/firebase.service";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth";
import toast, { Toaster } from "react-hot-toast";

interface Props {
    type: "principal" | "temporal"
}

const ChatBody = ({ type }: Props) => {

    const [message, setMessage] = useState<string>("")
    const [messagesFirebase, setMessagesFirebase] = useState<Array<FirebaseMessage>>([])
    const { messages, handleSubmit } = useNewMessages({ message, type })
    const [user] = useAuthState(auth)

    const sendMessageFirebase = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const currentUser = auth.currentUser;
        let collectionMessages = collection(db, "messages");
        await addDoc(collectionMessages, {
            text: message,
            name: currentUser?.displayName,
            uid: currentUser?.uid,
            photo: currentUser?.photoURL,
            timestamp: serverTimestamp()
        })
    }

    const handleSubmitMessage = (e: FormEvent<HTMLFormElement>, type: string) => {
        e.preventDefault();

        if (message.trim().length > 0) {
            // valida que el mensaje no sea vacio
            if (type === "temporal") {
                handleSubmit(e)
            } else if (type === "principal") {
                if (user) {
                    sendMessageFirebase(e)
                }
                else {
                    toast.error('Es necesario iniciar sesión.')
                }
            }
        }
        setMessage("");

    }

    useEffect(() => {
        const newQuery = query(collection(db, "messages"), orderBy("timestamp"));
        const unsubscribe = onSnapshot(newQuery, (querySnapshot) => {
            let currentMessages: Array<FirebaseMessage> = [];
            querySnapshot.forEach(item => {
                currentMessages = [...currentMessages, { content: item.data(), id: item.id }]
            })
            setMessagesFirebase(currentMessages);

        })

        return unsubscribe;
    }, [])



    return (
        <div className="chat-body">
            {
                type === "principal"
                    ? <Messages type={type} messages={messagesFirebase} />
                    : <Messages type={type} messages={messages} />
            }
            <form onSubmit={(e) => handleSubmitMessage(e, type)} className="type-form">
                <input type="text"
                    value={message}
                    placeholder="Type a message..."
                    onChange={e => setMessage(e.target.value)} />
                <button className="btn" type='submit'>Send</button>
            </form>
        </div>
    )
}

export default ChatBody