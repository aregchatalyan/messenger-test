import React, { Dispatch, FC, MouseEventHandler, SetStateAction } from 'react';

interface FormProps {
  onSubmit: MouseEventHandler<HTMLButtonElement>;
  newMessage: string;
  setNewMessage: Dispatch<SetStateAction<string>>;
}

export const Form: FC<FormProps> = ({ onSubmit, newMessage, setNewMessage }) => {
  return (
    <div>
      <div style={ { width: 'fit-content', margin: '0 auto' } }>
        <input type="text" value={ newMessage } onChange={ (e) => setNewMessage(e.target.value) }/>

        <button onClick={ onSubmit }>
          Send
        </button>
      </div>
    </div>
  );
}
