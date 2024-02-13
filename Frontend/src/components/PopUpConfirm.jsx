import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import Styles from "./PopUpConfirm.module.css;"

function PopUpConfirm(props) {
    return (
        <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
            {/* <Modal.Title id="contained-modal-title-vcenter"> */}
            <h5 className="fw-bold"> Solicitud recibida con éxito.</h5>
            {/* </Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
            <p>Te acabamos de enviar un enlace a tu correo electrónico.</p>
        </Modal.Body>
        <Modal.Footer>
            <Button className="text-bg-dark p-1" onClick={props.onHide}>
            Ir al inicio
            </Button>
            <Button
            className="border text-dark bg-light p-1"
            onClick={props.onHide}
            >
            Reenviar correo
            </Button>
        </Modal.Footer>
        </Modal>
    );
}
export default PopUpConfirm;

/** Componente que tiene la logica para ejecutar el PopUP */

// // import Button from "react-bootstrap/Button";
// // // import Modal from "react-bootstrap/Modal";
// // import PopUpConfirm from "./PopUpConfirm";
// // // import React from "react";
// // import { useState } from "react";

// // export default function App() {
// //   const [modalShow, setModalShow] = useState(false);

// //   return (
// //     <>
// //       <Button variant="primary" onClick={() => setModalShow(true)}>
// //         Launch vertically centered modal
// //       </Button>

// //       <PopUpConfirm show={modalShow} onHide={() => setModalShow(false)} />
// //     </>
// //   );
// // }