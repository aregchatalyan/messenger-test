import { WebSocket } from 'ws';
import { IAction } from '../types';

export const wss = new WebSocket.Server({ noServer: true });

export const broadcast = (data: IAction) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}
