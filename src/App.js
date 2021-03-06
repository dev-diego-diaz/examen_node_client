import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

// Notificaciones Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Header from "./components/nav/Header";

// Paginas publicas
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import RegisterComplete from "./pages/auth/RegisterComplete";
import bookDetail from "./pages/BookDetail";

// Paginas modo admin

import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";

const App = () => {
  const dispatch = useDispatch();

  // check user auth state: mount, update mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
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
          })
          .catch((err) => console.log(err));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register/complete" component={RegisterComplete} />

        <UserRoute exact path="/dashboard" component={Dashboard} />
        <UserRoute exact path="/book/:slug" component={bookDetail} />

        <AdminRoute exact path="/dashboard" component={Dashboard} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
      </Switch>
    </>
  );
};

export default App;
