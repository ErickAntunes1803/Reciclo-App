import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import api from "../../../Utils/api";

function User() {
  const stateUser = useSelector((state) => state.UserModal);
  const [user, setUser] = useState({
    email: "",
    senha: "",
    confirmSenha: "",
    nome: "",
  });
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (stateUser) {
      getUser();
    }
  }, [stateUser]);

  const getUser = () => {
    api
      .get(`/usuario`)
      .then((response) => {
        const responseUser = user;
        responseUser.email = response.data.email;
        responseUser.nome = response.data.name;
        setUser(responseUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInput = (event) => {
    const handleUser = { ...user };
    handleUser[event.target.id] = event.target.value;
    setUser(handleUser);
  };

  const handleClose = () => {
    dispatch({ type: "STATE_USER", state: false });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (user.senha !== user.confirmSenha) {
      NotificationManager.warning("Senhas não correspondem");
      return;
    }

    api
      .put(`usuario`, {
        nome: user.nome,
        email: user.email,
        senha: user.senha,
      })
      .then((response) => {
        NotificationManager.success("Usuário Atualizado com Sucesso !!");
        handleClose();
      })
      .catch((err) => console.log(err));
    setValidated(true);
  };

  return (
    <>
      <NotificationContainer />
      <Modal show={stateUser.data.state} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Minhas Coletas: </Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col xs={6} md={6}>
                <Form.Group controlId="nome">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    value={user.nome}
                    type="text"
                    placeholder="Nome"
                    required
                    onChange={(e) => handleInput(e)}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} md={6}>
                <Form.Group controlId="email">
                  <Form.Label>EMAIL</Form.Label>
                  <Form.Control
                    value={user.email}
                    type="text"
                    placeholder="Email"
                    required
                    onChange={(e) => handleInput(e)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={6} md={6}>
                <Form.Group controlId="senha">
                  <Form.Label>NOVA SENHA</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="SENHA"
                    value={user.senha}
                    onChange={(e) => handleInput(e)}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} md={6}>
                <Form.Group controlId="confirmSenha">
                  <Form.Label>REPITA A SENHA</Form.Label>
                  <Form.Control
                    type="password"
                    value={user.confirmSenha}
                    placeholder="SENHA"
                    onChange={(e) => handleInput(e)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit">
              Salvar
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Sair
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default User;
