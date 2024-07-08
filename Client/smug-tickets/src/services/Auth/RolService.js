import axios from 'axios';

const BASE_API = 'https://smugticket2024.onrender.com'


const API = axios.create({
  baseURL: BASE_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

const rolService = {
    //Obtener el rol del usuario por medio del ID
  getRoles: async (userid, token) => {
    try {
      const response = await API.get(`/userRol/getRolesById?userid=${userid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.status === 200) {
        console.log(response.data);
        const { roles } = response.data;
        const roleNames = roles.map((role) => role.rol);
        return roleNames;
      } else {
        throw new Error(response.status);
      }
    } catch (error) {
      console.error(error);
      return {
        hasError: true,
      };
    }
  },
  getRol: async (data) => {
    try {
      const response = await fetch(`${BASE_API}/userRol/getRoles`,{
        "method": "GET",
        headers: {
            "Authorization": `Bearer ${data.token}`,
            "Content-Type": "application/json",
          },
         
    })
    const respuesta = await response;
   
    return respuesta
    } catch (error) {
      console.error(error);
      return {
        hasError: true,
      };
    }
  }
};


export default rolService;
