import {
  AccountCircleOutlined,
  AssignmentInd,
  ExitToApp,
} from "@mui/icons-material";
import {
  AppBar,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRef, useState } from "react";

const styles = makeStyles({
  default: {
    userSelect: "none",
    backgroundColor: "#1A3954",

    // "@media (max-width: 799px)": {
    //   display: "none",
    // },
  },
  logo: {
    height: "3rem",
    width: "10rem",

    cursor: "pointer",
    color: "red",
  },
  typography: {
    verticalAlign: "middle",
    marginTop: "0px",
    color: "white",
    display: "inline",
    padding: "15px",
    fontSize: "1rem",
    cursor: "pointer",
    "&:hover": {
      color: "#E4F3F9",
    },
    "@media (max-width: 860px)": {
      fontWeight: "lighter",
    },
  },
  toolbar: {
    minHeight: 60,
  },
  rightSection: {
    marginLeft: "auto",
    display: "flex",
  },
  btndiv: {
    display: "inline",
    padding: "4px",
  },
  formControl: {
    minWidth: 150,
  },
  department: {
    color: "#1a3954",
    fontWeight: "900",
    fontSize: "large",
  },
  menuPaper: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
});

export default function Navbar(props) {
  const classes = styles();
  const anchorRef = useRef(null);
  const [option, setOption] = useState(false);

  const handleToggle = () => {
    setOption((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOption(false);
  };

  const handleLogout = (e) => {
    localStorage.clear();
    window.location.reload();
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOption(false);
    }
  }

  return (
    <>
      <AppBar
        elevation={0}
        position="sticky"
        className={classes.default}
        sx={{ backgroundColor: "#1a3954" }}
      >
        <div className={classes.contents}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.rightSection}>
              <div className={classes.btndiv}>
                <div style={{ color: "white" }}>
                  <AccountCircleOutlined
                    fontSize="large"
                    ref={anchorRef}
                    onClick={handleToggle}
                    style={{ cursor: "pointer" }}
                  />
                  <Popper
                    open={option}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom"
                              ? "center top"
                              : "center bottom",
                        }}
                      >
                        <Paper variant="elevation" elevation={1}>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                              autoFocusItem={option}
                              id="menu-list-grow"
                              onKeyDown={handleListKeyDown}
                              style={{ zIndex: 10 }}
                            >
                              <MenuItem
                                style={{
                                  backgroundColor: "#1a3954",
                                }}
                              >
                                <AssignmentInd
                                  style={{
                                    color: "white",
                                    // padding: "0.5rem",
                                    margin: "0.7rem 0.3rem 0 0",
                                  }}
                                />
                                <Typography
                                  style={{
                                    backgroundColor: "#1a3954",
                                    color: "white",
                                    padding: "1rem 0 0 0",
                                    textAlign: "center",
                                  }}
                                >
                                  Hello User
                                </Typography>
                              </MenuItem>

                              <MenuItem onClick={handleLogout}>
                                <ExitToApp
                                  style={{
                                    color: "#1a3954",
                                    marginRight: "2px",
                                    padding: "0 2px",
                                  }}
                                />{" "}
                                <Typography
                                  style={{
                                    color: "#1a3954",
                                    padding: "0 2px",
                                  }}
                                >
                                  Logout
                                </Typography>
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </div>
              </div>
            </div>
          </Toolbar>
        </div>
      </AppBar>
      <div>{props.children}</div>
    </>
  );
}
