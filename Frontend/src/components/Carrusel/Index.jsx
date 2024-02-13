import Carousel from 'react-bootstrap/Carousel';
import './style.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Banner1desktop  from '../../assets/banner1.png';
import Banner2desktop  from '../../assets/banner2.png';
import Banner3desktop  from '../../assets/banner3.png';
import Banner1movil from '../../assets/Banner1movil.png';
import Banner2movil from '../../assets/Banner2movil.png';
import Banner3movil from '../../assets/Banner3movil.png';

function IndividualIntervalsExample() {
    const [banner1, setBanner1] = useState(Banner1movil);
    const [banner2, setBanner2] = useState(Banner2movil);
    const [banner3, setBanner3] = useState(Banner3movil);
    useEffect(()=>{
        const ancho = window.screen.width;
        if(ancho > 576){
        setBanner1(Banner1desktop)
        setBanner2(Banner2desktop)
        setBanner3(Banner3desktop);
        }
    },[])

    return (
        <div className='contenedor'>

        <Carousel className='carrusel'>
            <Carousel.Item interval={1000}>
            <img
                className="d-block w-100 img_caruusel"
                src={banner1}
                alt="First slide"
            />
            <Carousel.Caption className='primera'>
                <h3 >Cuidamos de ti</h3>
                <p>Nuestros profesionales podrán brindarte una atención personalizada y un seguimiento a tu estado de salud.  </p>
                <Link to='/registro' className='btn btn-primary'>Registrarme</Link>
            </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1000}>
            <img
                className="d-block w-100 img_caruusel"
                src={banner2}
                alt="Second slide"
            />
            <Carousel.Caption className='primera'>
                <h3 >Nuestros mejores 
    Especialistas</h3>
                <p > Expertos en salud comprometidos con tu bienestar, brindando atención médica avanzada y de calidad.</p>
            </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100 img_caruusel"
                src={banner3}
                alt="Third slide"
            />
            <Carousel.Caption className='primera'>
                <h3>Cuidado médico para toda la familia</h3>
                <p>
                Atención integral para cada miembro de la familia, adaptada a sus necesidades y bienestar.
                </p>
                <Link to='/registro' className='btn btn-primary'>Registrarme</Link>
            </Carousel.Caption>
            </Carousel.Item>
        </Carousel>

        </div>
    );
}

export default IndividualIntervalsExample;