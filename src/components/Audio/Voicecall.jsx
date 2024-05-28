import { useEffect, useState } from 'react'
import { RxAvatar } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Device } from 'twilio-client'

function Voicecall({ token, onClose }) {
	const [seconds, setSeconds] = useState(0)
	const [minutes, setMinutes] = useState(0)

	const [inProgress, setInprogress] = useState(false)
	const [hours, setHours] = useState(0)
	const [timer, setTimer] = useState(null)
	const [call, setCall] = useState(null)

	const navigate = useNavigate()

	const formatTime = (value) => {
		return value < 10 ? `0${value}` : value
	}
	let time = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(
		seconds
	)}`
	const endCall = () => {
		clearInterval(timer)
		const duration = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(
			seconds
		)}`

		Swal.fire({
			icon: 'success',
			title: 'Call Ended',
			text: ` Duration: ${duration}`,
			showCloseButton: true,
		})
		onClose()
		navigate('/agent/home')
	}
	useEffect(() => {
		const loadTwilioSdk = async () => {
			try {
				let twilioDevice = new Device(token);

				twilioDevice.on('ready', () => {
					const params = { To: '+923181669799' };

					let connection = twilioDevice.connect(params);
					console.log('Connection initiated:', connection);
					connection.on('accept', () => {
						setInprogress(true);
						console.log('Call is answered');
					});

					connection.on('disconnect', () => {
						console.log('Call is ended');
					});
					setCall(connection);
				});

				twilioDevice.on('disconnect', () => {
					console.log('Disconnected from Twilio');
				});

				twilioDevice.on('error', (error) => {
					console.error('Twilio Error:', error.message, error.code);
				});

				setTimer(
					setInterval(() => {
						setSeconds((prevSeconds) => prevSeconds + 1);
						// Increment minutes and hours accordingly
					}, 1000)
				);
			} catch (error) {
				console.error('Error initializing Twilio SDK:', error);
			}
		};

		loadTwilioSdk();

		return () => {
			clearInterval(timer);
		};
	}, [token]);

	return (
		<div className="voice-call-modal">
			<div className="voice-call-container">
				<RxAvatar
					style={{ marginRight: '10px', width: '200px', height: '200px' }}
				/>
				<h1>Name of Caller</h1>
				<h3>Time when the call started</h3>
				<div style={{ fontSize: '24px', marginBottom: '20px' }}>
					{inProgress && time}
				</div>
				<button
					style={{
						padding: '10px 20px',
						fontSize: '16px',
						backgroundColor: '#ff4747',
						color: '#fff',
						border: 'none',
						cursor: 'pointer',
						borderRadius: '5px',
					}}
					onClick={endCall}
				>
					End Call
				</button>
			</div>
		</div>
	)
}

export default Voicecall
