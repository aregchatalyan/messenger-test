import cors from 'cors';
import express from 'express';
import { config } from './config';
import { wss } from './socket/wss';
import { router } from './api/messages/message.routes';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();
const PORT = config.get('PORT');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/messages', router);

app.use(errorMiddleware);

const server = app.listen(PORT, () => {
  console.log('Listening on port:', PORT);
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});
