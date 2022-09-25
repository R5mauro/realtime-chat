
import toast from "react-hot-toast";
import io from "socket.io-client";
import { User, UserActionReducer } from "../types/types";
// const socket = io("http://localhost:4000");
const socket = io();

interface Props {
    usuarios: Array<User>,
    name: string,
    dispatch: React.Dispatch<UserActionReducer>
}

export const temporalUserValidate = ({ usuarios, name, dispatch }: Props) => {
    console.log(usuarios, name);
    let nuevoArrayUsuarios = usuarios.map((user) => {
        return user.name.toLowerCase();
    })
    if (!nuevoArrayUsuarios.includes(name.toLowerCase())) {
        if (name.length > 2) {
            dispatch({
                payload: { name, id: socket.id },
                type: "ADD"
            })
            socket.emit("usuariosConectados", { name, id: socket.id })
        } else {
            toast.error('Ingrese un usuario válido')
        }
    } else {
        toast.error("El usuario ya existe");
    }
}