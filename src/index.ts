import { toNumber } from 'lodash-es';
import { App as uWSApp } from 'uWebSockets.js';

const PORT = process.env.PORT ? toNumber(process.env.PORT) : 3000;

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
  if (!listenSocket) {
    console.log(`Failed to listen to port ${PORT}`);
    return;
  }

  console.log(`Listening to port ${PORT}`);
});
