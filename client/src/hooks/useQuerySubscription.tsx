import { useCallback, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { WS_URL } from '../config';
import { EventTypes, IMessage } from '../types';

export const useQuerySubscription = () => {
  const queryClient = useQueryClient();
  const [ socket, setSocket ] = useState<WebSocket>();

  const newMessage = useCallback((message: IMessage) => {
    queryClient.setQueryData<IMessage[]>('messages', (prev) => {
      return [ ...(prev || []), message ];
    });
    toast.success(`New message ID: ${ message.id }`);
  }, [ queryClient ]);

  const deleteMessage = useCallback((message: IMessage) => {
    toast.success(`Removed message ID: ${ message.id }`);
  }, []);

  useEffect(() => {
    const ws = new WebSocket(WS_URL!);
    setSocket(ws);

    ws.onmessage = (e) => {
      const { type, message } = JSON.parse(e.data);

      switch (type) {
        case EventTypes.NEW_MESSAGE:
          return newMessage(message);
        case EventTypes.DELETE_MESSAGE:
          return deleteMessage(message);
        default:
          console.error('Unknown event type:', type);
      }
    }

    return () => ws.close();
  }, [ queryClient, newMessage, deleteMessage ]);

  return { queryClient, socket }
}
