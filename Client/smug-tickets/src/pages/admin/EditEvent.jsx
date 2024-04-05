import React, { useState, useEffect } from 'react';
import NavbarAdmin from "../../components/Navbar/NavbarAdmin.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { useNavigate,useParams } from 'react-router-dom';
import EventService from '../../services/Event/EventService';
import CategoryService from '../../services/Category/CategoryService';
import context from '../../Context/UserContext';
import { MessageSuccess, NotFound } from '../../utils/Alert.jsx';

const EditEvent = () => {
  const navigate = useNavigate();
  const [imagenUrl, setImagenUrl] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [lugar, setLugar] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [duracion, setDuracion] = useState('');
  const [imagenUrl1, setImagenUrl1] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const { id } = useParams();//Recibimos el id del evento a editar

  const formatearFecha = (fecha) => {
    const fechaFormateada = new Date(fecha).toISOString().split('T')[0];
    return fechaFormateada;
  };

  const fetchEvent = async () => {
    try {
      const response = await EventService.getEventById(id);
      console.log('response', response);

      if (response) {
        setDescripcion(response.descripcion);
        setLugar(response.lugar);
        setFecha(formatearFecha(response.fecha_evento));
        setHora(response.hora);
        setDuracion(response.duracion);
        setImagenUrl1(response.imagen);
        setSelectedCategoryId(response.id_categoria.idCategoria);
      }
    } catch (error) {
      console.error('Error al obtener el evento:', error);
    }
  };


  useEffect(() => {
    const fetchCategories = async () => {
      const token = context.getToken();
      try {
        const response = await CategoryService.getAll(token);
        if (Array.isArray(response)) {
          setCategories(response);
        }
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCategories();
    fetchEvent();
  }, []);

  const handleEditEvent = async () => {
    const token = context.getToken();

    const response = await EventService.editEvent(
      token,
      id,
      descripcion,
      lugar,
      hora,
      duracion,
      fecha,
      selectedCategoryId,
      imagenUrl1
    );
    if (!response.hasError) {
      console.log('Evento actualizado exitosamente');
      MessageSuccess('Evento actualizado exitosamente')
      //navigate('/admin/upcoming');
    }else{
        NotFound('Hay cambios vacíos')
    }

    
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    setImagenUrl(imagenUrl1);
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImagenUrl1(url);
    setImagenUrl(url);
  };

  const handleCancel = () => {
    navigate('/admin/upcoming');
  };

    return (
        <>
            <NavbarAdmin />
            <section className='bg-white dark:bg-gray-900'>
                <div className='container px-6 py-10 mx-auto'>
                    <h1 className='text-base md:text-2xl font-bold text-black capitalize lg:text-4xl dark:text-white text-center'>
                        Crear Evento
                    </h1>

                    <div className='mt-3 lg:mt-8 flex flex-col items-center lg:flex lg:flex-row lg:items-start'>
                        {imagenUrl ? (
                            <img
                                src={imagenUrl}
                                alt='Preview'
                                className='w-2/3 lg:mx-6 xl:w-1/3 h-5/6 lg:h-1/2 lg:w-1/2 xl:h-full rounded-xl object-cover'
                            />
                        ) : (
                            <form onSubmit={handleUrlSubmit} className="flex justify-center items-center">
                                <label
                                    className='cursor-pointer flex flex-col p-10 lg:p-24 lg:mt-24 xl:mt-24 items-center rounded-xl border-2 border-dashed border-blue-400 bg-white xl:p-32 text-center'
                                >
                                    <div className='text-center'> {/* Movida la clase "text-center" al contenedor del input */}
                                        <input
                                            id='image-url'
                                            type='text'
                                            className='h-20 w-80 lg:w-96 p-4 text-2xl font-bold bg-gray-100 rounded-xl'
                                            placeholder='Pega la URL de la imagen aquí'
                                            value={imagenUrl1}
                                            onChange={handleImageUrlChange}
                                        />
                                    </div>

                                    <button type='submit' className='mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg'>
                                        Mostrar imagen
                                    </button>
                                </label>
                            </form>
                        )}

                        <div className='mt-6 lg:w-1/2 lg:mt-0 lg:mx-6'>
                            <div className='mb-6 pl-2 lg:pl-0'>
                                <label className='text-base block lg:ml-0 mb-2 font-extrabold lg:text-lg' for="">Titulo del evento</label>
                                <input className='inline-block w-80 lg:w-5/6 p-2 leading-6 text-lg font-normal bg-white shadow border-2 border-gray rounded' type="text"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)} />
                            </div>
                            <div className='mb-6 pl-2 lg:p-0'>
                                <label className='block text-base mb-2 font-extrabold lg:text-lg' for="">Lugar</label>
                                <input className='inline-block lg:ml-0 w-80 lg:w-5/6 p-2 leading-6 text-lg font-normal bg-white shadow border-2 border-gray rounded' type="text"
                                    value={lugar}
                                    onChange={(e) => setLugar(e.target.value)} />
                            </div>
                            <div className='-mx-3 flex lg:flex-nowrap lg:flex-row flex-col' >
                                <div className='w-full px-3 sm:w-auto'>
                                    <div className='mb-5 pl-2 lg:pl-0'>
                                        <label
                                            for="date" pt-20 pr-20 bg-blue
                                            className='mb-3 block text-base font-extrabold text-black'>Fecha</label>
                                        <input
                                            type="date"
                                            name="date"
                                            id="date"
                                            value={fecha}
                                            onChange={(e) => setFecha(e.target.value)}
                                            className='lg:w-xl rounded-md border-gray bg-white shadow border-2 py-2 px-2 lg:py-3 lg:px-6 text-base font-normal 
                                        text-black outline-none focus:border-black focus:shadow-md' />
                                    </div>
                                </div>
                                <div className='w-full px-3 sm:w-auto'>
                                    <div className='mb-5 pl-2 lg:pl-0'>
                                        <label for="time" className=" mb-3 block text-base font-extrabold text-black">Hora</label>
                                        <input
                                            type="time"
                                            name="time"
                                            id="time"
                                            value={hora}
                                            onChange={(e) => setHora(e.target.value)}
                                            className='lg:w-xl rounded-md shadow border-2 border-gray bg-white py-2 px-2 lg:py-3 lg:px-6 text-base font-medium 
                                        text-black outline-none focus:border-black focus:shadow-md' />

                                    </div>
                                </div>
                                <div className='lg:w-full lg:px-3 sm:w-1/2'>
                                    <div className='mb-5 pl-5 lg:pl-0'>
                                        <label for="time" className=" mb-3 block text-base font-extrabold text-black">Duracion(hr)</label>
                                        <input
                                            type="text"
                                            name="number"
                                            id="number"
                                            value={duracion}
                                            onChange={(e) => setDuracion(e.target.value)}
                                            className='lg:w-1/3 rounded-md shadow border-2 border-gray bg-white p-2 lg:py-3 lg:px-6 text-base font-medium 
                                        text-black outline-none focus:border-black focus:shadow-md' />
                                    </div>
                                </div>
                            </div>
                            <div className='mb-6 pl-2 lg:pl-0'>
                                <label className='block mb-2 font-extrabold text-normal lg:text-lg' for="">Categoria</label>
                                <div className='relative flex bg-gray-100'>
                                    <button className=' relative text-lg px-3 py-3 leading-6 font-normal  flex justify-center items-center  bg-white focus:outline-none shadow border-2 border-gray focus:border-black text-black rounded group'>
                                        <form action="#">
                                            <select className='text-sm text-center'
                                            
                                                value={selectedCategoryId}
                                                onChange={(e) => setSelectedCategoryId(e.target.value)}>
                                                    <option value="">Selecciona una categoría</option>
                                                {categories.map((category) => (
                                                    <option key={category.idCategoria} value={category.idCategoria}>{category.descripcion}
                                                    </option>
                                                ))}
                                            </select>
                                        </form>
                                    </button>
                                </div>
                            </div>
                            <div className='flex flex-row items-start  lg:mx-0 gap-5 lg:flex-col '>
                                <button  type="submit" onClick={handleEditEvent}  className='lg:ml-0 lg:hidden py-4 px-4  lg:px-5 lg:py-3 bg-orange rounded-2xl
                            font-extrabold text-white capitalize
                            focus:outline-none hover:shadow-none'>
                                    <p className='text-xs lg:text-base  lg:w-24' >Guardar Cambios</p>
                                </button>

                                <button  type="submit" onClick={handleCancel}  className='lg:ml-0 py-4 px-4 lg:hidden lg:px-5 lg:py-3 bg-blue rounded-2xl
                            font-extrabold text-white capitalize
                            focus:outline-none hover:shadow-none'>
                                    <p className='text-xs lg:text-base  lg:w-24' >Cancelar</p>
                                </button>
                            </div>
                            <div className='lg:flex hidden lg:flex-row justify-center  gap-2 lg:gap-5 lg:pt-3 lg:mr-52 '>
                                <button onClick={handleEditEvent} type="submit" className='ml-14 px-3 lg:px-5 mt-5 lg:py-3 lg:w-32 bg-orange rounded-2xl
                    font-extrabold text-black capitalize
                    focus:outline-none hover:shadow-none'>
                                    <p className='lg:w-auto text-xs lg:text-base'>Guardar Cambios</p>
                                </button>
                                <button  type="submit" onClick={handleCancel} className='py-3 px-5 lg:px-5 mt-5 lg:py-3 lg:w-32 bg-blue rounded-2xl
                    font-extrabold text-white capitalize
                    focus:outline-none hover:shadow-none'>
                                    <p className='text-xs lg:text-base'>Cancelar</p>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>

    )
}

export default EditEvent;