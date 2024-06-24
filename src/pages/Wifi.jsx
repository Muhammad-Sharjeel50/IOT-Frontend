import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import './passwordreset.css';
import Swal from 'sweetalert2';

function Wifi() {
	const endPoint = process.env.REACT_APP_BASE_URL;
	
	const [email, setEmail] = useState('');
	const [wifiList, setWifiList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedNetwork, setSelectedNetwork] = useState(null);
	const [password, setPassword] = useState('');
	const [ssid, setUserId] = useState('');

	// useEffect(() => {
	//     const fetchWifiNetworks = async () => {
	//         try {
	//             // Simulate loading for 2 seconds (replace with actual API call)
	//             setTimeout(() => {
	//                 const mockWifiList = [
	//                     { ssid: 'Network_1', signalStrength: 'Strong' },
	//                     { ssid: 'Network_2', signalStrength: 'Weak' },
	//                     { ssid: 'Network_3', signalStrength: 'Moderate' },
	//                 ];
	//                 setWifiList(mockWifiList);
	//                 setLoading(false); // Turn off loading after mock data is fetched
	//             }, 2000);
	//         } catch (error) {
	//             console.error('Error fetching Wi-Fi networks:', error);
	//             setLoading(false); // Turn off loading in case of error
	//         }
	//     };

	//     fetchWifiNetworks();
	// }, []);

	const handleNetworkChange = (event) => {
		const ssid = event.target.value;
		const network = wifiList.find((network) => network.ssid === ssid);
		setSelectedNetwork(network);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleUserIdChange = (event) => {
		setUserId(event.target.value);
	};
	const handleSubmit = async () => {
		if (!password || !ssid) {

			Swal.fire('Error', 'Please fill in all fields', 'error');
			return;
		}
		console.log("--------------", password)
		console.log("----------------", ssid)
		try {
			console.log('Request Data:', { ssid, password });
			const response = await fetch('http://192.168.177.200:5000/api/sensors/set-wifi-connection', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					ssid: ssid,
					password: password
				}),
			});
			console.log("----------------", response)

			if (response.ok) {
				const data = await response.json();
				console.log("Response data:", data);
				Swal.fire('Success', 'Wi-Fi connection set successfully', 'success');
				// navigate('/some-route'); // navigate to some route on success
			} else {
				const errorData = await response.json();
				console.error('Error response:', errorData);
				Swal.fire('Error', 'Failed to set Wi-Fi connection', 'error');
			}
		} catch (error) {
			console.error('Error setting Wi-Fi connection:', error);
			Swal.fire('Error', 'An error occurred while setting Wi-Fi connection', 'error');
		}
	};

	return (
		<div className="box">
			<div className="back">
				<div className="password-reset">
					<h2 className='text-2xl font-bold mb-4'>Available Wi-Fi Networks</h2>
					{/* {loading ? (
                        <div className="loader-container">
                            <div className="loader"></div>
                        </div>
                    ) : (
                        // <div>
                        //     <select
                        //         className="network-dropdown mb-4 p-2 border rounded"
                        //         onChange={handleNetworkChange}
                        //         defaultValue=""
                        //     >
                        //         <option value="" disabled>Select a network</option>
                        //         {wifiList.map((network, index) => (
                        //             <option key={index} value={network.ssid}>
                        //                 {network.ssid}
                        //             </option>
                        //         ))}
                        //     </select>
                        // </div>
                    )} */}
					{/* {selectedNetwork && ( */}
					<div className="network-details">
						{/* <h3 className='text-xl font-bold mb-4'>Connect to {selectedNetwork.ssid}</h3> */}
						{/* <input
                                type="text"
                                className="mb-4 p-2 border rounded"
                                value={selectedNetwork.ssid}
                                readOnly
                            /> */}
						<br />
						<input
							type="text"
							className="mb-4 p-2 border rounded"
							placeholder="Enter User ID"
							value={ssid}
							onChange={handleUserIdChange}
						/>
						<br />
						<input
							type="number"
							className="mb-4 p-2 border rounded"
							placeholder="Enter Password"
							value={password}
							onChange={handlePasswordChange}
						/>
						<br />
						<button className="p-2 bg-blue-500 text-white rounded" onClick={handleSubmit}>Connect</button>
					</div>
					{/* )} */}
					<br />
				</div>
			</div>
		</div>
	);
}

export default Wifi;
