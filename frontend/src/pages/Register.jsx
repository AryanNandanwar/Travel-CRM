import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import axios from "axios"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

   
  export function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async (data) => {
      try {
        const response = await axios.post("http://localhost:8000/api/v1/admin/register", 
          data, 
          { withCredentials: true });
        console.log("Success:", response.data);
        navigate("/login");
      } catch (error) {
        console.error(
          "Register error:",
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
      <div className="flex justify-center items-center h-screen w-screen min-h-screen bg-gray-200">
       <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              size="lg"
              placeholder="name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("fullName", { required: true })}
            />
            {errors.fullName && <p>Name is required.</p>}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("email", { required: true })}
            />
            {errors.email && <p>Email is required.</p>}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Contact Number
            </Typography>
            <Input
              size="lg"
              placeholder="contact"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("ContactNo", { required: true })}
            />
            {errors.contactNo && <p>Contact number is required.</p>}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("password")}
            />
          </div>
          
          <Button className="mt-6" fullWidth type={"submit"}>
            sign up
          </Button>

          {errorMessage && (
            <Typography color="red" className="mt-4 text-center">
              {errorMessage}
            </Typography>
          )}


          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-gray-900">
              Login
            </Link>
          </Typography>
        </form>
      </Card>
      </div>
    );
  }