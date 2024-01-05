import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import { MantineProvider } from '@mantine/core'
import { StudentProvider } from './contexts/StudentContext.jsx'
import { Notifications } from '@mantine/notifications'
import './global.css'
import '@mantine/notifications/styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider>
      <StudentProvider>
        <App />
        <Notifications />
      </StudentProvider>
    </MantineProvider>
  </React.StrictMode>
)