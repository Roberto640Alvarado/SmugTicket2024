import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import context from "../Context/UserContext";
import rolService from "../services/Auth/RolService";
import authService from "../services/Auth/AuthService";

export const ProtectedCliente = ({component: Component}) => {
  const history = useNavigate();
  const [rol, setRoles] = useState([])
  
  useEffect(() => {
      const token = localStorage.getItem('content')
      if(!token){
          history('/')
      }else{
         get_roles()
      }
     async function get_roles(){
      if(token !== null){
      const object = {token: token}
      const roles = await rolService.getRol(object)
      const result = await roles.json()
      console.log(result)
      let verificacion = false
      setRoles(result.roles)
      result.roles.forEach(element => {
          if(element.rol === 'Cliente'){
            verificacion = true
          }
      });
      if(!verificacion){
          history('/')
      }
     }else{
      console.log('no hay token')
      history('/')
     } 
  }
  }, [])
  return <Component></Component>
}