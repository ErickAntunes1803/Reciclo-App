import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import api, { geolocation } from "../../../Utils/api";

function Address() {
  const [validated, setValidated] = useState(false);
  const state = useSelector((state) => state.coletaFrom.data.state);
  const dispatch = useDispatch();

  const handleClose = () => {
    console.log("close");
    dispatch({ type: "STATE_MODAL", state: false });
    setValidated(false);
  };

  const handleSalvar = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      const cep = document.getElementById("CEP").value;
      const logradouro = document.getElementById("LOGRADOURO").value;
      const numero = document.getElementById("NUMERO").value;
      const bairro = document.getElementById("BAIRRO").value;
      const localidade = document.getElementById("CIDADE").value;
      const uf = document.getElementById("ESTADO").value;
      const complemento = document.getElementById("COMPLEMENTO").value;

      //  console.log(`${logradouro} ${numero},${localidade},${uf}`);
      geolocation
        .get(`${logradouro} ${numero},${localidade},${uf}`)
        .then((response) => {
          console.log(response.data);
          const latitude =
            response.data.results[0].locations[0].displayLatLng.lat;
          const lontitude =
            response.data.results[0].locations[0].displayLatLng.lng;
          console.log("LAT : ", latitude, "LONG: ", lontitude);

          api
            .post(`/address`, {
              cep,
              logradouro,
              numero,
              bairro,
              localidade,
              uf,
              complemento,
              latitude,
              lontitude,
            })
            .then((response) => {
              console.log(response);
              dispatch({
                type: "STATE_SOLICITA_NEW_ADDRESS",
                newAddress: true,
              });
              handleClose();
            })
            .catch((error) => {});
          NotificationManager.erro(
            "Desculpe, ocorreu um erro ao Salvar o endereço."
          );
        })
        .catch((error) => {});
    }
  };

  const handleCep = (event) => {
    const cep = event.target.value;
    // console.log('tamanho : ', cep.length);
    if (cep.length === 8) {
      axios
        .get(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => {
          if (typeof response.data.erro != undefined && response.data.erro) {
            NotificationManager.error("CEP Não Existe");
          } else {
            document.getElementById("LOGRADOURO").value =
              response.data.logradouro;
            document.getElementById("BAIRRO").value = response.data.bairro;
            document.getElementById("CIDADE").value = response.data.localidade;
            document.getElementById("ESTADO").value = response.data.uf;
          }
        })
        .catch((error) => {});
    }
  };

  return (
    <>
      <NotificationContainer />
      <Modal show={state} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Endereço: </Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSalvar}>
          <Modal.Body>
            {/* <form action="" > */}
            <Container>
              <Row>
                <Col xs={6} md={4}>
                  <Form.Group controlId="CEP">
                    <Form.Label>CEP</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Insira seu Cep"
                      maxLength="8"
                      onChange={(event) => handleCep(event)}
                      required
                    />
                    <Form.Text className="text-muted">
                      Insira somente Numeros
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId="LOGRADOURO">
                    <Form.Label>Rua</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Insira sua Rua"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} md={2}>
                  <Form.Group controlId="NUMERO">
                    <Form.Label>Numero</Form.Label>
                    <Form.Control type="text" placeholder="Numero" required />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col xs={12} md={5}>
                  <Form.Group controlId="BAIRRO">
                    <Form.Label>Bairro</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="INSIRA SEU Bairro"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Group controlId="CIDADE">
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="INSIRA SUA CIDADE"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} md={3}>
                  <Form.Group controlId="ESTADO">
                    <Form.Label>Estado</Form.Label>
                    <Form.Control as="select" required>
                      <option value="AC">Acre</option>
                      <option value="AL">Alagoas</option>
                      <option value="AP">Amapá</option>
                      <option value="AM">Amazonas</option>
                      <option value="BA">Bahia</option>
                      <option value="CE">Ceará</option>
                      <option value="DF">Distrito Federal</option>
                      <option value="ES">Espírito Santo</option>
                      <option value="GO">Goiás</option>
                      <option value="MA">Maranhão</option>
                      <option value="MT">Mato Grosso</option>
                      <option value="MS">Mato Grosso do Sul</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="PA">Pará</option>
                      <option value="PB">Paraíba</option>
                      <option value="PR">Paraná</option>
                      <option value="PE">Pernambuco</option>
                      <option value="PI">Piauí</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="RN">Rio Grande do Norte</option>
                      <option value="RS">Rio Grande do Sul</option>
                      <option value="RO">Rondônia</option>
                      <option value="RR">Roraima</option>
                      <option value="SC">Santa Catarina</option>
                      <option value="SP">São Paulo</option>
                      <option value="SE">Sergipe</option>
                      <option value="TO">Tocantins</option>
                      <option value="EX">Estrangeiro</option>
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
            </Container>
            {/* </form> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose()}>
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

export default Address;
