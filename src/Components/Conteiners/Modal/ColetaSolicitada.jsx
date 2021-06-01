import React from "react";
import { Button, Modal, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

function ColetaSolicitada() {
  const state = useSelector((state) => state.SolicitaColeta.data.confirm);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({ type: "STATE_COLETA_SOLICITADA", confirm: false });
  };

  return (
    <>
      <Modal show={state} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Coleta Gerada </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <h5> Obrigado por contribuir por um Planeta Melhor.</h5>
            <p>
              {" "}
              Visualize os status de sua coleta para saber o andamento de sua
              Coleta.{" "}
            </p>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Sair
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ColetaSolicitada;
