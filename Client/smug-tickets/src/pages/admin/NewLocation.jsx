import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LocalityService from "../../services/Locality/LocalityService";
import { MessageSuccess, NotFound } from "../../utils/Alert";
import context from "../../Context/UserContext";

export const NewLocation = () => {
  const navigate = useNavigate();
  const [descripcion, setDescripcion] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [precio, setPrecio] = useState("");

  const { id, evento } = useParams();

  const reset = () => {
    setDescripcion("");
    setCapacidad("");
    setPrecio("");
  };

  const handleAddlocality = () => {
    handleCreateLocation();
    reset();
  };

  const handleViewLocations = () => {
    navigate(`/admin/listlocations/${id}`);
  };

  const handleCreateLocation = async (e) => {
    let token = context.getToken();

    const response = await LocalityService.createLocality(
      token,
      descripcion,
      id,
      precio,
      capacidad
    );

    if (!response.hasError) {
      MessageSuccess('Localidad creada exitosamente');
      console.log("Localidad creada exitosamente");
    } else {
      NotFound('Hay campos vacíos!');
    }

    console.log(response);
  };

  const recomendaciones = [
    { ubicacion: "Estadio Las Palmas", precios: ["$50", "$75", "$100"] },
  ];

  return (
    <>
      <div className="flex justify-center items-center py-5 ">
        <h1 className="text-3xl text-white font-black bg-orange py-2 rounded-lg w-5/6 text-center">
          Evento: {evento}
        </h1>
      </div>
      <h1 className="text-center text-4xl font-bold">Crear Localidades</h1>

      <div className="flex flex-col lg:flex-row max-w-6xl mx-auto">
        <div className="w-full lg:w-2/3">
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
        </div>

        <div className="w-full lg:w-1/3 border-2 rounded-2xl p-4 mt-6 lg:mt-6 lg:ml-4 flex flex-col items-center">
          <h2 className="font-bold text-2xl mb-4 text-center">Sugerencias</h2>
          {recomendaciones.map((rec, index) => (
            <div key={index} className="w-full">
              <p className="text-xl font-semibold text-center mb-4">Ubicación: {rec.ubicacion}</p>
              <div className="flex flex-col items-center">
                {rec.precios.map((precio, idx) => (
                  <div
                    key={idx}
                    className="w-full max-w-sm bg-orange p-4 mb-4 rounded-lg shadow-md text-center transition-transform transform hover:scale-95 hover:bg-blue"
                  >
                    <p className="text-lg font-medium text-white">Precio: {precio}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewLocation;



