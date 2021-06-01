import React, { useState, useEffect } from "react";
import "./Menu.css";
import logo from "../../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { BsArrowReturnLeft, BsArrowReturnRight } from "react-icons/bs";
import consts from "../../Utils/Constants";

const Menu = () => {
  const dispatch = useDispatch();
  const [btnstate, setBtnState] = useState(false);
  const [iscollector, setcollector] = useState(false);

  useEffect(() => {
    setcollector(localStorage.getItem("collector"));
  }, []);

  const handleMenu = () => {
    if (btnstate === true) {
      setBtnState(false);
      // document.getElementById('asideMenu').style.left = '0';
      document.getElementById("asideMenu").classList.remove("return");
      // console.log(root.classList);
    }
    if (btnstate === false) {
      document.getElementById("asideMenu").classList.add("return");
      // document.getElementById('asideMenu').style.left = '-26%';
      setBtnState(true);
    }
  };

  const handleAddres = () => {
    dispatch({ type: "STATE_MODAL", state: true });
  };

  const handleSolicitaColeta = () => {
    dispatch({ type: "STATE_SOLICITA_COLETA", state: true });
  };

  const handleMinhasColetas = () => {
    dispatch({ type: "STATE_MINHAS_COLETA", state: true });
  };

  const handleCollectorColetas = () => {
    dispatch({ type: "STATE_COLLECTOR_COLETAS", state: true });
  };

  const handleCollectorMinhasColetas = () => {
    dispatch({ type: "STATE_COLLECTOR_MINHAS_COLETAS", state: true });
  };

  const handleUser = () => {
    dispatch({ type: "STATE_USER", state: true });
  };

  const sair = () => {
    localStorage.clear();
    window.location.href = `${consts.BASE_URL}/app`;
  };

  return (
    <>
      <div id="asideMenu" className="menuNav">
        <div className="logoSectionNav">
          <div className="logo1">
            <div className="logoNavaside">
              <img src={logo} alt="" className="img" />
            </div>
          </div>

          <div className="menuBotao">
            <div className="botaoMinimizazr" onClick={() => handleMenu()}>
              {btnstate ? <BsArrowReturnRight /> : <BsArrowReturnLeft />}
            </div>
          </div>
        </div>

        <div className="contentNav">
          <ul>
            {iscollector === "0" && (
              <>
                <li className="linkmenu" onClick={() => handleMinhasColetas()}>
                  Minhas Coletas
                </li>
                <li className="linkmenu" onClick={() => handleSolicitaColeta()}>
                  Solicitar Nova Coleta
                </li>
                <li className="linkmenu" onClick={() => handleAddres()}>
                  Endereços
                </li>
              </>
            )}

            {iscollector === "1" && (
              <>
                <li
                  className="linkmenu"
                  onClick={() => handleCollectorColetas()}
                >
                  Coletas
                </li>
                <li
                  className="linkmenu"
                  onClick={() => handleCollectorMinhasColetas()}
                >
                  Minhas Coletas
                </li>
              </>
            )}

            <li className="linkmenu" onClick={() => handleUser()}>
              Minha Conta
            </li>
            <li className="linkmenu" onClick={() => sair()}>
              Sair
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Menu;
