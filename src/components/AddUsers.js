import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./PasswordReset/reg.css";
import { API_URL } from "../Apiurl";

function AddUsers() {
  const endPoint = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem('user-token')

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegistration = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Fields Required',
        text: 'Please Enter All Fields Are Required!',
        showCloseButton: true,
      });
      return;
    } else if (!username.match(/^[a-zA-Z\s]+$/)) {
      Swal.fire({
        icon: 'error',
        title: 'Username is not valid',
        text: 'Username must be an Alphabet',
        showCloseButton: true,
      });
      return;
    } else if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Email is not valid',
        text: 'Email must include @ and domain name',
        showCloseButton: true,
      });
      return;
    } else if (password.length < 8 || !password.match(/[!@#%^&*]/)) {
      Swal.fire({
        icon: 'error',
        title: 'Password is not valid',
        text: 'Password must be at least 8 characters long. Must contain 1 capital letter and 1 special character!',
        showCloseButton: true,
      });
      return;
    } else if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Passwords do not match',
        text: 'Please ensure that password and confirm password match.',
        showCloseButton: true,
      });
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/users/register`,
        {
          username,
          email,
          password,
        }
      );

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'User Added Successfully!',
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          navigate("/login");
        });
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: response.error,
          showCloseButton: true,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'An error occurred during registration',
        text: error.message,
        showCloseButton: true,
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRegistration();
    }
  };

  const handleBack = () => {
    navigate('/login');
  };
  
  return (
    <div className="device-component">
      <div className="flex items-center justify-center min-h-full bg-gray-100">
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg" style={{ minHeight: '650px' }}>
          <h1 className="text-2xl font-semibold text-center text-gray-700 mb-4">Registration</h1>
          <div className="space-y-4 pt-8">
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Name*"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Email*"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Password*"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
            <div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Confirm Password*"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <button
                className="w-full px-4 py-2 text-xl text-white bg-sky-600 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-500"
                onKeyDown={handleKeyDown}
                onClick={handleRegistration}
              >
                Register
              </button>
              <button
                className="w-full px-4 py-2 text-xl text-black bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring"
                onClick={handleBack}
              >
                Back To Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUsers;
