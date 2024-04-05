import React from 'react';
import Swal from 'sweetalert2';

export const Alert = ({ message, messageConfirmed }) => {

    Swal.fire({
        title: '¿Estás seguro?',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Se ha realizado correctamente',
                messageConfirmed,
                'success'
            )
        }
    })
}

export const MessageSuccess = (message) => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500
    })
}
export const MessageDisable = (message) => {
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: message,
        showConfirmButton: false,
        timer: 1500
    })
}

export const LoadMessage=()=>{
    let timerInterval
    Swal.fire({
    title: 'Cargando...',
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
        }, 100)
    },
    willClose: () => {
        clearInterval(timerInterval)
    }
    }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
    }
})
}
export const NotFound = (message) =>{  
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
    })
}