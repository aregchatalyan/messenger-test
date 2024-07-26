import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import { fetcher } from './utils/fetcher';
import { Form } from './components/Form';
import { Messages } from './components/Message';

const App = () => {
  const [ newMessage, setNewMessage ] = useState('');
  const { data: messages, refetch } = useQuery('messages', () => fetcher('messages'));

  const onSubmit = async () => {
    const data = await fetcher('messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
