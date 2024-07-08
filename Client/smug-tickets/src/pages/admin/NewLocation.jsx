import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LocalityService from "../../services/Locality/LocalityService";
import UbicationService from "../../services/Ubication/UbicationService";
import { trainAndSuggestPrices } from "../../utils/priceSuggester";
import { MessageSuccess, NotFound } from "../../utils/Alert";
import context from "../../Context/UserContext";

export const NewLocation = () => {
  const navigate = useNavigate();
  const [descripcion, setDescripcion] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [nombreUbicacion, setNombreUbicacion] = useState("");
  const [recomendacione, setRecomendaciones] = useState([]);

  const { id, evento, ubicacion } = useParams();

  const reset = () => {
    setDescripcion("");
    setCapacidad("");
    setPrecio("");
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      let token = context.getToken();
      //console.log("ubicacion", ubicacion, token)
      const suggestions = await trainAndSuggestPrices(token, ubicacion);
      setRecomendaciones(suggestions);
    };

    const fetchNombreUbicacion = async () => {
      const ubicacionNombre = await UbicationService.getOneUbications(ubicacion);
      setNombreUbicacion(ubicacionNombre.nombre);
    }

    fetchNombreUbicacion();
    fetchSuggestions();
  }, [ubicacion]);

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

  const handleSuggestionClick = (suggestedPrice) => {
    setPrecio(suggestedPrice.toFixed(2));
  };

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
        </div>

        <div className="w-5/6 md:w-3/5 mx-auto lg:mx-10 border border-dashed border-blue lg:w-1/3  p-4 mt-6 lg:mt-6 lg:ml-4 flex flex-col items-center">
        <h2 className="font-bold text-xl mb-4 text-center">Sugerencias</h2>
          <div className="w-full">
            <hr className="border-t border-gray-300" />
            <p className="text-lg font-semibold my-3 text-center">Ubicación: {nombreUbicacion}</p>
            <hr className="border-t w-full border-gray-300" />
            <div className="flex flex-col items-center py-10">
              {recomendacione.map((precio, index) => (
                <button
                  key={index}
                  className="w-3/4 max-w-sm bg-orange p-4 m-2 rounded-lg shadow-md text-center transition-transform transform hover:scale-95 hover:bg-blue"
                  onClick={() => handleSuggestionClick(precio)}
                >
                  <p className="text-lg font-medium text-white">Precio: ${precio.toFixed(2)}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
        
      </div>
      <div className="flex justify-center py-6">
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



