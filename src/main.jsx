import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import './index.css'
import { TasksProvider } from './assets/components/TasksContext'
import { TaskStatsProvider } from './assets/components/TaskStatsContext.jsx'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>    
    <TaskStatsProvider>
        <TasksProvider>            
            <App />
        </TasksProvider>
    </TaskStatsProvider>
  </StrictMode>,
)