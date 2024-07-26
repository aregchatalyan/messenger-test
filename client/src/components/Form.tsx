import React, { ChangeEvent, FC, useState } from 'react';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from 'react-query';
import { createMessage } from '../api/messages';

export const Form: FC = () => {
  const [ newMessage, setNewMessage ] = useState('');

  const queryClient = useQueryClient();
  const mutation = useMutation('messages', createMessage, {
    onSuccess: () => queryClient.invalidateQueries('messages'),
    onError: (e) => {
      if (isAxiosError(e)) toast.error(e.response?.data.message);
    }
  });

  const onFormChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  }

  const onSubmit = async () => {
    mutation.mutate(newMessage);
    setNewMessage('');
  }

  return (
    <div>
      <div style={ { width: 'fit-content', margin: '0 auto' } }>
        <input type="text" value={ newMessage } onChange={ onFormChange }/>

        <button onClick={ onSubmit }>Send</button>
      </div>
    </div>
  );
}
