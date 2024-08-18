import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { Box, Grid, Typography } from "@mui/material";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { AuthToken } from "../types/interfaces";

const LoginPage = () => {
  const authContext = useContext(AuthContext);
  const { authenticate } = authContext || {};

  const login = (res: string | undefined) => {
    if (res) 
    {
      const decoded: AuthToken = jwtDecode(res);
      console.log(`Google OAuth login: hi ${decoded?.given_name}`);
      authenticate && authenticate(decoded);
    }
    else console.log("Error, no auth token set, no credentialResponse from GoogleLogin");
  };

  return (
    <>
      <Grid container direction="row" justifyContent="center" sx={{ textAlign: "center" }}>
        <Box component="section" sx={{ p: 2, border: '1px dashed orange' }} width={250}>
          <Typography variant="h4" justifyContent="center">Login</Typography>
          <br></br>
          <Typography>Please log in to access favourites and must-watch lists.</Typography>
          <br></br>
          <GoogleOAuthProvider
            clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
            <GoogleLogin
              onSuccess={credentialResponse => {
                login(credentialResponse.credential);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </GoogleOAuthProvider>
        </Box>
      </Grid>
    </>
    )
};

export default LoginPage;
