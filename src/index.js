import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import {Spinner} from './components/Spinner';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
      <App/>
      <Spinner/>
    </>
);
