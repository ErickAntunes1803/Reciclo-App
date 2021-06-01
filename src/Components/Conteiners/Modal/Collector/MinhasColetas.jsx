import { React, useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Button, Modal, Container, Table, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FiCheckCircle, FiXCircle, FiTruck, FiThumbsUp } from "react-icons/fi";

import api from "../../../../Utils/api";

import trashIcon from "../../../../assets/lixo.png";

function CollectorColeta() {
  const state = useSelector((state) => state.CollectorMinhasColetas.data.state);
  const dispatch = useDispatch();
  const [coletas, setColetas] = useState([]);
  const [coleta, setColeta] = useState({});
  const [visualizarState, setVisualizarState] = useState(false);
  const [map, setMap] = useState(false);

  useEffect(() => {
    if (state) {
      getColetas(0);
    }
  }, [state]);

  const getColetas = (status) => {
    api
      .get(`/collector/user/collection/${status}`)
      .then((res) => {
        // console.log("Teste de Minhas Coletas : ", res);
        setColetas(res.data);
      })
      .catch((err) => console.log(err));
  };

  const ResizeMap = () => {
    const map = useMap();
    map._onResize();
    return null;
  };

  const trash = L.icon({
    iconUrl: trashIcon,
    iconSize: [50, 50],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
  });

  const myiIcon = L.icon({
    iconUrl:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=",
    iconSize: [25, 30],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
  });

  const handleClose = () => {
    dispatch({ type: "STATE_COLLECTOR_MINHAS_COLETAS", state: false });
    setVisualizarState(false);
    setMap(false);
  };

  const returnColetas = () => {
    setVisualizarState(false);
    setMap(false);
  };

  const changeColetaStatus = (id, status) => {
    api
      .put(`collector/${id}/collection/${status}`)
      .then((res) => {
        if (status === 1) {
          setColetas(coletas.filter((coleta) => coleta.id !== id));
        } else {
          setColetas(
            coletas.filter((coleta) => {
              if (coleta.id === id) {
                coleta.status = status;
              }
              return true;
            })
          );
          // setColetas(novaColetas);
        }

        if (visualizarState) returnColetas();
      })
      .catch((err) => console.log(err));
  };

  const visualizar = (id) => {
    setColeta(id);
    setVisualizarState(true);
    setMap(true);
  };

  const filterColetas = (e) => {
    getColetas(e.target.value);
  };

  const renderRow = () => {
    return coletas.map(function (item) {
      return (
        <tr key={item.id}>
          <td className="pointer" onClick={() => visualizar(item)}>
            <div className={`circulo ${item.collectionReciclado.categoria}`} />
            {item.collectionReciclado.descricao}
          </td>
          <td
            className="pointer"
            onClick={() => visualizar(item)}
          >{` ${item.collectionAddress.bairro}, ${item.collectionAddress.logradouro}, ${item.collectionAddress.numero}, ${item.collectionAddress.localidade} - ${item.collectionAddress.uf} `}</td>

          <td>
            {item.status === "2" && (
              <Button
                variant="primary"
                className="mr-2  mb-1"
                onClick={() => changeColetaStatus(item.id, 3)}
              >
                <FiTruck></FiTruck>
              </Button>
            )}

            {item.status === "3" && (
              <Button
                variant="success"
                className="mr-2  mb-1"
                onClick={() => changeColetaStatus(item.id, 4)}
              >
                <FiCheckCircle></FiCheckCircle>
              </Button>
            )}
            {item.status !== "4" ? (
              <Button
                variant="danger"
                className="mr-2 mb-1 "
                onClick={() => changeColetaStatus(item.id, 1)}
              >
                <FiXCircle></FiXCircle>
              </Button>
            ) : (
              <div className="coletaConcluida">
                <FiThumbsUp size={30}></FiThumbsUp>
              </div>
            )}
          </td>
        </tr>
      );
    });
  };

  const renderTable = () => {
    return (
      <Table>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Endereço</th>
            <th>
              <select
                name="filtroColetas"
                id="filtroColetas"
                onChange={(e) => filterColetas(e)}
              >
                <option value="0" select>
                  Todas
                </option>
                <option value="2"> Aguardando Inicio</option>
                <option value="3"> Em andamento</option>
                <option value="4"> Finalizadas</option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>{renderRow()}</tbody>
      </Table>
    );
  };

  const componentVisualizar = () => {
    return (
      <>
        <Container>
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-between">
              <div
                className={`circulo ${coleta.collectionReciclado.categoria} mr-3`}
              />
              {coleta.collectionReciclado.descricao}
            </div>

            <div>
              {coleta.status === "2" && (
                <Button
                  variant="primary"
                  className="mr-2  mb-1"
                  onClick={() => changeColetaStatus(coleta.id, 3)}
                >
                  <FiTruck></FiTruck>
                </Button>
              )}

              {coleta.status === "3" && (
                <Button
                  variant="success"
                  className="mr-2  mb-1"
                  onClick={() => changeColetaStatus(coleta.id, 4)}
                >
                  <FiCheckCircle></FiCheckCircle>
                </Button>
              )}
              {coleta.status !== "4" ? (
                <Button
                  variant="danger"
                  className="mr-2 mb-1 "
                  onClick={() => changeColetaStatus(coleta.id, 1)}
                >
                  <FiXCircle></FiXCircle>
                </Button>
              ) : (
                <div className="coletaConcluida">
                  <FiThumbsUp size={30}></FiThumbsUp>
                </div>
              )}
            </div>
          </div>
          <hr />
          <Row className="mt-2">
            <p>
              <b>Endereço: </b>{" "}
              {`${coleta.collectionAddress.bairro}, ${coleta.collectionAddress.logradouro}, ${coleta.collectionAddress.numero}, ${coleta.collectionAddress.localidade} -  ${coleta.collectionAddress.uf}, ${coleta.collectionAddress.cep}`}
            </p>
          </Row>
          <Row>
            <p>
              <b>Complemento : </b>{" "}
              {coleta.complemento === ""
                ? "Sem Complementos"
                : coleta.complemento}
            </p>
          </Row>
          <div className="mapaColeta">
            {map && (
              <MapContainer
                center={[
                  coleta.collectionAddress.latitude,
                  coleta.collectionAddress.lontitude,
                ]}
                zoom={16}
                scrollWheelZoom={true}
                className="coletasSizeMap"
              >
                <ResizeMap />
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />

                <Marker
                  position={[
                    coleta.collectionAddress.latitude,
                    coleta.collectionAddress.lontitude,
                  ]}
                  icon={coleta.status === "4" ? trash : myiIcon}
                >
                  <Popup>
                    {`${coleta.collectionAddress.logradouro}, ${coleta.collectionAddress.numero},  ${coleta.collectionAddress.bairro}, ${coleta.collectionAddress.localidade}, ${coleta.collectionAddress.uf}, - ${coleta.collectionAddress.cep}`}
                  </Popup>
                </Marker>
              </MapContainer>
            )}
          </div>
        </Container>
      </>
    );
  };

  return (
    <>
      <Modal show={state} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Minhas Coletas: </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            {!visualizarState ? renderTable() : componentVisualizar()}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          {!visualizarState ? (
            <Button variant="secondary" onClick={() => handleClose()}>
              Sair
            </Button>
          ) : (
            <Button variant="secondary" onClick={() => returnColetas()}>
              Voltar
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CollectorColeta;
