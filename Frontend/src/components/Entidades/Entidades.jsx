
function Entidades() {
    return (
        <section className=" p-3 m-5">
            <h4 className="row justify-content-center mb-5" 
                style={{ 
                    color: "#0B2860",
                    fontFamily: "'Poppins', 'sans-serif'",
                    fontWeight: '600',
                    fontSize: '32px',
                    lineHeight: '150%',
                }}
            >Certificaciones</h4>
            <div className="d-flex justify-content-center row gap-5">
                <img style={{ width: '202px', height: '66px' }} src="/images/cert1.png.svg" alt="" />
                <img style={{ width: '202px', height: '66px' }} src="/images/European.png.svg" alt="" />
                <img style={{ width: '202px', height: '66px' }} src="/images/Colleg.png.svg" alt="" />
                <img style={{ width: '202px', height: '66px' }} src="/images/HIMSSNuevo.png.svg" alt="" />
            </div>
        </section>
    );
}

export default Entidades;