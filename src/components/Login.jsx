import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loader, setLoader] = useState(false)
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true)
      let response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        email,
        password
      })

      if (response.data.success) {
        localStorage.setItem("token", response.data.token)
        setLoader(false)
        navigate("/sign-pdf")
      }
      else {
        console.log(response.data)
        setLoader(false)
      }
    } catch (error) {
      console.log(error)
      setLoader(false)
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="flex items-center justify-center min-h-screen w-full sm:w-[400px] !p-4">
      <Paper
        elevation={6}
        className="p-6 w-full max-w-md rounded-2xl shadow-lg transition-transform transform bg-white"
      >
        <Typography variant="h5" className="text-center !mb-2 !font-bold text-gray-800">
          Welcome Back
        </Typography>
        <Typography variant="body2" className="text-center !mb-6 text-gray-500">
          Please log in to continue
        </Typography>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            loading={loader}
            disabled={loader}
            className="!mt-2 !py-3 tracking-wide text-white hover:shadow-md transition-all duration-300"
          >
            Login
          </Button>
        </form>

        <Typography variant="body2" className="text-center !mt-6 text-gray-600">
          Don&apos;t have an account?{' '}
          <Link to="/auth/register" className="text-indigo-600 hover:underline font-medium underline-offset-4">
            Register
          </Link>
        </Typography>
      </Paper>
    </div>
  );
};

export default Login;