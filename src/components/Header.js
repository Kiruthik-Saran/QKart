import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Search, SentimentDissatisfied } from "@mui/icons-material";
// eslint-disable-next-line
import {
  Avatar,
  Button,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useHistory, Link } from "react-router-dom";
import "./Header.css";
import { setConstantValue } from "typescript";

const Header = ({ children, hasHiddenAuthButtons }) => {
  const history = useHistory();
  const log = localStorage.getItem("username");

  return (
    <Box className="header">
      <Box className="header-title">
        <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>
      <div>
        {children}
      </div>
      {hasHiddenAuthButtons ? (
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => history.push("/")}
        >
          Back to explore
        </Button>
      ) : (
        <div>
          {log !== null ? (
            <Stack direction="row">
              <img src="avatar.png" alt={log} />
              <h4>{log}</h4>
              <Button
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                  //   window.location.reload();
                }}
              >
                Logout
              </Button>
            </Stack>
          ) : (
            <Stack direction="row" spacing={2}>
              <Button onClick={() => history.push("/login")}>Login</Button>
              <Button
                variant="contained"
                onClick={() => history.push("/register")}
              >
                Register
              </Button>
            </Stack>
          )}
        </div>
      )}
    </Box>
  );
};

export default Header;
