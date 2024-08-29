import { App as uWSApp } from 'uWebSockets.js';

const PORT = 9001;

const MAIN_ROOM = 'main';

const app = uWSApp().ws('/*', {
  open: (socket) => {
    console.log({ socket });
    socket.subscribe(MAIN_ROOM);
  },
  message: (socket, message, isBinary) => {
    console.log({ socket, message: message.toString(), isBinary });
    app.publish(MAIN_ROOM, message, true);
  },
});

app.listen(PORT, (listenSocket) => {
  if (listenSocket) {
    console.log('Listening to port 9001');
  }
});
