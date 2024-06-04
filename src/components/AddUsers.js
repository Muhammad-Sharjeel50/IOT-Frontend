import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./PasswordReset/reg.css";

function AddUsers() {

  const endPoint = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem('user-token')
  const[deviceid,setDeviceid]=useState(null)
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const isActive = true;
  const picture = null
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("")
  const [roles, setRoles] = useState([])
  const departments = ["Sales", "Technical", "Marketing", "Finance"];
  const navigate = useNavigate();


  const handleRegistration = async () => {

    if (!deviceid ||!name ||!email ||  !password ) {
      Swal.fire({
        icon: 'error',
        title: 'Fields Required',
        text: 'Please Enter All Fields Are Required!',
        showCloseButton: true,
      });
      return;
    } else if (!name.match(/^[a-zA-Z\s]+$/)) {
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
    } else if (
      !phone_number.match(
        /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/
      )
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Phonenumber is not valid',
        text: 'Phone Number must be 11 digits long (03451234567 )',
        showCloseButton: true,
      });

      return;
    } else if (password.length < 8 && !password.match(/[!@#%^&*]/)) {
      Swal.fire({
        icon: 'error',
        title: 'Password is not valid',
        text: 'Password must be at least 8 characters long. Must contains 1 Capital Albhabet and 1 Special Chracter!',
        showCloseButton: true,
      });

      return;
    }

    try {
      const response = await axios.post(
        `http://${endPoint}:8000/core/register/`,
        {
          deviceid,
          name,
          email,
          password,
        }
      );

      if (response.status === 200) {


        Swal.fire({

          icon: 'success',
          title: 'Registration Successful',
          text: 'User Added Successfully!',
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          navigate("/home");
        })
        setname("");
        setEmail("");
        setPhone_number("");
        setDepartment("");
        setPassword("");
        setRole("")
      } else {
        Swal.fire({

          icon: 'error',
          title: 'Registration Failed',
          text: response.error,
          showCloseButton: true,

        })

      }
    } catch (error) {
      Swal.fire({

        icon: 'error',
        title: 'An error occurred during registration',
        text: error,
        showCloseButton: true,
      })
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/core/roles', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.status === 200) {
          setRoles(response.data)
        }
      } catch (error) {
        Swal.fire({

          icon: 'error',
          title: 'Error fetching user',
          text: error,
          showCloseButton: true,
        })

      }
    }

    fetchData()
  }, [token])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRegistration();
    }
  };

  const handleBack = ()=>{
   navigate('/home')

  }
  return (
    <div className="borderapp">
      <div className="flex w-full bg-gray-100 h-full rounded-lg items-center py-2">
        <div className="w-1/3 mx-auto bg-white flex-col py-4 px-10 min-h-full rounded-xl justify-center text-center border shadow-xl">
          <div className="py-2">
            <h1 className=" text-gray-700 text-xl pb-6">Add New User</h1>
          </div>
          <div className="input-container py-1">
            <input
              type="text"
              value={deviceid}
              onChange={(e) => setDeviceid(e.target.value)}
              onKeyDown={handleKeyDown}

              placeholder="DeviceId*"
              className="w-full mx-auto px-4 border-1 border-gray-400 text-gray-900 bg-gray-100 placeholder:text-slate-400"
            />
          </div>
          <div className="input-container py-1">
            <input
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              onKeyDown={handleKeyDown}

              placeholder="Name*"
              className="w-full mx-auto px-4 border-1 border-gray-400 text-gray-900 bg-gray-100 placeholder:text-slate-400"
            />
          </div>

          <div className="input-container py-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}

              placeholder="Email* "
              className="w-full mx-auto px-4 border-1 border-gray-400 text-gray-900 bg-gray-100 placeholder:text-slate-400"
            />
          </div>
          <div className="input-container pt-2">
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Password*"
              className="w-full mx-auto px-4 border-1 border-gray-400 text-gray-900 bg-gray-100 placeholder:text-slate-400"
            />
          </div>
         
          <div className="grid gap-2 ">
            <button
            className="bg-sky-600 mx-auto mt-4 rounded-xl scale-100 active:scale-90 cursor-pointer px-8 py-2 active:bg-blue-500 focus:bg-blue-700 focus:ring text-white text-xl font-medium"
            onKeyDown={handleKeyDown}
            onClick={handleRegistration}

          >
            Add User
          </button>
          <button className="bg-white-600 shadow-lg border flex-shrink  mx-auto mt-4 rounded-xl scale-100 active:scale-90 cursor-pointer px-4 py-2 active:bg-sky-500 focus:bg-blue-700 focus:ring text-black text-xl font-medium" onClick={handleBack}>
            Back To Home
          </button>
          </div>
          

        </div>
      </div>
    </div>
  );
}

export default AddUsers;
