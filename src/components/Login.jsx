import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import '../App.css'
import { useNavigate } from 'react-router-dom';
function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [rememberMe, setRememberMe] = useState(false)
	const endPoint = process.env.REACT_APP_BASE_URL
	const navigate = useNavigate();
	const handleRememberMeChange = () => {
		setRememberMe(!rememberMe)
	}
	

	const handleSignUp = () => {
	  navigate('/user');
	};
	useEffect(() => {
		const userToken = localStorage.getItem('user-token')
		if (userToken) {
			window.location.href = '/Dashboard'
		}
     	const rememberedEmail = sessionStorage.getItem('rememberedEmail')
		const rememberedPassword = sessionStorage.getItem('rememberedPassword')

		if (rememberedEmail && rememberedPassword) {
			setEmail(rememberedEmail)
			setPassword(rememberedPassword)
			setRememberMe(true)
		}
	}, [])

	const handleLogin = async () => {
		if (!email || !password) {
			Swal.fire({
				icon: 'error',
				title: 'Fields Required',
				text: 'Both email and password are required!',
				showCloseButton: true,
			})
			return
		}

		try {
			const response = await axios.post(`http://${endPoint}:8000/core/login/`, {
				email,
				password,
			})

			if (response.status === 200) {
				const user = JSON.stringify(response.data.user_data)
				localStorage.setItem('user-token', response.data.token)
				localStorage.setItem('is_admin', response.data.user_data.is_admin)
				localStorage.setItem('User Role', response.data.user_data.role)
				localStorage.setItem('user', user)
				Swal.fire({
					icon: 'success',
					title: `Welcome ${response.data.user_data.name}`,
					text: 'You have successfully logged in',
					showCloseButton: true,
				})

				if (rememberMe) {
					sessionStorage.setItem('rememberedEmail', email)
					sessionStorage.setItem('rememberedPassword', password)
				}

				setTimeout(() => {
					window.location.href = '/Dashboard'
				}, 500)
			}
		} catch (error) {
			
			if (error.response && error.response.status === 401) {
				Swal.fire({
					icon: 'error',
					title: 'You are not authorized',
					text: error?.response?.data?.detail,
					showCloseButton: true,
				})
			} else if (error.response && error.response.status === 403) {
				Swal.fire({
					icon: 'error',
					title: 'Access DeniedForbidden',
					text: ` ${error?.response?.data?.detail}`,
					showCloseButton: true,
				})
			} else {
				Swal.fire({
					icon: 'error',
					title: 'An error occurred',
					text: error.response.data.detail,
					showCloseButton: true,
				})
			}
		}
	}
	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			handleLogin()
		}
	}
	return (
		<div className="login-wrapper">
			<div className="cover-container">
				<div className="App.login">
					<div className="login-container">
						<div className="login-icon-container ">
							<i className="fas fa-user-circle color-sky-600 fa-lg cursor-pointer rounded-full h-16 w-16 cursor-pointer"></i>

							<h2 className="login">Login</h2>
						</div>
						<div className="input-fields">
							<div className="input-container">
								<i className="fas fa-user "></i>
								<input
									className="user px-4 rounded-md"
									type="text"
									id="username"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Username"
								/>
							</div>

							<br />
							<div className="input-container">
								<input
									className="pass px-4 rounded-md"
									type={showPassword ? 'text' : 'password'}
									id="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="Password"
									onKeyDown={handleKeyDown}
								/>
								<i
									className={`toggle-password fas ${
										showPassword ? 'fa-eye-slash' : 'fa-eye'
									}`}
									onClick={() => setShowPassword(!showPassword)}
								></i>
							</div>
							<div className="text-start pt-10 flex items-center pb-2">
								<input
									className="w-7 h-4 m-0"
									type="checkbox"
									checked={rememberMe}
									onChange={handleRememberMeChange}
								/>
								<label for="RememberMe">Remember Me</label>
							</div>

							<button
								className="bg-sky-600 scale-100 active:scale-90 focus:scale-90 focus:bg-blue-500 text-white text-xl font-medium mb-2"
								onKeyDown={handleKeyDown}
								onClick={() => handleLogin()}
							>
								Login
							</button>
							<div className="w-4"></div>
							<Link to="/password-reset-request">Forgot Password?</Link>
							
						</div>
						<Link to="/user">Sign Up</Link>

					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
