import { Link } from "react-router-dom";
import "./footer.css"

function Footer() {
    return (
        <footer id="footer">
            <section className="container-fluid d-flex row p-3 m-0">
                <div className="col-sm-6">
                    <img id="logo" src="/images/XMLID_2_.svg"/>
                    <p id="descripcion-footer">Tu aliado en salud, brindando atención médica de calidad y compromiso con el bienestar de nuestros pacientes</p>
                </div>
                <div id="seccion-links" className="col-sm px-5">
                    <h5>Secciones</h5>
                    <div id="links-page">
                        <a href="">Sobre Nosotros</a>
                        <a href="">Preguntas Frecuentes</a>
                        <a href="">Recursos</a>
                        <a href="">Noticias</a>
                    </div>
                </div>
                <div  className="col-sm px-5">
                    <h5 id="title-redes">Redes Sociales</h5>
                    <div id="seccion-redes">
                        <div id="images-footer">
                            <img src="/images/Facebook.svg" alt="" />
                            <img src="/images/Instagram.svg" alt="" />
                            <img src="/images/Twitter.svg" alt="" />
                            <img src="/images/LinkedIn.svg" alt="" />
                        </div>
                        <div className="">
                            <p>@syncareHospital</p>
                            <p>@syncareHospital</p>
                            <p>@syncareHospital</p>
                            <p>Syncare Hospital</p>
                        </div>
                    </div>
                </div>
            </section>
            <hr />
            <section id="section-links"className="container-fluid d-flex row m-0">
                <Link className="link col-sm" to="/" href="#">Políticas de Privacidad </Link>
                <Link className="link col-sm" to="/" href="#">Términos de Servicios</Link>
            </section>
        </footer>
    );
}

export default Footer;