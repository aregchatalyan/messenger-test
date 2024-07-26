import { IMessage } from '../../types';
import { broadcast } from '../../socket/wss';

const messages: IMessage[] = [];

export class MessageService {
  static getAllMessages() {
    return messages;
  }

  static createMessage(text: string) {
    if (messages.length >= 9) {
      const message = messages.shift()!;
      broadcast({ type: 'delete_message', message });
    }

    const message: IMessage = { id: Date.now(), text }
    messages.push(message);

    broadcast({ type: 'new_message', message });

    return message;
  }
}
