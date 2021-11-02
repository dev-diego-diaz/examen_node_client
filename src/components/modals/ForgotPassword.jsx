import React, { useState, useEffect } from "react";

// Firebase
import { auth } from "../../firebase";

// Toasty
import { toast } from "react-toastify";

// Redux
import { useSelector } from "react-redux";

// Ant
import { Spin } from "antd";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [history, user]);

  const enviarFormulario = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success(
          "Verifique su correo electrónico para el enlace de restablecimiento de contraseña"
        );
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
        console.log("Mensaje de error en contraseña olvidada", error);
      });
  };

  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {loading && <Spin>Cargando</Spin>}

      <form onSubmit={enviarFormulario}>
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
          placeholder="Email"
          autoFocus
        />
        <br />
        <button
          className="btn btn-raised"
          style={{
            width: "100%",
            height: "35px",
            color: "white",
            border: "none",
            background: "#95af0d",
          }}
          disabled={!email}
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
