

const inputText = (props) =>{


function actualizarCambios(e){
    // console.log(e.target.value)
    props.actualizar(e.target.value)
}

    return <>
        <label htmlFor="" className="align-self-start">
        {props.titulo}
        </label>
        <input
        type="text"
        className="bg-light border border-none text-dark p-2 mb-3"
        placeholder={props.placeholder}
        required={props.required}
        value={props.valor}
        onChange={actualizarCambios}
        />
    </>
}

export default inputText;