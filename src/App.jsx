import './App.css'
import { Route } from './routes/Router'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <>
      <AuthProvider>
        <Route />
      </AuthProvider>
    </>
  )
}

export default App
