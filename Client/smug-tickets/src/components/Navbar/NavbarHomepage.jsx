import React from "react";
import { RiLoginBoxLine } from "react-icons/ri";
import logo from "../../assets/smug_ticket.png";
//import SearchBox from "../SearchBox";
import { useNavigate } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";


export const Navbar = () => {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <nav className="flex flex-row items-center px-10 justify-between bg-blue w-full h-24 sm:justify-items-stretch">
      <div className="w-2/5 lg:w-1/5">
        <img src={logo} alt="logo" className="w-24" />
      </div>
      <div className="flex-grow">
        {/*<SearchBox />*/}
      </div>
      <div className="flex items-center">
        <button
          onClick={handleRegister}
          className="flex items-center text-white rounded-none text-xl bg-blue mr-4"
        >
          <AiOutlineUserAdd className="mr-2"/>
          Registrar
        </button>

        <button
          onClick={handleLogin}
          className="flex items-center text-white rounded-none text-xl bg-blue"
        >
          <RiLoginBoxLine className="mr-2" />
          Iniciar Sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;


