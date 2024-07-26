import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { IMessage } from '../types';
import { fetchMessages } from '../api/messages';

export const Messages: FC = () => {
  const query = useQuery('messages', fetchMessages);

  return (
    <div>
      <ul style={ { width: '80%', margin: '0 auto', padding: '10px' } }>
        { query.data?.map((msg: IMessage) => (
          <li key={ msg.id } style={ { borderBottom: '1px solid rgba(0, 0, 0, .1)', padding: '5px' } }>
            { msg.text }
          </li>
        )) }
      </ul>
    </div>
  );
}
