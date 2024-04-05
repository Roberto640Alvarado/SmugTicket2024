import React from 'react'

export const LocationButton = (props) => {
    return (
        <>
        <button className='bg-locations-gray rounded-xl w-24 md:w-24 h-auto md:p-1 lg:w-28 focus:border-black focus:border-2 '>
            <p className='sm:text-lg'>{props.descripcion}</p>
            <p className='sm:text-lg'>${props.precio}</p>
        </button>
        </>
    )
}
export default LocationButton;