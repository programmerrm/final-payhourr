import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Router } from './routes/Router'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import './index.css'
import './App.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={Router} />
    </Provider>
  </StrictMode>,
)
