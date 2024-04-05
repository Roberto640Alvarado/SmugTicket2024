import React, { useState } from 'react'
import logo from '../../assets/smug_ticket.png'
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode'
import authService from '../../services/Auth/AuthService'; 
import { MessageSuccess } from '../../utils/Alert';
import { useNavigate } from 'react-router-dom';


function GoogleRegister() {
  const [showRegister, setShowRegister] = useState(false)
  const [credenciales, setCredenciales] = useState({})
  const navigate = useNavigate();


  async function handleRegister(register){
    console.log(register)
    const object = {
      username : register.email,
      email : register.email,
      password : register.sub,
      nombre : register.name,
    }
    const res = await authService.register(object)
    if(res == 200){ 
      //console.log("Usuario registrado")
      MessageSuccess("Usuario registrado!")
      navigate('/')

    }else{
      console.log("Error al registrar usuario")
    }
  
  }

  return (
    <>
    <div className="flex justify-center bg-[#E3C4A8] items-center h-screen">
        <div className="max-w-md mx-auto bg-[#F1F1F1F1] p-8 rounded-lg shadow-2xl text-center">
          <h2 className="text-2xl font-bold">Smug Ticket</h2>
          <h2 className="text-xl font-bold">Sign Up</h2>
          <div>
            <img src={logo} alt="logo" className="w-64" />
          </div>
          <div className=" rounded-lg ">
          <GoogleLogin 
                        onSuccess={(credentialResponse) => {
                          handleRegister(jwtDecode(credentialResponse.credential));
                        }}
                        type={'standard'}
                        text={'continue_with'}
                        width={'300'}
                        size={'large'}
                        useOneTap={false}
                        auto_select={false}
                        onError={() => {
                          console.log('Login Failed');
                        }}
                        
            />
          </div>
        </div>
      </div>
      </>
  )
}

export default GoogleRegister