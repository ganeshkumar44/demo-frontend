import React, { useState } from "react";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailDisabled, setEmailDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [codeSent, setCodeSent] = useState(false);

//   const generateCode = () => {
//     return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit code
//   };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/users/");
      const users = await response.json();

      const userExists = users.some((user) => user.email === email);

      if (userExists) {
        setEmailDisabled(true);
      } else {
        setError("Email not found");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }

    setLoading(false);
  };

  const handleSendCode = async () => {
    setLoading(true);
    setError("");

    try {
      // Send the request to your API to generate and send the code
      const response = await fetch("http://localhost:5000/api/users/send-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update the user data in the API with the new code and expiration time
        const expirationTime = new Date(Date.now() + 10 * 60000).toISOString(); // Set expiration time to 10 minutes from now
        await fetch(`http://localhost:5000/api/users/email/${email}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            forgetPasswordCode: data.code,
            forgetPasswordCodeExpires: expirationTime,
          }),
        });

        setCodeSent(true); // Hide the "Send Code" button
      } else {
        setError(data.message || "Failed to send the code. Please try again.");
      }
    } catch (err) {
      setError("Failed to send the code. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          className="p-5 w-[100%] max-w-[400px] shadow-blackShadow02 rounded-[10px] my-[50px] flex items-center"
          sx={{
            flexDirection: "column",
          }}
        >
          <Typography component="h1" variant="h5">
            Forget Password
          </Typography>
          <Box className="w-[100%]" component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={emailDisabled}
            />
            {!emailDisabled ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Search"}
              </Button>
            ) : !codeSent ? (
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSendCode}
              >
                Send Code
              </Button>
            ) : (
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => alert("Proceed to the next step")}
              >
                Next
              </Button>
            )}
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Grid container>
              <Grid item xs>
                <Link
                  className="text-font15 text-blue"
                  to="/login"
                  variant="body2"
                >
                  Cancel
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ForgetPassword;
