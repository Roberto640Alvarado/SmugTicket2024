import { useState } from 'react'
import './App.css'
import { AppRouter } from './routes/AppRouter.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from './pages/user/Home.jsx'
import ViewQR from './pages/user/ViewQR.jsx'

//import AuthGoogle from './pages/user/AuthGoogle.jsx'
import GoogleRegister from './pages/user/GoogleRegister.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import AuthGoogle from './pages/user/AuthGoogle.jsx'

/**
 * Componente principal de la aplicación.
 * @returns {JSX.Element} Elemento JSX que contiene el componente Home y el Footer.
 */
function App() {
  return (
    <>
    <GoogleOAuthProvider clientId="151373060419-hflbjm4m12o1odr0frs1v4ad7rvpael6.apps.googleusercontent.com">
     {/*<GoogleOAuthProvider clientId="151373060419-hflbjm4m12o1odr0frs1v4ad7rvpael6.apps.googleusercontent.com">*/}
     {/*<GoogleRegister />*/}
      {/*/}
      {/*<AuthGoogle />*/}
      {/*<Home />*/}
      {/*<Footer />*/}
      {/*</GoogleOAuthProvider>*/}
      <AppRouter/>
      </GoogleOAuthProvider>
    </>
  )
}

export default App
