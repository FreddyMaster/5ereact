import React from 'react';
import ReactDOM from 'react-dom/client';
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import { MantineProvider } from '@mantine/core';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <MantineProvider theme={{ colorScheme: 'dark' }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MantineProvider>
);
