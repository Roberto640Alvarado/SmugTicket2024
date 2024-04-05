import React from 'react'

export const CardTicket = (props) => {
    return (
        <>
            <div className="bg-white shadow-lg rounded-t-3xl overflow-hidden w-full sm:w-64 ">
                <img className="w-full h-44 sm:h-80" src={props.image1} alt="Artista" />
                <div className="bg-blue h-10">
                    <h2 className="text-white font-bold text-2xl text-center">{props.title}</h2>
                </div>
            </div>
        </>
    )
}
export default CardTicket;