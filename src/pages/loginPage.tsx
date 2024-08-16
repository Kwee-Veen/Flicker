import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { Button, Typography } from "@mui/material";

const LoginPage = () => {
  const authContext = useContext(AuthContext);
  const { authenticate } = authContext || {};

  const login = () => {
    const password = Math.random().toString(36).substring(7);
    authenticate && authenticate('user1', password);
  };

  return (
    <>
      <Typography variant="h4">Login</Typography>
      <br></br>
      <Typography>Please log in to access favourites and must-watch lists.</Typography>
      <br></br>
      {/* Login web form  */}
      <Button onClick={login} variant="contained" color="error">Submit</Button>
    </>
    )
};

export default LoginPage;
