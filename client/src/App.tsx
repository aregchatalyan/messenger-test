import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useQuery, useQueryClient } from 'react-query';
import { WS_URL } from './config';
import { IMessage } from './types';
import { fetcher } from './utils/fetcher';
import { Form } from './components/Form';
import { Messages } from './components/Message';

const App = () => {
  const queryClient = useQueryClient();
  const { data: messages, refetch } = useQuery('messages', () => fetcher('messages'));

  const [ newMessage, setNewMessage ] = useState('');

  useEffect(() => {
    const socket = new WebSocket(WS_URL!);

    socket.onmessage = (event) => {
      const { type, message } = JSON.parse(event.data);

      if (type === 'new_message') {
        queryClient.setQueryData<IMessage[]>('messages', (prev) => {
          return [ ...(prev || []), message ]
        });
      }
    }

    return () => socket.close();
  }, [ queryClient ]);

  const onSubmit = async () => {
    const data = await fetcher('messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: newMessage })
    });

    toast.error(data.message, { position: 'bottom-right' });

    setNewMessage('');

    await refetch();
  }

  return (
    <div style={ { padding: '10px' } }>
      <Form onSubmit={ onSubmit } newMessage={ newMessage } setNewMessage={ setNewMessage }/>
      <Messages messages={ messages }/>

      <ToastContainer/>
    </div>
  );
}

export default App;
