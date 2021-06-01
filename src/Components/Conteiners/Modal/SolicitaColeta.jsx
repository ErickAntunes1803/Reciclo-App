import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { NotificationContainer } from "react-notifications";
import api from "../../../Utils/api";

function SolicitaColeta() {
  const [validated, setValidated] = useState(false);
  const stateColeta = useSelector((state) => state.SolicitaColeta.data.state);
  // const confirm = useSelector((state) => state.SolicitaColeta.data.confirm);
  //   const newAddress = useSelector(state => state.SolicitaColeta.data.newAddress);
  const dispatch = useDispatch();
  const [addresses, setAddresses] = useState();
  const [address, setAddress] = useState(false);

  useEffect(() => {
    if (stateColeta === true) getAddress();
  }, [stateColeta]);

  const getAddress = () => {
    api
      .get(`/address`)
      .then((result) => {
        setAddresses(result.data);
      })
      .catch((error) => {});
  };

  const handlesetAddress = (e) => {
    if (e.target.checked) {
      const id = e.target.name;
      setAddress(id);

      const filhos = document.getElementsByClassName("radioButon");
      for (var i = 0; i < filhos.length; i++) {
        if (filhos[i].children[0].name !== id) {
          filhos[i].children[0].checked = false;
        }
      }
    } else {
      console.log("null");
      setAddress(false);
    }
  };

  const handleClose = () => {
    dispatch({ type: "STATE_SOLICITA_COLETA", state: false });
    setValidated(false);
  };

  const handleSalvar = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      //   event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      const reciclado_id = document.getElementById("CATEGORIA").value;
      const complemento = document.getElementById("COMPLEMENTO").value;

      api
        .post(`/collection`, {
          reciclado_id,
          complemento,
          address,
        })
        .then((response) => {
          dispatch({ type: "STATE_COLETA_SOLICITADA", confirm: true });
          console.log(response);
        })
        .catch((error) => {});
      // handleClose();
    }
  };

  return (
    <>
      <NotificationContainer />
      <Modal show={stateColeta} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Coleta: </Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSalvar}>
          <Modal.Body>
            <Container>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group controlId="CATEGORIA">
                    <Form.Label>Selecione o material</Form.Label>
                    <Form.Control as="select" required>
                      <option value="1"> Papéis e papelões</option>
                      <option value="2">Vidros</option>
                      <option value="3">Plásticos</option>
                      <option value="4">Metais</option>
                      <option value="5">Madeiras</option>
                      <option value="6">Materiais não reciclados</option>
                      <option value="7">Outros</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col xs={12} md={12}>
                  <Form.Group controlId="COMPLEMENTO">
                    <Form.Label>Complemento</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-2">
                <h4>Endereços:</h4>

                {/* <Button variant="warning" onClick={() => handleNewAddress()} className="ml-5"> Novo Endereço</Button> */}
              </Row>
              <Row>
                <Col xs={12} md={12}>
                  <div id="inputs">
                    {addresses &&
                      addresses.map((adress) => {
                        return (
                          <Form.Group
                            controlId={`formBasicCheckbox${adress.id}`}
                          >
                            <Form.Check
                              className="radioButon"
                              type="checkbox"
                              name={adress.id}
                              label={`${adress.logradouro}, ${adress.numero},  ${adress.bairro}, ${adress.localidade}, ${adress.uf}, - ${adress.cep}`}
                              onClick={(e) => handlesetAddress(e)}
                            />
                          </Form.Group>
                        );
                      })}
                  </div>
                </Col>
              </Row>
            </Container>
            {/* </form> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Sair
            </Button>
            <Button variant="primary" type="submit">
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default SolicitaColeta;
