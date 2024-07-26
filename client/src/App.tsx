import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Form } from './components/Form';
import { Messages } from './components/Message';

const App = () => {
  return (
    <div style={ { padding: '10px' } }>
      <Form/>
      <Messages/>
      <ToastContainer/>
    </div>
  );
}

export default App;
