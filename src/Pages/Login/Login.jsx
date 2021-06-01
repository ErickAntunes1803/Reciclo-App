import React, { useState, useEffect } from "react";
import "./Login.css";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Form,
} from "react-bootstrap";
import { AiOutlineUser } from "react-icons/ai";
import { BsFillLockFill } from "react-icons/bs";
import logo from "../../assets/logo.png";
import Header from "../../Components/Header/Header";
import { auth } from "../../Utils/api";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Redirect } from "react-router-dom";

const Login = () => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setRedirect(true);
    }
  }, []);

  const handleSalvar = (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth
      .post("auth/login", {
        email,
        password,
      })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("collector", response.data.collector);
        // setRedirect(true);

        document.location.reload();
      })
      .catch((error) => {
        if (error.response.status === 401) {
          NotificationManager.warning("Usuario ou Senha Errado");
        }
        console.log(error.response.status);
      });
  };

  return (
    <>
      {redirect && <Redirect to="/" />}
      <NotificationContainer />
      <Header />
      <div className="loginColumn">
        {/* <Col xs={6}>
                    <div className="loginColumn">
                        <div className="logoCard">
                            <img src={logo} className="logoLogin" alt=""/>
                        </div>
                    </div>
                </Col> */}

        {/* <div className="loginColumn"> */}
        <div className=" loginCard">
          <div className="userIcon">
            <i>
              <AiOutlineUser size={150} />
            </i>
            <br />
            USER LOGIN
          </div>

          <Form onSubmit={handleSalvar}>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="Username">
                  {" "}
                  <AiOutlineUser />{" "}
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                id="email"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="Username"
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="Senha">
                  {" "}
                  <BsFillLockFill />{" "}
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                id="password"
                placeholder="Senha"
                aria-label="Senha"
                aria-describedby="UserSenhaname"
                type="password"
              />
            </InputGroup>

            <button type="submit" className="btn btn-light w-100 btnLogin">
              {" "}
              LOGIN{" "}
            </button>
          </Form>

          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Login;
