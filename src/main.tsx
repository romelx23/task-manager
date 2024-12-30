import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from './components/ui/provider.tsx'
import './index.css'
import App from './App.tsx'
import { TaskProvider } from './context/taskContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider
    >
      <TaskProvider>
        <App />
      </TaskProvider>
    </Provider>
  </StrictMode>,
)
