import { WindowSharp } from "@mui/icons-material";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";

const Register = () => {

  const [loading,setloading] = useState(false);

  const [formData,setData] = useState({
    username:"",
    password:"",
    confirmPassword:""
  });
 

  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();


  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function

   /*
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  
  const register = async (formData) => {
    
    // console.log(formData.target.value);
    setloading(true);
    if(validateInput(formData)){

    const body= {
      username:formData.username,
      password:formData.password
    }
    
   try{ 
    
    const res = await axios.post(config.endpoint+"/auth/register",body);
    if(res.status === 201){
      enqueueSnackbar("success",{variant:'success'})
      history.push("/login");
    }
    
        
  }
  catch(e){
    if(e.response.status === 400){
      enqueueSnackbar("Username is already taken",{variant:'error'})
    }
    else{
    enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.",{variant:'error'})
    }
    }
    
    setloading(false);
  }
  // console.log(response);
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  
  const validateInput = (data) => {
      //console.log("data"+data.username);
      const us = data.username;
      const pass = data.password;
      if(us.length === 0)
      {
         enqueueSnackbar("Username is a required field",{variant:"warning"});
          return false;
      }
      else if(us.length<6)
      {
           enqueueSnackbar("Username must be at least 6 characters",{variant:"warning"});
           return false;
      }
      else if(pass.length === 0)
      {
         enqueueSnackbar("Password is a required field",{variant:"warning"});
         return false;
      }
      else if(pass.length<6)
      {
         enqueueSnackbar("Password must be at least 6 characters",{variant:"warning"});
          return false;
      }
      else if(pass!=data.confirmPassword)
      {
         enqueueSnackbar("Passwords do not match",{variant:"warning"});
          return false; 
      }
      return true;
   
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            onChange={(e)=> setData({...formData,username:e.target.value})}
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
          />
          
          <TextField
            id="password"
            onChange={(e)=> setData({...formData,password:e.target.value})}
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
          />
          <TextField
            id="confirmPassword"
            onChange={(e)=> setData({...formData,confirmPassword:e.target.value})}
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
          />{loading?<Box display="flex" justifyContent="center" >
          <CircularProgress />
        </Box>:
           <Button className="button" onClick={()=>register(formData)} variant="contained">
            Register Now
           </Button>}
          <p className="secondary-action">
            Already have an account?{" "}
            
             <Link className="link" to="/login">
              Login here
             </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
