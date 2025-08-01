import React, { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

// accept onLogin prop from App.jsx
export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/admin/login",
        data,
        { withCredentials: true }
      );
      
      login({
        user: response.data.data.user,
        accessToken: response.data.data.accessToken
      })
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
      // show message from server or fallback
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Invalid credentials";
      setErrorMessage(msg);

      // clear after a bit
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-200">
      <Card color="transparent" shadow={false} className="w-80 max-w-full">
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to login.
        </Typography>

        <form className="mt-8 mb-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-2">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              {...register("email", { required: "Email is required." })}
            />
            {errors.email && (
              <Typography color="red" variant="small">
                {errors.email.message}
              </Typography>
            )}

            <Typography variant="h6" color="blue-gray" className="-mb-2">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              {...register("password", {
                required: "Password is required.",
              })}
            />
            {errors.password && (
              <Typography color="red" variant="small">
                {errors.password.message}
              </Typography>
            )}
          </div>

          

          <Button className="mt-6" fullWidth type="submit">
            Login
          </Button>

          {errorMessage && (
            <Typography color="red" className="mt-4 text-center">
              {errorMessage}
            </Typography>
          )}

          
        </form>
      </Card>
    </div>
  );
}
