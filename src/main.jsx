import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { TasksProvider } from './assets/components/TasksContext'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TasksProvider>
        <App />        
    </TasksProvider>
  </StrictMode>,
)
