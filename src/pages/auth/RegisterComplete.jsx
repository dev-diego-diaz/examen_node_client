import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";

import { Col } from "antd";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // dispatch
  let dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validations
    if (!email || !password) {
      toast.error("Se requiere correo electrónico y contraseña");
      return;
    }

    if (password < 6) {
      toast.error("La contraseña debe contener 6 caracteres como mínimo");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        // remove user email from local storage
        window.localStorage.removeItem("emailForRegistration");
        // get user id token
        let user = auth.currentUser;

        // Actualizar el password del usuario
        await user.updatePassword(password);

        // Obtener Token una vez se actualiza o designa una pass
        const idTokenResult = await user.getIdTokenResult();

        createOrUpdateUser(idTokenResult.token)
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
          })
          .catch((err) => console.log(err));

        // redirect
        history.push("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Email */}
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
          disabled
        />

        {/* Contraseña */}
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
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
        />
        <br />
        <button
          type="submit"
          className="btn btn-raised"
          style={{
            width: "100%",
            height: "35px",
            color: "white",
            border: "none",
            background: "#0faf0d",
          }}
        >
          Completar registro
        </button>
      </form>
    </div>
  );

  return (
    <div className="container" style={{ marginTop: "10%" }}>
      <div className="row">
        <Col span={8} offset={8}>
          <h3 style={{ marginBottom: "20px" }}>
            ¡Felicidades, estas a un paso de completar tu registro!
          </h3>
          {completeRegistrationForm()}
        </Col>
      </div>
    </div>
  );
};

export default RegisterComplete;
