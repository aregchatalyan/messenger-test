import { createContext, FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';
import { EventTypes, IMessage } from '../types';

const WebSocketContext = createContext<WebSocket | undefined>(undefined);

interface WebSocketContextProps {
  children: ReactNode;
  url: string;
}

export const WebSocketProvider: FC<WebSocketContextProps> = ({ children, url }) => {
  const [ socket, setSocket ] = useState<WebSocket>();

  const queryClient = useQueryClient();

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
    const ws = new WebSocket(url);
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
  }, [ newMessage, deleteMessage, url ]);

  return (
    <WebSocketContext.Provider value={ socket }>
      { children }
    </WebSocketContext.Provider>
  );
}
