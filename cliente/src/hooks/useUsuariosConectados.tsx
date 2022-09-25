import { useEffect, useState } from 'react'
import { User } from '../types/types';
import io from "socket.io-client";
// const socket = io("http://localhost:4000");
const socket = io();


export const useUsuariosConectados = () => {
    const [usuarios, setUsuarios] = useState<Array<User>>([]);
    const [usuarioDuplicado, setUsuarioDuplicado] = useState({ name: "", id: "" })
    useEffect(() => {
        const conectados = (users: any) => {
            if (users.length > 0) {
                setUsuarios(users)
            }
        }
        socket.on("usuariosConectados", conectados);
        return () => {
            socket.off("usuariosConectados", conectados)
        }

    }, [usuarios])
    useEffect(() => {

        const desconectarUsuario = ({ name, id }: any) => {
            setUsuarioDuplicado({ name, id })
        }
        socket.on("duplicado", desconectarUsuario)
        return () => {
            socket.off("duplicado", desconectarUsuario)
        }

    }, [usuarios])

    return { usuarios, usuarioDuplicado }
}
