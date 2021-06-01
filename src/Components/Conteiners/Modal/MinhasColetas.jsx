import React, { useState, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";

import { FiXOctagon } from "react-icons/fi";

import { useSelector, useDispatch } from "react-redux";

import { NotificationContainer } from "react-notifications";

import api from "../../../Utils/api";

function MinhasColetas() {
  const stateMinhasColetas = useSelector((state) => state.MinhaColeta);
  const [minhasColetas, setMinhasColetas] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (stateMinhasColetas) {
      getColetas();
    }
  }, [stateMinhasColetas]);

  const getColetas = () => {
    api
      .get(`/collection`)
      .then((response) => {
        setMinhasColetas(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    dispatch({ type: "STATE_MINHAS_COLETA", state: false });
  };

  const cancelarColeta = (id) => {
    console.log("Cancelar Coleta : ", id);
    api
      .delete(`collection/${id}/delete`)
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const renderRow = () => {
    console.log("minhasColetas : ", minhasColetas);
    return minhasColetas.map(function (item) {
      return (
        <tr key={item.id}>
          <td>{item.complemento}</td>
          <td>
            {item.collectionStatus ? item.collectionStatus.description : ""}
          </td>
          <td>
            <div
              className={`circulo ${
                item.collectionReciclado
                  ? item.collectionReciclado.categoria
                  : ""
              }`}
            />
            {item.collectionReciclado ? item.collectionReciclado.descricao : ""}
          </td>
          <td>
            <Button
              variant="danger"
              className="mr-2"
              onClick={() => cancelarColeta(item.id)}
            >
              <FiXOctagon></FiXOctagon>
            </Button>
            {/* <Button variant="warning">
              <FiEdit2></FiEdit2>
            </Button> */}
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <NotificationContainer />
      <Modal
        show={stateMinhasColetas.data.state}
        onHide={handleClose}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Minhas Coletas: </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container mt-5">
            <Table>
              <thead>
                <tr>
                  <th>Coleta</th>
                  <th>Status</th>
                  <th>Tipo</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{renderRow()}</tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Sair
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MinhasColetas;
