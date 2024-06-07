import axios from "axios";
import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_URL } from "../Apiurl";

function DeviceComponent() {
    const navigate = useNavigate();

const email=localStorage.getItem('rememberedEmail')
// const device_id = localStorage.getItem('device_id')
        const userToken = localStorage.getItem('user-token')
    const staticDeviceIds = ["Device1", "Three-phase", "Device3", "Device4"];
 
    const [device_name, setDevicename] = useState("");
    const [macAddress, setMacAddress] = useState("");

    const handleRegistration = async () => {
        if (!device_name || !macAddress) {
            Swal.fire({
                icon: 'error',
                title: 'Fields Required',
                text: 'Please Enter All Fields Are Required!',
                showCloseButton: true,
            });
            return;
        }

        try {
            const response = await axios.patch(
                `${API_URL}/api/sensors/update/device`,
                {
                    device_name,
                    macAddress,
                    email
                }
            );

            if (response.status === 200) {
                localStorage.setItem("device_id",macAddress)

                Swal.fire({
                    icon: 'success',
                    title: 'Connect Successful',
                    text: 'Connected Successfully!',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    navigate("/dashboard");
                });
                setDevicename("");
                setMacAddress("");
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

    const handleBack = () => {
        navigate('/login');
    };

    return (
        <div className="device-component">
            <div className="flex items-center justify-center min-h-full bg-gray-100">
                <div className="w-full max-w-lg p-10 bg-white rounded-lg shadow-lg" style={{ minHeight: '500px' }}>
                    <h1 className="text-2xl font-semibold text-center text-gray-700 mb-4">Smart Three Phase Meter</h1>
                    <div className="space-y-6 pt-8">
                        <div>
                            <select
                                className="w-full px-4 py-2 border border-gray-600 rounded-lg"
                                value={device_name}
                                onChange={(e) => setDevicename(e.target.value)}
                            >
                                <option value="" disabled>Select Device ID*</option>
                                {staticDeviceIds.map((id) => (
                                    <option key={id} value={id}>
                                        {id}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="MacAddress*"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-sky-500 focus:border-sky-500"
                                value={macAddress}
                                onChange={(e) => setMacAddress(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <button
                                className="w-full px-4 py-2 text-xl text-white bg-sky-600 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-500"
                                onClick={handleRegistration}
                            >
                                Connect
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

export default DeviceComponent;
