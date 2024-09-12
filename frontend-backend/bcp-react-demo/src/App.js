import { Close } from "@mui/icons-material";
import { SnackbarProvider } from "notistack";
import { useEffect, useRef, useState } from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { ProtectedRoute } from "./components/common";
import { alertContext } from "./hooks/alertContext";
import { CreatePost, Login } from "./pages";

function App() {
  const [alertPopupContext, setAlertPopupContext] = useState("");
  const alertPopupRef = useRef();

  useEffect(() => {
    if (!alertPopupContext) return;
    alertPopupRef.current.enqueueSnackbar(alertPopupContext.message, {
      variant: alertPopupContext.type,
    });
  }, [alertPopupContext]);
  return (
    <alertContext.Provider value={{ alertPopupContext, setAlertPopupContext }}>
      <SnackbarProvider
        ref={alertPopupRef}
        maxSnack={4}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        style={{
          fontWeight: alertPopupContext.type === "error" ? "bolder" : "bold",
        }}
        action={(key) => (
          <Close
            onClick={() => {
              alertPopupRef.current.closeSnackbar(key);
            }}
            style={{
              color: "#fff",
              height: "1.5rem",
              paddingBottom: "0.5rem",
              cursor: "pointer",
            }}
          />
        )}
      >
        <Switch>
          <Route exact path="/" component={Login} />
          <ProtectedRoute path="/posts/create" component={CreatePost} />
        </Switch>
      </SnackbarProvider>
    </alertContext.Provider>
  );
}

export default App;
