import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button, Modal, Spin, Col } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createOrUpdateUser, currentUser } from "../../functions/auth";

import ForgotPassword from "../../components/modals/ForgotPassword";
import Register from "../../components/modals/Register";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [isModalVisibleForget, setIsModalVisibleForget] = useState(false);
  const [isModalVisibleRegister, setIsModalVisibleRegister] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    let intended = history.location.state;

    if (intended) {
      return;
    } else {
      if (user && user.token) history.push("/");
    }
  }, [user, history]);

  let dispatch = useDispatch();

  const roleBasedRedirect = (res) => {
    // check if intended
    let intended = history.location.state;

    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === "admin") {
        history.push("/admin/dashboard");
      } else {
        history.push("/dashboard");
      }
    }
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;

      const idTokenResult = await user.getIdTokenResult();

      currentUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });

          roleBasedRedirect(res);
          setLoading(false);
        })
        .catch((err) => console.log(err));

      // Luego Borrar
      // history.push("/");
    } catch (error) {
      toast.error(
        <div style={{ justifyContent: "justify" }}>
          {
            "El acceso a esta cuenta se ha desactivado temporalmente debido a muchos intentos fallidos de inicio de sesión."
          }
          <br />
          <br />
          {
            "Puede restaurarlo inmediatamente restableciendo su contraseña o puede intentarlo de nuevo más tarde."
          }
        </div>
      );

      // Texto cargando
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;

        const idTokenResult = await user.getIdTokenResult();

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const loginForm = () => (
    <form onSubmit={enviarFormulario}>
      {/* Correo electronico */}
      <input
        style={{
          width: "100%",
          marginBottom: "20px",
          padding: "7px",
          border: "none",
          borderBottom: "1px solid",
          outline: "none",
          fontSize: "1rem",
        }}
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo electronico"
        autoFocus
      />

      {/* Contraseña */}
      <input
        style={{
          width: "100%",
          marginBottom: "10px",
          padding: "7px",
          border: "none",
          borderBottom: "1px solid",
          outline: "none",
          fontSize: "1rem",
        }}
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
      />
      <br />
      <br />

      {/* Botones de acceso */}
      <Button
        onClick={enviarFormulario}
        type="primary"
        className="mb-3"
        block
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Acceder con Email y Contraseña
      </Button>
    </form>
  );

  //
  const showModalForget = () => {
    setIsModalVisibleForget(true);
  };

  const showModalRegister = () => {
    setIsModalVisibleRegister(true);
  };

  const handleCancelForget = () => {
    setIsModalVisibleForget(false);
  };

  const handleCancelRegister = () => {
    setIsModalVisibleRegister(false);
  };

  return (
    <div className="container">
      <div className="row">
        <Col span={12} offset={6}>
          <div
            style={{
              border: "1px solid #cbcbcb",
              padding: "30px",
              marginTop: "150px",
            }}
          >
            <h3>Autentificación</h3>
            {loading && <Spin>Cargando</Spin>}

            {loginForm()}
            <Button
              onClick={googleLogin}
              type="danger"
              className="mb-3"
              block
              icon={<GoogleOutlined />}
              size="large"
            >
              Acceder con Google
            </Button>

            <div style={{ marginTop: "10px" }}>
              <div
                style={{
                  cursor: "pointer",
                  color: "rgb(24, 144, 255)",
                  float: "left",
                }}
                onClick={showModalForget}
              >
                Recuperar contraseña
              </div>

              <div
                style={{
                  cursor: "pointer",
                  color: "rgb(24, 144, 255)",
                  float: "right",
                  textAlign: "end",
                }}
                onClick={showModalRegister}
              >
                Registrarse
              </div>
            </div>
          </div>
        </Col>
      </div>

      <Modal
        title="Recuperar contraseña"
        visible={isModalVisibleForget}
        onCancel={handleCancelForget}
        footer={null}
      >
        <ForgotPassword />
      </Modal>

      <Modal
        title="Registrarse"
        visible={isModalVisibleRegister}
        onCancel={handleCancelRegister}
        footer={null}
      >
        <Register />
      </Modal>
    </div>
  );
};

export default Login;
