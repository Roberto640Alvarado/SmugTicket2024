import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import context from '../../Context/UserContext';

export const CardViewAdmin = (props) => {
    const navigate = useNavigate();

    const handleViewEvent = () => {
        navigate(`/admin/viewEvent/${props.id}`);
    }

    return (
        <>
            <div onClick={handleViewEvent} className="bg-white m-auto md:m-0 shadow-lg rounded-t-3xl overflow-hidden w-9/12 md:w-2/3 lg:w-2/3 hover:cursor-pointer" >
                <img className="w-full h-64 object-cover object-center rounded-t-lg" src={props.imagen} alt="Artista" />
                <div className=" bg-blue h-10">
                    <h2 className="text-white font-bold text-2xl text-center">{props.descripcion}</h2>
                </div>
            </div>


        </>
    );
};

export default CardViewAdmin;