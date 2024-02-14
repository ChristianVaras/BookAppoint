import Carrusel from "../../components/Carrusel/Index";
import QuienesSomos from "../../components/QuienesSomos/Index";
//import ListaServicios from "../../components/Servicios/Servicios";
import EspecialidadesItems from "../../components/Especialidades/EspecialidadesItems";
import ContactUs from "../../components/ContactUs/ContactUs";
import Entidades from "../../components/Entidades/Entidades";
import Footer from "../../components/Footer/Footer";
import ListaNoticias from "../../components/Noticias/ListaNoticias";
import './styleLanding.css'
import Servicios from "../../components/Servicios/Servicios";

function LandingPage() {
  return (
    <>
      <Carrusel />
      <div className="desktop-responsive">
        <QuienesSomos />
      </div>
        <Servicios />
        <EspecialidadesItems />
        <ListaNoticias />
        <ContactUs />
        <Entidades />
        <Footer />
    </>
  );
}
export default LandingPage;
