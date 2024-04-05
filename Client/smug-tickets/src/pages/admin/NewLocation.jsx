import React, { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import LocalityService from "../../services/Locality/LocalityService";
import { MessageSuccess, NotFound } from "../../utils/Alert";
import context from "../../Context/UserContext";

export const NewLocation = () => {
  const navigate = useNavigate();
  const [descripcion, setDescripcion] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [precio, setPrecio] = useState("");

  const { id, evento} = useParams();


  const reset = () => {
    // Reiniciar los estados a sus valores iniciales
    setDescripcion("");
    setCapacidad("");
    setPrecio("");
  }

  const handleAddlocality = () => {
    handleCreateLocation();
    reset();// Reiniciar los estados a sus valores iniciales
    
  };

  const handleViewLocations = () => {
    navigate(`/admin/listlocations/${id}`);// Pasamos el id del evento
  };

  const handleCreateLocation = async (e) => {

    let token = context.getToken();

    //TODO: Validar que los campos no esten vacios
    console.log(token, id, descripcion, capacidad, precio);

    const response = await LocalityService.createLocality(
      token,
      descripcion,
      id,
      precio,
      capacidad
    );

    if (!response.hasError) {
      MessageSuccess('Localidad creada exitosamente');
      console.log("Localidad creado exitosamente");
    }else{
      NotFound('Hay campos vacíos!')
    }

    console.log(response);
  };

  return (
    <>
      <div className="flex justify-center items-center py-5 ">
        <h1 className="text-3xl text-white font-black bg-orange py-2 rounded-lg w-5/6 text-center">
          Evento: {evento}
        </h1>
      </div>
      <h1 className="text-center text-4xl font-bold">Crear Localidades</h1>

      <div className="max-w-lg mx-auto border border-dashed border-blue flex flex-col items-center p-5 mt-6">
        <label
          className="mb-2 font-bold border border-solid border-gray w-full text-center py-2"
          htmlFor="evento"
        >
          Nombre de la localidad:
        </label>
        <input
          id="evento"
          type="text"
          placeholder="Evento..."
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full p-2 border border-solid border-gray-400 rounded text-center border-blue"
        />
      </div>

      <div className="max-w-lg mx-auto border border-dashed border-blue flex flex-col items-center p-5 mt-6">
        <label
          className="mb-2 font-bold border border-solid border-gray w-full text-center py-2"
          htmlFor="evento"
        >
          Capacidad:
        </label>
        <input
          id="capacidad"
          type="number"
          placeholder="Capacidad..."
          value={capacidad}
          onChange={(e) => setCapacidad(e.target.value)}
          className="w-full p-2 border border-solid border-gray-400 rounded text-center border-blue"
        />
      </div>

      <div className="max-w-lg mx-auto border border-dashed border-blue flex flex-col items-center p-5 mt-6">
        <label
          className="mb-2 font-bold border border-solid border-gray w-full text-center py-2"
          htmlFor="evento"
        >
          Precio:
        </label>
        <input
          id="precio"
          type="number"
          placeholder="Precio..."
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="w-full p-2 border border-solid border-gray-400 rounded text-center border-blue"
        />
      </div>

      <div className="flex justify-center py-10">
        <button
          onClick={handleAddlocality}
          className="px-4 py-2 bg-orange rounded-md mr-4 text-black font-bold"
        >
           Guardar
        </button>
        <button
          onClick={handleViewLocations}
          className="px-4 py-2 bg-blue rounded-md text-white font-bold"
        >
          Ver localidades
        </button>
      </div>
    </>
  );
};

export default NewLocation;
