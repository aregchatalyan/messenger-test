import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import './index.css';
import App from './App';
import { WS_URL } from './config';
import { WebSocketProvider } from './context/websocket.context';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <QueryClientProvider client={ queryClient }>
    <WebSocketProvider url={ WS_URL! }>
      <App/>
    </WebSocketProvider>
  </QueryClientProvider>
);
