import { FormEvent, useContext, useEffect, useState } from 'react';
import io from "socket.io-client";
import { UserContext } from '../context/TemporalUserContext';
import { Message } from '../types/types';
import { soundNewMessage } from '../utilities/soundMessage.utility';
import { useUsuariosConectados } from './useUsuariosConectados';
// const socket = io("http://localhost:4000");
const socket = io();


interface Props {
    message?: string,
    type: "principal" | "temporal"
}

export const useNewMessages = ({ message, type }: Props) => {

    const [messages, setMessages] = useState<Array<Message>>([])
    const { user, dispatch } = useContext(UserContext);
    const { usuarios } = useUsuariosConectados();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!usuarios.find(({ name }) => name === user.name)) {
            dispatch({
                payload: { name: user.name, id: socket.id },
                type: "ADD"
            })
            socket.emit("usuariosConectados", { name: user.name, id: socket.id });
        }
        if (message && message.length > 0) {
            // valida que el mensaje no sea vacio
            socket.emit("message", { body: message, from: user })
            const sendMessage = {
                body: message,
                from: { ...user, name: "me" }
            }
            setMessages([
                ...messages,
                sendMessage
            ])
            // setMessage("");
        }
    }

    let content = document.querySelector(".messages-content");
    const toBottom = () => {
        if (content !== null) {
            content.lastElementChild?.scrollIntoView({ behavior: "smooth" });
        }
    }
    useEffect(() => {
        const receiveMessage = ({ body, from }: Message) => {
            setMessages([
                ...messages,
                {
                    body,
                    from
                }
            ])
            // 
            if (type === "temporal") {
                soundNewMessage()
            }
        }
        toBottom();
        socket.on("message", receiveMessage);
        return () => {
            socket.off("message", receiveMessage)
        }
    }, [messages])

    return { messages, handleSubmit }
}

// export default useSendMessages