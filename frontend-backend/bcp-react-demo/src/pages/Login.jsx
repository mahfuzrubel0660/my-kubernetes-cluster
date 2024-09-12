import { ThemeProvider } from "@emotion/react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { login, register } from "../api/api";
import { alertContext } from "../hooks/alertContext";

const theme = createTheme();
const useStyles = makeStyles({
  mainBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vH",
  },
});

export default function Login() {
  const classes = useStyles();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUp, setSignUp] = useState(false);
  const history = useHistory();
  const { setAlertPopupContext } = useContext(alertContext);

  useEffect(() => {
    const auth_token = localStorage.getItem("auth_token");
    if (auth_token) history.push("/posts/create");
  });

  const handleSubmit = (event, type) => {
    if (signUp) {
      register({ fullname: fullName, email: email, password: password })
        .then((res) => {
          console.log(res);
          setAlertPopupContext({
            message: "Registration Successful. Please login.",
            type: "success",
          });
          setSignUp(false);
        })
        .catch((err) => {
          console.log(err);
          setAlertPopupContext({
            message: "Registration failed. Please try again.",
            type: "error",
          });
        });
    } else {
      login({ email: email, password: password })
        .then((res) => {
          console.log(res);
          localStorage.setItem("uid", res.data.id);
          localStorage.setItem("auth_token", res.data.auth_token);
          setAlertPopupContext({
            message: "Login Successful.",
            type: "success",
          });
          history.push("/posts/create");
        })
        .catch((err) => {
          console.log(err);
          setAlertPopupContext({
            message: err.response.data.message,
            type: "error",
          });
        });
    }
    // console.log(fullName, email, password);
    // history("/posts/create");
    // setAlertPopupContext({
    //   message: "Successfully logged in.",
    //   type: "success",
    // });
    // localStorage.setItem("auth_token", res.data.auth_token)
    // localStorage.setItem("exp", user.exp)
  };

  const handleToggleSignUp = () => {
    setSignUp(!signUp);
    setFullName("");
    setEmail("");
    setPassword("");
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className={classes.mainBox}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {!signUp ? "Log in" : "Sign Up"}
          </Typography>

          {signUp && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Full Name"
              name="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              size="small"
            />
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            value={email}
            label="Email Address"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            size="small"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            size="small"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={handleToggleSignUp}>
                {!signUp ? "Don't have an account? Sign Up" : "Back to Login"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
