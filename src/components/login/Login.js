import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const Login = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); // Start loading

    // Minimum 1 second loading
    const loadTime = new Promise((resolve) => setTimeout(resolve, 1000));

    const validation = new Promise((resolve, reject) => {
      const user = users.find((user) => user.email === email);
      if (user) {
        if (user.password === password) {
          // Password validation
          resolve(true); // Validation successful
        } else {
          reject("Invalid email or password");
        }
      } else {
        reject("Invalid email or password");
      }
    });

    Promise.all([loadTime, validation])
      .then(([_, user]) => {
        // Save user info to sessionStorage
        sessionStorage.setItem('user', JSON.stringify(user));

        setLoading(false); // Stop loading
        navigate("/dashboard"); // Redirect to dashboard page
      })
      .catch((err) => {
        setError(err);
        setLoading(false); // Stop loading
      });
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box 
          className="p-5 shadow-blackShadow02 rounded-[10px] my-[50px] flex items-center"
          sx={{
            flexDirection: "column",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Sign In"}{" "}
              {/* Show loading spinner */}
            </Button>
            {error && <Typography className="text-center !mb-3" color="error">{error}</Typography>}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
