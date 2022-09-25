import express from "express";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import http from "http";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { PORT } from "./config.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))
const server = http.createServer(app);
const io = new SocketServer(server, {
    cors: {
        // origin: "*",
    }
});


app.use(cors());
app.use(morgan("dev"));

let usuariosConectados = [];
let usuarioDuplicado = { name: "", id: "" };

io.on("connection", (socket) => {
    socket.emit("usuariosConectados", usuariosConectados)

    socket.on("message", ({ body, from }) => {
        socket.broadcast.emit("message", { body, from })
    })
    socket.on("usuariosConectados", ({ name, id }) => {
        for (let i = 0; i < usuariosConectados.length; i++) {

            if (usuariosConectados[i].id == undefined || usuariosConectados[i].name == undefined) {
                // validamos que no existe un usario vacio
                usuariosConectados = usuariosConectados.filter(user => (user.id != undefined && user.name != undefined))
                continue;
            } else {
                // si no hay usuarios vacios, entonces..
                if (usuariosConectados[i].id == id && usuariosConectados[i].name == name) {
                    // validamos si es mismo usuario
                    // si es el mismo, emitimos el evento 
                    socket.broadcast.emit("usuariosConectados", usuariosConectados)
                    return;
                }
                if (usuariosConectados[i].id !== id && usuariosConectados[i].name == name) {
                    // validamos que no el nombre del usuario ingresante no sea igual a uno existente
                    // si es igual emitimos el aviso 
                    usuarioDuplicado = { name, id }
                    socket.broadcast.emit("duplicado", usuarioDuplicado)
                    socket.broadcast.emit("usuariosConectados", usuariosConectados)
                    return;
                }
            }

        }
        usuariosConectados = [...usuariosConectados, { name, id }]
        socket.broadcast.emit("usuariosConectados", usuariosConectados)
    })

    socket.on("limpiarDuplicado", () => {
        usuarioDuplicado = { name: "", id: "" };
    })
    socket.on("manualDisconnect", ({ name, id }) => {
        usuariosConectados = usuariosConectados.filter(user => user.id !== id && user.name !== name)
        socket.broadcast.emit("usuariosConectados", usuariosConectados)
    })
    socket.on("disconnect", () => {
        usuariosConectados = usuariosConectados.filter(user => user.id !== socket.id)
        socket.broadcast.emit("usuariosConectados", usuariosConectados)
    })
})

app.use(express.static(join(__dirname, "../cliente/build")))
// console.log(join(__dirname, "../cliente/build"));
server.listen(PORT);
console.log("server started on", PORT);