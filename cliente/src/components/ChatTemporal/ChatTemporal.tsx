import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../context/TemporalUserContext";
import ChatBody from "../ChatBody/ChatBody";
import LoginTemporal from "./LoginTemporal/LoginTemporal";
import UsuariosConectados from "./UsuariosConectados/UsuariosConectados";
import UsuarioDuplicadoComponent from "../UsuarioDuplicado/UsuarioDuplicadoComponent"
import io from "socket.io-client";
import { temporalUserValidate } from "../../utilities/temporalUserValidate.utility";
import { useUsuariosConectados } from "../../hooks/useUsuariosConectados";
import { User } from "../../types/types";
import Tooltip from "../Tooltip/Tooltip";
// const socket = io("http://localhost:4000");
const socket = io();




const ChatTemporal = () => {

    const [duplicado, setDuplicado] = useState<Array<User>>([])
    const { user, dispatch } = useContext(UserContext);
    let name = user ? user.name : "";
    const { usuarios, usuarioDuplicado } = useUsuariosConectados();
    const params = useLocation()


    useEffect(() => {
        // si ya existe usuario en el context, lo validamos nuevamente
        if (user.name.length > 2) {
            temporalUserValidate({ usuarios, name, dispatch })
        }

    }, [])

    useEffect(() => {
        if (usuarioDuplicado.id.length > 0) {
            // si existe usuario duplicado, validamos que no sea el usuario actual
            if (usuarioDuplicado.id == user.id && usuarioDuplicado.name == user.name) {
                // si el usuario actual esta duplicado, seteamos el estado, enviamos el evento para limpiar el usuario en el servido, y luego borramos el usuario actual
                setDuplicado([user]);
                setTimeout(() => {
                    socket.emit("limpiarDuplicado", user)
                    setDuplicado([]);

                    dispatch({
                        payload: { name: "", id: socket.id },
                        type: "ADD"
                    })

                }, 2000);
            }
        }

    }, [usuarioDuplicado])

    return (
        <>
            {!user.name ? (<LoginTemporal />) :
                <>
                    {duplicado.length > 0 && <UsuarioDuplicadoComponent />}
                    <UsuariosConectados />
                    <div className="chat glassmorphism">
                        <div className="chat-temporal-heading">
                            <div className="heading-tooltip">

                                <h1>Chat Temporal</h1>
                                <button className="tooltip">
                                    <i className="fa-solid fa-info"></i>
                                    <Tooltip msg={"Los mensajes enviados en este chat se eliminaran al refrescar la página."} />
                                </button>
                            </div>
                            <Link to="/" className="btn"><i className="fa-sharp fa-solid fa-arrow-left"></i> Chat Principal</Link>
                        </div>
                        <ChatBody type={"temporal"} />
                    </div>
                </>}
        </>
    )
}

export default ChatTemporal