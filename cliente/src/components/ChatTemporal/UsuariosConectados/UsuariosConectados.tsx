import { useContext } from "react"
import io from "socket.io-client";
import { UserContext } from "../../../context/TemporalUserContext";
import { useUsuariosConectados } from "../../../hooks/useUsuariosConectados";
// const socket = io("http://localhost:4000");
const socket = io();


const UsuariosConectados = () => {
    const { user, dispatch } = useContext(UserContext);
    const { usuarios } = useUsuariosConectados();
    const usuariosConectados = usuarios.filter(usuario => usuario.name !== user.name)


    const cerrarSesion = () => {
        socket.emit("manualDisconnect", user);
        dispatch({
            payload: { name: "", id: socket.id },
            type: "ADD"
        })
    }

    return (
        <div className={user.name.length > 0 ? "glassmorphism usuarios-conectados" : "display-none"}>
            <p className="me">&bull; {user.name}  <button onClick={cerrarSesion}><i className="fa-solid fa-xmark"></i><span>Cerrar Sesión.</span></button> </p>
            {/* <i class="fa-solid fa-arrow-left-from-line"></i> */}
            {usuariosConectados && usuariosConectados.map((usuarioConectado) => (
                <p key={usuarioConectado.id} className={user.name === usuarioConectado.name ? "me" : ""}>&bull; {usuarioConectado.name}</p>
            ))}
        </div>
    )
}

export default UsuariosConectados