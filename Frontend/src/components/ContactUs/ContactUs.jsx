import mapa from '../../assets/mapacontacto.png';
import "./contactUs.css"
function ContactUs() {
    return ( 
        <section id="contact-section" className="container-fluid row m-0">
            <div className="p-2 col-sm-4">
                <h2 className="my-2">Contáctanos</h2>
                <h5 className="p-3">Estamos para brindarte toda la información y atención que necesites.</h5> 
                <div id="container-contact">
                    <div id="images-container">
                        <img src="/images/mail-icon.PNG" alt="" />
                        <img src="/images/phone-icon.PNG" alt="" />
                        <img src="/images/map-icon.PNG" alt="" />
                    </div>
                    <div id="info-contact-container">
                        <p>hello@relume.io</p>
                        <p>+1 (555) 000-0000</p>
                        <p>123 Sample St, Sydney NSW 2000 AU</p>
                    </div>
                </div>
            </div>
            <div className="col-12 col-lg-8">
                <img id="mapa" src={mapa} alt="mapa" className='img-fluid'/>
            </div>
        </section>
    );
}

export default ContactUs;