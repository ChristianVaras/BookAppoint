/* eslint-disable react/prop-types */
const Servicio = ({servicio})=>{
    return <section className="col-12 col-md-4 w-100">
        <div className="d-flex flex-column text-center align-items-center px-2 py-3 gap-2">
            <img src={servicio.img} className="w-25 img-fluid" alt={servicio.titulo} />
            <h3>{servicio.titulo}</h3>
            <p>{servicio.descripcion}</p>
        </div>
</section>

}
export default Servicio;