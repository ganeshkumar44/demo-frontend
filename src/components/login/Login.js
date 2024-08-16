import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/action/userSlice";
import { useNavigate } from 'react-router-dom';
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
} from "@mui/material";
import axios from 'axios'; 

const Login = () => {
  // const dispatch = useDispatch();
  // const { status, error } = useSelector((state) => state.user);

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   dispatch(login({ email, password }));
  // };


  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const user = users.find(user => user.email === email);
    if (user) {
      if (user.password === password) { // Password validation
        navigate('/dashboard');  // Redirect to dashboard page
      } else {
        setError("Invalid email or password");
      }
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box 
          component="form" 
          onSubmit={handleSubmit}
          noValidate sx={{ mt: 1 }
          }>
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
              // disabled={status === "loading"}
            >
              Sign In
            </Button>
            {error && <Typography color="error">{error}</Typography>}
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


      {/* <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <p>Name: {user.firstname} {user.lastname}</p>
            <p>Email: {user.email}</p>
            <p>Contact: {user.contact}</p>
            <p>Date of Birth: {new Date(user.dateofbirth).toLocaleDateString()}</p>
            <p>Created At: {new Date(user.createdAt).toLocaleString()}</p>
            <p>Updated At: {new Date(user.updatedAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div> */}
    </>
  );
};

export default Login;
