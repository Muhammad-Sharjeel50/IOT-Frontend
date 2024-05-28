import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../App.css'; // You can remove this line if not needed
import './resetpassword.css'; // You can remove this line if not needed

function PasswordReset() {
    const endPoint = process.env.REACT_APP_BASE_URL;
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleReset = async () => {
        if (!password || !confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Input',
                text: 'All Fields Are Required!',
                showCloseButton: true,
            });
            return;
        } else if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Passwords do not match',
                text: 'Please re-check both passwords.',
                showCloseButton: true,
            });
            return;
        } else if (password.length < 8 || !password.match(/[!@#%^&*]/)) {
            Swal.fire({
                icon: 'error',
                title: 'Incorrect Password',
                text: 'Password must be at least 8 characters long and contain at least one capital letter and one special character.',
                showCloseButton: true,
            });
            return;
        }

        try {
            const response = await axios.post(
                `http://${endPoint}:8000/core/password/reset/`,
                {
                    token,
                    password: password,
                }
            );

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Password reset successfully.',
                    text: response.data.message,
                    showCloseButton: true,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'An error occurred during password reset.',
                showCloseButton: true,
            });
        }
    };

    useEffect(() => {
        const queryparam = new URLSearchParams(window.location.search);
        const gettoken = queryparam.get('token');
        if (gettoken) {
            setToken(gettoken);
        }
    }, []);

    return (
        <div className="flex justify-center items-center h-screen bg-white">
<div className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Password Reset</h2>
                    <p >Enter your new password.</p>
                </div>
                <input
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none focus:border-blue-500"
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none focus:border-blue-500"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                    className="w-full bg-sky-600 text-white rounded-md px-4 py-2 font-semibold hover:bg-sky-500"
                    onClick={handleReset}
                >
                    Reset Password
                </button>
                <div className="text-center mt-4">
                    <Link to="/login" className="text-blue-500 hover:underline">Back to Login</Link>
                </div>
            </div>
        </div>
    );
}

export default PasswordReset;
