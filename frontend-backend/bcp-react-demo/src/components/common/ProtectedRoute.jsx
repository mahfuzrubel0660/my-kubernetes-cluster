import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ProtectedRoute = (props) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const { path, component } = props;
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      return setisLoggedIn(true);
    }
    return history.push("/");
  }, [history]);

  return isLoggedIn && <Route path={path} component={component} exact />;
};

export default ProtectedRoute;
