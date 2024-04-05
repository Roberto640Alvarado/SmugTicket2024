import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { faChartColumn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const CardGraph = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

    const handleGraphEvent = () => {
    navigate(`/admin/graphEvent/${props.id}`);

    }

  return (
    <>
      <div onClick={handleGraphEvent} className="bg-white shadow-lg rounded-lg overflow-hidden w-full md:w-2/3 lg:w-1/2">
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isHovered && (
            <div className="absolute inset-0 bg-blue-800 bg-opacity-70 flex items-center justify-center backdrop-filter backdrop-blur-lg hover:cursor-pointer">
                <FontAwesomeIcon icon={faChartColumn} className="w-20 h-20" />
            </div>
          )}
          <img
            className="w-full h-48 object-cover object-center rounded-t-lg"
            src={props.imagen}
            alt="Artista"
          />
        </div>
        <div className="bg-blue h-10">
          <h2 className="text-white font-bold text-2xl text-center">{props.descripcion}</h2>
        </div>
      </div>
    </>
  );
};

export default CardGraph;