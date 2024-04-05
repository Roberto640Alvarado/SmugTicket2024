import logo from '../../assets/smug_ticket.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';



export const Footer = () => {

    return (
        <>
            <div className='flex flex-col'>
                <section className='bg-orange p-3 md:p-4 lg:p-6 flex flex-col'>
                    <div>
                        <h3 className='font-bold text-center text-base md:text-4xl lg:text-xl mb-2'>Redes sociales</h3>
                    </div>
                    <div className='flex justify-center space-x-6'>
                        <a href="https://www.facebook.com/"><FontAwesomeIcon icon={faFacebook} className='w-8 h-8' /></a>
                        <a href="https://www.instagram.com/"><FontAwesomeIcon icon={faInstagram} className='w-8 h-8' /></a>
                        <a href="https://www.youtube.com/"><FontAwesomeIcon icon={faYoutube} className='w-8 h-8' /></a>
                        <a href="https://www.twitter.com/"><FontAwesomeIcon icon={faTwitter} className='w-8 h-8' /></a>
                    </div>
                    <div className='flex justify-center'>
                        <img src={logo} alt="logo" className='h-20 w-25 ml-10' />
                    </div>
                </section>
                <section className='bg-blue p-2 md:p-1 lg:p-2 flex justify-center'>
                    <FontAwesomeIcon icon={faCopyright} className='mr-2 w-8 h-8 text-white' />
                    <p className='text-white text-base md:text-4xl lg:text-lg text-center'>2023 All rights reserved</p>
                </section>

            </div>
        </>
    );
};

export default Footer;