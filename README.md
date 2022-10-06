# realtime-chat
Aplicacion de chat en tiempo real construida con React, TypeScript, Firebase y Socket.io

## Uso
Esta app cuenta con dos chats distintos.
El primero es el chat principal. En éste los mensajes se guardan en una base de datos creada con Firebase. Para poder enviar un mensaje es preciso loguearse
con una cuenta Gmail.
El segundo chat, llamado chat "temporal", los mensajes solo se mantienen mientras el usuario permanezca en línea. Una vez desconectado, ya no podrá recuperar los mensajes
enviados y recibidos anterior a su nueva conexión o inicio de sesión. En este chat solo es necesario loguearse con un nombre de usuario cualquiera.
Tambien puede conectarse a este chat con dos (o más) distintos usuarios desde pestañas distintas.
