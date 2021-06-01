import React, { useState, useEffect } from "react";
import "./Main.css";

import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Spinner } from "react-bootstrap";
import api from "../../Utils/api";

import Address from "../Conteiners/Modal/Address";
import SolicitaColeta from "../Conteiners/Modal/SolicitaColeta";
import ColetaSolicitada from "../Conteiners/Modal/ColetaSolicitada";
import MinhasColetas from "../Conteiners/Modal/MinhasColetas";
import User from "../Conteiners/Modal/User";
import CollectorColetas from "../Conteiners/Modal/Collector/Coletas";
import CollectorMinhasColetas from "../Conteiners/Modal/Collector/MinhasColetas";

import truckIcon from "../../assets/icon3.png";
import pinIcon from "../../assets/pin.png";

const Main = () => {
  const [latitude, setLatitude] = useState(-23.618237);
  const [longitude, setLongitude] = useState(-46.635197);
  const [load, setLoad] = useState(false);
  const [minhasColetas, setMinhasColetas] = useState(false);
  const [iscollector, setcollector] = useState(false);

  useEffect(() => {
    // console.log("minhasColetas", minhasColetas);
    if (minhasColetas === false) {
      setcollector(localStorage.getItem("collector"));
      getColetas();
    }
  }, [minhasColetas]);

  const getColetas = () => {
    const url =
      localStorage.getItem("collector") === "1"
        ? "/collector/address"
        : "/collection/address";

    console.log("url : ", url, " col : ", iscollector);
    api
      .get(url)
      .then((result) => {
        console.log("Coletas : ", result);
        setMinhasColetas(result.data);
      })
      .catch((erro) => {});
  };

  const getLocalizacao = (lat, long) => {
    setLatitude(lat);
    setLongitude(long);
    setLoad(true);
    // console.log('call back acionada lat: ', latitude, ' long: ', longitude);
  };

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      getLocalizacao(position.coords.latitude, position.coords.longitude);
    });
  } else {
    alert(
      "I'm sorry, but geolocation services are not supported by your browser."
    );
  }

  const myiIcon = L.icon({
    iconUrl:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=",
    iconSize: [25, 35],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
  });

  const truck = L.icon({
    iconUrl: truckIcon,
    iconSize: [60, 60],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
  });

  const pin = L.icon({
    iconUrl: pinIcon,
    iconSize: [60, 60],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
  });

  return (
    <>
      <div className="main">
        {!load && <Spinner animation="border" variant="success" size="lg" />}

        {load && (
          <MapContainer
            center={[latitude, longitude]}
            zoom={16}
            scrollWheelZoom={true}
            className="main"
          >
            {/* <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /> */}

            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            <Marker
              position={[latitude, longitude]}
              icon={iscollector === "1" ? truck : pin}
            >
              <Popup>{`Sua Localização`}</Popup>
            </Marker>

            {minhasColetas &&
              minhasColetas.map((adress) => {
                return (
                  <Marker
                    position={[adress.latitude, adress.lontitude]}
                    icon={myiIcon}
                  >
                    <Popup>
                      {`${adress.logradouro}, ${adress.numero},  ${adress.bairro}, ${adress.localidade}, ${adress.uf}, - ${adress.cep}`}
                    </Popup>
                  </Marker>
                );
              })}
          </MapContainer>
        )}
      </div>

      <Address />
      <SolicitaColeta />
      <ColetaSolicitada />
      <MinhasColetas />
      <User />
      <CollectorColetas />
      <CollectorMinhasColetas />
    </>
  );
};

export default Main;
