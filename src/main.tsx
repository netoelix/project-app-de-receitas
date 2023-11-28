import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import StoreProvider from './Context/StoreProvider';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <StoreProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreProvider>,
  );
