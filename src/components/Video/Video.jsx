import React, { useEffect, useState } from 'react'
import { AiOutlineAudio, AiOutlineAudioMuted } from 'react-icons/ai'
import { BiSolidMobileVibration } from 'react-icons/bi'
import { FiCamera, FiCameraOff } from 'react-icons/fi'

export default function VideoCallText() {
	const [callDuration, setCallDuration] = useState(0)
	const [timerId, setTimerId] = useState(null)
	const [isMuted, setIsMuted] = useState(false)
	const [isCameraOn, setIsCameraOn] = useState(true)

	
	const updateCallDuration = () => {
		console.log('Updating call duration...')
		const callStartTime = window.opener && window.opener.callStartTime
		if (callStartTime) {
			const endTime = Date.now()
			const durationInSeconds = Math.floor((endTime - callStartTime) / 1000)
			setCallDuration(durationInSeconds)
		}
	}


	const startTimer = () => {
		const id = setInterval(updateCallDuration, 1000)
		setTimerId(id)
	}

	useEffect(() => {
		
		const queryParams = new URLSearchParams(window.location.search)
		const isMutedParam = queryParams.get('isMuted')
		const isCameraOnParam = queryParams.get('isCameraOn')
		setIsMuted(isMutedParam === 'true')
		setIsCameraOn(isCameraOnParam === 'true')
		startTimer()
	}, [])
	const toggleMute = () => {
		setIsMuted(!isMuted)
	}
	const toggleCamera = () => {
		setIsCameraOn((prevCameraState) => !prevCameraState)
	}
	const handleEndCall = () => {
		
		if (timerId) {
			clearInterval(timerId)
		}
		window.close()
	}

	return (
		<div className="overlay">
			<p>Video Call in Progress</p>
			<BiSolidMobileVibration
				size="2em"
				color="brown"
				style={{ marginLeft: '10px', marginBottom: '20px' }}
			/>
			{isMuted ? (
				<AiOutlineAudioMuted
					size="2em"
					color="brown"
					style={{ marginLeft: '10px' }}
					onClick={toggleMute}
				/>
			) : (
				<AiOutlineAudio
					size="2em"
					color="brown"
					style={{ marginLeft: '10px' }}
					onClick={toggleMute}
				/>
			)}
			{isCameraOn ? (
				<FiCamera
					size="2em"
					color="brown"
					style={{ marginLeft: '10px' }}
					onClick={toggleCamera}
				/>
			) : (
				<FiCameraOff
					size="2em"
					color="brown"
					style={{ marginLeft: '10px' }}
					onClick={toggleCamera}
				/>
			)}
			<p>Call Duration: {callDuration} seconds</p>
			<button onClick={handleEndCall} className="end-call-button">
				End Call
			</button>
		</div>
	)
}
