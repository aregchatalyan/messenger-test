import React, { FC } from 'react';
import { IMessage } from '../types';

interface MessagesProps {
  messages: IMessage[];
}

export const Messages: FC<MessagesProps> = ({ messages }) => {
  return (
    <div>
      <ul style={ { width: '80%', margin: '0 auto', padding: '10px' } }>
        { messages?.map((msg: IMessage, i) => (
          <li key={ msg.id } style={ { borderBottom: '1px solid rgba(0, 0, 0, .1)', padding: '5px' } }>
            { msg.text }
          </li>
        )) }
      </ul>
    </div>
  );
}
