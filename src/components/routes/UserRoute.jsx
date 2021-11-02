import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

//children =>  Hace alución al componente al cual se esta inyectando (Se recepciona como parte del eco sistema pero no se utiliza, solo en la versiones antigua)
//...res =>  Todas las propiedades que componen al componente
const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  //                         Asocia la ruta del componente con todas sus propiedades
  return user && user.token ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default UserRoute;
