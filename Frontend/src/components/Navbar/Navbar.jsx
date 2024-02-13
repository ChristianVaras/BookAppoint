import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import "./Navbar.css";


function NavBar() {
    return (
        <Navbar className='navbar d-flex align-items-start' expand="lg"  >
        <Container className='container d-flex align-items-start'>
            <NavLink to="/login" className="m-0" href="#">
            <button className="boton-ingresar ">Ingresar</button>
            </NavLink>
            <div className='logo-menu'>
            <NavLink to="/"  href="#home"  ><img src="/images/XMLID_1_.png" alt="" className="logo"/></NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className='border-0'/>
            <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className='nav'>
                <NavLink to="/" href="#home" className='m-2 text-white text-decoration-none' >¿Quienes Somos?</NavLink>
                <NavLink  href="#link" className='m-2 text-white text-decoration-none'>Servicios</NavLink>
                <NavLink href="#link" className='m-2 text-white text-decoration-none' >Especialidades</NavLink>
                <NavLink href="#link" className='m-2 text-white text-decoration-none' >Noticias</NavLink>
                </Nav>
            </Navbar.Collapse>
            </div>
        </Container>
        </Navbar>
    );
}

export default NavBar;