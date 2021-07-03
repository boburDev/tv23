import React from 'react'
import ReactDOM from 'react-dom'
import App from './pages/app/app'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/theme'
import { ApiProvider } from './context/api'
import { LangProvider } from './context/lanuage'
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ApiProvider>
          <LangProvider>
            <App />
          </LangProvider>
        </ApiProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)