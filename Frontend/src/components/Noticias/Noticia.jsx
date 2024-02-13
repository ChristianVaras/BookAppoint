import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

function Noticia({ noticia }) {
    return (
        <div className="card col-lg p-2">
            <div className="card-body"  style={{color: '#0B2860'}} >
                <img className="card-img-top" style={{height: '380px'}} src={noticia.hrefLink} alt={noticia.titulo} />
                <p id="notice-speciality">{noticia.speciality}</p>
                <h5 id="notice-title" className="card-title">{noticia.titulo}</h5>
                <p id="notice-description" className="card-text">{noticia.descripcion}</p>
                <Link id="link" to=""href="#">Leer más &gt;</Link>
            </div>
        </div>
    )
}

Noticia.propTypes = {
    noticia: PropTypes.object.isRequired
};

export default Noticia;