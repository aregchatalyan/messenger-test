import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useQuery } from 'react-query';
import { fetcher } from './utils/fetcher';
import { Form } from './components/Form';
import { Messages } from './components/Message';
import { useQuerySubscription } from './hooks/useQuerySubscription';

const App = () => {
  const { queryClient, socket } = useQuerySubscription();

  const [ newMessage, setNewMessage ] = useState('');
  const { data: messages, refetch } = useQuery('messages', () => fetcher('messages'));

  useEffect(() => {
    console.log(socket?.readyState);
  }, [ queryClient, socket ]);

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
