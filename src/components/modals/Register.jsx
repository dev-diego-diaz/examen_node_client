import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Register = ({ history }) => {
  const [email, setEmail] = useState("di.diaz.ortiz@gmail.com");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [history, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `El correo electrónico se enviará a ${email}. Haga clic en el enlace para completar su registro.`
    );
    // save your email in local storage
    window.localStorage.setItem("emailForRegistration", email);
    // clear state
    setEmail("");
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
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
        Registrarse
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">{registerForm()}</div>
      </div>
    </div>
  );
};

export default Register;
