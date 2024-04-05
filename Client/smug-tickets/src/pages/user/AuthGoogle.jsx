import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';  // Añade GoogleOAuthProvider aquí
import logo from '../../assets/smug_ticket.png'
import {jwtDecode} from 'jwt-decode'
import authService from '../../services/Auth/AuthService';
import context from '../../Context/UserContext';
import rolService from '../../services/Auth/RolService';
import { useNavigate } from 'react-router-dom';
import { AppRouter } from '../../routes/AppRouter';
import { NotFound } from '../../utils/Alert';

function AuthGoogle(props) {
  const clientID = "151373060419-hflbjm4m12o1odr0frs1v4ad7rvpael6.apps.googleusercontent.com";
  const navigate = useNavigate();
  const [client, setClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        client_id: clientID
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  const handleLogin = async(data) =>{
    
    const res = await context.login(data.email);
    if(res.status == 200){
     const token = localStorage.getItem('content');
     const object = {token: token}
     const roles = await rolService.getRol(object)
     const result = await roles.json()
   
     switch (result.roles[0].rol) {
      case "Admin":
      return navigate('/admin/Home');
        
     case "Cliente":
        return navigate('/cliente/Home');
        
      case "LectorQR":
        return navigate('/lectorQR/Home');
        
      case "Moderador":
        return navigate('/moderador');
        
      default:
        return navigate('/');
        
     }
    }else{
      console.log("Usuario no registrado");
    }
  }

  const onFailure = () => {
    console.log("SALIO MAL :C");
  };

  return (
    <GoogleOAuthProvider clientId={clientID}>  {/* Agrega GoogleOAuthProvider aquí */}
      <div className="flex justify-center bg-[#E3C4A8] items-center h-screen">
        <div className="max-w-md mx-auto bg-[#F1F1F1F1] p-8 rounded-lg shadow-2xl text-center">
          <h2 className="text-2xl font-bold">Smug Ticket</h2>
          <h3 className="text-2xl font-bold">Login</h3>
          <div>
            <img src={logo} alt="logo" className="w-64" />
          </div>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              handleLogin(jwtDecode(credentialResponse.credential));
            }}
            onFailure={onFailure}
            cookiePolicy={"single_host_policy"}
            className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition duration-300"
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default AuthGoogle;
