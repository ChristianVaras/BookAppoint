import { useState } from "react";
import Noticia from "./Noticia";
import './noticia.css';
import  Noti1  from '../../assets/imgnoticia1.png';
import  Noti2  from '../../assets/imgnoticias2.png';
import  Noti3  from '../../assets/imanoticias3.png';


function ListaNoticias() {
    const noticiasDefault = [
        {
            hrefLink: Noti1,
            speciality: 'Oncología',
            titulo: 'Descubrimos un nuevo enfoque en la lucha contra el cáncer',
            descripcion: 'Nuestro tratamiento innovador ofrece resultados prometedores, brindando esperanza y mejor calidad de vida a nuestros pacientes.'
        },
        {
            hrefLink: Noti2,
            speciality: 'Cardiología',
            titulo: 'Nuevo programa de prevención de enfermedades cardiovasculares',
            descripcion: 'identificamos y reducimos factores de riesgo a través de exámenes médicos regulares y asesoramiento personalizado, garantizando la salud cardiovascular de nuestra comunidad.'
        },
        {
            hrefLink: Noti3,
            speciality: 'Salud Mental',
            titulo: 'Celebramos la Semana del Bienestar Mental',
            descripcion: 'A través de charlas educativas, talleres de manejo del estrés y sesiones de terapia grupal, promovemos la conciencia y el apoyo emocional para mejorar la salud mental en nuestra comunidad.'
        }
    ];

    const [noticias, setNoticias] = useState(noticiasDefault);

    const handleClick = (e) => {
        e.preventDefault();
        setNoticias();
    }

    return (
        <section id="notice-section" className="container-fluid p-3">
            <h2>Ultimas Noticias</h2>
            <h5 className="col-12 mb-3">Mantente al tanto de las últimas novedades y avances en el mundo de la medicina y la salud en nuestro hospital.</h5>
            <div className="row gap-5">
                {noticias.map((noticia, index) => {
                    return (
                        <Noticia
                            key={index}
                            noticia={noticia}
                        ></Noticia>
                    )
                }
                )}
            </div>
            <div className="row justify-content-center mt-3 mb-2">
                <button id="btn" type="button" onClick={handleClick}  className="btn btn-outline-secondary mt-3 col-4">Ver más noticias</button>
            </div>
        </section>
    )
}

export default ListaNoticias;