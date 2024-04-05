import React, { useState, useEffect } from 'react';
import NavbarAdmin from "../../components/Navbar/NavbarAdmin.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import UserService from '../../services/Users/UsersService';
import UsersService from '../../services/Users/UsersService';
import { MessageSuccess } from '../../utils/Alert';
import { MessageDisable } from '../../utils/Alert';

export const UserManagement = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Llamar a la API al cargar el componente
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await UserService.getAllUsers();
            // Actualizar el estado con los datos de la API
            setUsers(response);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
        }
    };

    const activateUser = async (userId) => {
        try {
            // Realizar la solicitud POST para activar el usuario
            const response = await UsersService.ActiveUser(userId);
            fetchUsers();
            MessageSuccess("Usuario activado!")
        } catch (error) {
            console.error('Error al activar usuario:', error);
        }
    };

    const desactivateUser = async (userId) => {
        try {
            // Realizar la solicitud POST para desactivar el usuario
            const response = await UsersService.DisableUser(userId);
            fetchUsers();
            MessageDisable("Usuario desactivado!")
        } catch (error) {
            console.error('Error al desactivar usuario:', error);
        }
    };

    return (
        <>
            <NavbarAdmin />
            <div className='flex flex-col items-center'>
                <h1 className='m-5 font-bold text-xl md:text-3xl'>Gestión de Usuarios</h1>

                <div className='m-5'></div>

                <div className='border-locations-gray border-2 rounded-2xl w-11/12 p-2 h-auto'>
                    <table className='table-fixed w-full'>
                        <thead className='border-b-2 border-b-locations-gray'>
                            <tr className='text-stone-600 text-xs md:text-lg lg:text-2xl text-center'>
                                <th className='p-4 font-bold'>Usuario</th>
                                <th className='p-4 font-bold'>Email</th>
                                <th className='p-4 font-bold'>Activo</th>
                                <th className='p-4 font-bold'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody className='text-center text-xs md:text-lg'>
                            {users.map((user) => (
                                <tr key={user.id} className='border-b-2 border-b-locations-gray'>
                                    <td className='p-4 text-black font-semibold'>{user.nombre}</td>
                                    <td className='p-4 text-black font-semibold' style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</td>
                                    <td className='p-4'>
                                        <input type='checkbox' disabled checked={user.active} />
                                    </td>
                                    <td className='p-4 flex flex-col items-center lg:flex-row lg:items-center'>
                                        <button
                                            onClick={() => activateUser(user.id)}
                                            className='mb-2 lg:mb-0 lg:mr-2 hover:bg-black hover:text-white text-black border-2 font-bold py-2 px-4 rounded'
                                        >
                                            Activar
                                        </button>
                                        <button
                                            onClick={() => desactivateUser(user.id)}
                                            className='bg-black hover:bg-slate-800 text-white font-bold py-2 px-2 rounded'
                                        >
                                            Desactivar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UserManagement;