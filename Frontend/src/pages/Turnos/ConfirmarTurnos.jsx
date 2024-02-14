import React from 'react';
import { Link } from "react-router-dom";

function ConfirmarTurnos() {
    return (
        <section className='container p-3'>
            <h3>3. Confirmar turno</h3>
            <p>Forem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title bg-body-secondary text-center">Nombre del paciente</h5>
                    <div className="d-flex row">
                        <div className="col">
                            <p className="card-text">Especialidad</p>
                            <p className="card-text">Profesional</p>
                            <p className="card-text">Fecha</p>
                            <p className="card-text">Lugar</p>
                        </div>
                        <div className="col">
                            <p className="card-text">info especialidad</p>
                            <p className="card-text">info profesional</p>
                            <p className="card-text">info fecha</p>
                            <p className="card-text">info lugar</p>
                        </div>
                    </div>
                </div>
            </div>
            <p>Texto sobre cancelaciones y demás</p>
            <div className='container d-flex flex-column'>
                <button className="btn btn-primary my-2 mb-3">Confirmar turno</button>
                <Link to="/login" className="btn btn-outline-primary" href="#">
                    Cancelar
                </Link>
            </div>
        </section>
    );
}

export default ConfirmarTurnos;
