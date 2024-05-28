import axios from 'axios'
import { useEffect, useState } from 'react'
import { FiMic, FiMicOff, FiVideo, FiVideoOff } from 'react-icons/fi'
import { PiPhoneDisconnect } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Twilio from 'twilio-video'
 
const VideoCall = () => {
    const endPoint = process.env.REACT_APP_BASE_URL
    const [roomName, setRoomName] = useState('newRoom')
    const [isMicMuted, setIsMicMuted] = useState(false)
    const [isVideoOff, setIsVideoOff] = useState(false)
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const container = document.getElementById('video-container')
 
    let room
 
    const getRoomNameFromUrl = () => {
        const searchParams = new URLSearchParams(window.location.search)
        return searchParams.get('roomname')
    }
    const getTokenFromUrl = () => {
        const searchParams = new URLSearchParams(window.location.search)
        return searchParams.get('token')
    }
    const handleConnectedParticipant = (participant) => {
        const participantDiv = document.createElement('div')
        participantDiv.setAttribute('id', participant.identity)
         participantDiv.classList.add('videoBox')
         container.innerHTML = ""
        container.appendChild(participantDiv)
 
        participant.tracks.forEach((trackPublication) => {
            handleTrackPublication(trackPublication, participant)
        })
        participant?.on('trackPublished', handleTrackPublication)
    }
    const startRoom = async () => {
        const urlRoomName = getRoomNameFromUrl()
        setRoomName(urlRoomName || user.email)
        const token = getTokenFromUrl()
        try {
            room = await joinVideoRoom(
                { room: roomName, video: true, audio: true },
                token
            )
            room?.on(
                'participantConnected',
                handleConnectedParticipant(room.localParticipant)
            )
            room?.on(
                'participantDisconnected',
                handleDisconnectedParticipant(room.localParticipant)
            )
 
            window.addEventListener('pagehide', handleEndCall)
            window.addEventListener('beforeunload', handleEndCall)
 
            if (room.participants.size > 1) {
                // Disconnect the participant if more than 2 participants
                room.disconnect()
                Swal.fire({
                    icon: 'error',
                    title: 'Room is full',
                    text: 'The video call can only have two participants.',
                    showCloseButton: true,
                })
                navigate('/agent/home')
            }
        } catch (error) {
         console.error(error)
        }
    }
 
    const handleTrackPublication = (trackPublication, participant) => {
        function displayTrack(track) {
            const participantDiv = document.getElementById(participant?.identity)
            console.log(
                'Track Publication participant identity',
                participant?.identity
            )
             if (participantDiv) {
                const trackElement = track.attach()
                participantDiv.appendChild(trackElement)
                console.log('trackElement', trackElement)
                trackElement.style.width = '60%'
                trackElement.style.height = '100%'
            } else {
                console.error(
                    'Participant div not found for identity:',
                    participant?.identity
                )
            }
        }
		
        if (trackPublication.track) {
            if (!trackPublication.track.isEnabled) {
                trackPublication.track.detach().forEach((element) => element.remove())
            } else {
                displayTrack(trackPublication.track)
            }
        }
        trackPublication?.on('subscribed', displayTrack)
    }
    const handleDisconnectedParticipant = (participant) => {
        if (participant) {
            participant.removeAllListeners()
            const participantDiv = document.getElementById(participant?.identity)
            if (participantDiv) {
                participantDiv.remove()
            }
        }
    }
 
    const joinVideoRoom = async (roomName, token) => {
        const videoRoom = await Twilio.connect(token, {
            room: roomName,
        })
        return videoRoom
    }
 
    const handleEndCall = () => {
        console.log('Handling end call...')
        if (room) {
            room.disconnect()
            navigate('/agent/home')
        } else {
        }
    }
 
const toggleVideo = async () => {
    if (room) {
        const localParticipant = room.localParticipant
        const videoTracks = Array.from(localParticipant.videoTracks.values())
        for (const videoTrackPublication of videoTracks) {
            const track = videoTrackPublication.track
            // if (track){
                // try {
                    if (track.isEnabled) {
                        track.disable()
                        console.log("===========true",isVideoOff)
                        setIsVideoOff(true);
                         console.log("===========true",isVideoOff)
                    } else {
                        const newTrack = await Twilio.createLocalVideoTrack()
                         
                         await localParticipant.publishTrack(newTrack)
                          const trackElement = newTrack.attach()
                        if (container) {
                            container.innerHTML = '' // Remove existing video elements
                             container.appendChild(trackElement)
                             trackElement.style.width = '60%'
                             trackElement.style.height = '100%'
                        }
                        console.log("===========false",isVideoOff)
                        setIsVideoOff(false);
                    }
                // } catch (error) {
                //     console.error('Error toggling video:', error)
                // }
            // }
        }
    }
}

const toggleMic = () => {
    if (room && room.localParticipant) {
        const localParticipant = room.localParticipant;
        const audioTracks = Array.from(localParticipant.audioTracks.values());
        audioTracks.forEach((audioTrackPublication) => {
            const track = audioTrackPublication.track;
            if (track.isEnabled) {
                // Mute the microphone
                localParticipant.media?.mute();
				if(localParticipant.media?.mute())
                // track.disable();
                setIsMicMuted(true);
                console.log("----------->mictrue",isMicMuted)
            } else {
                // Unmute the microphone
                localParticipant.media?.unmute();
                // track.enable();
				if(localParticipant.media?.unmute())
					{
						setIsMicMuted(false);
                        console.log("----------?????????micfalse",isMicMuted)

					}
            }
        });
    }
};
    const generateShareableLink = async () => {
        try {
            const response = await axios.get(
                `http://${endPoint}:8000/core/twilio_video_access_token?user_identity=${user.name}&room_name=${roomName}`
            )
            const { token } = response.data
            const shareableLink = `${window.location.origin}/join?token=${token}&room_name=${roomName}`
            Swal.fire({
                icon: 'success',
                title: 'Shareable Link Successfull',
                text: 'You have sent successfully Shareable Link!',
                showCloseButton: true,
            })
            console.log('Shareable Link:', shareableLink)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        if (user) {
            startRoom()
        }
 
        return () => {
            if (room) {
                // Swal.fire({
                //   icon: 'success',
                //   title: 'End Call Successful',
                //   text: 'You have successfully End Call!',
                //   showCloseButton: true,
                // });
                room.disconnect()
            }
        }
    }, [user])
 
    useEffect(() => {
        if (isVideoOff) {
            console.log('Video is currently off.')
        }
    }, [])
    return (
        <div className="h-screen">
            <div className="h-[10%] bg-sky-800 text-white text-center text-xl font-semibold py-2 font-mono ">
                Video Call in progress with
            </div>
            <div className="w-full h-[75%] flex flex-wrap ">
                {/* {isVideoOff ? (
                    <div className="flex items-center justify-start w-full h-full bg-gray-300 text-gray-500"></div>
                ) : ( */}
                <div
                    id="video-container"
                    style={{ width: '60%', height: '100%' }}
                    className="flex flex-wrap items-center justify-center"
                >
                    {console.log('inside the video-container')}
                </div>
                {/* )} */}
            </div>
            <div className="h-[15%] bg-sky-800 w-full flex flex-wrap items-center px-80 justify-center py-2 ">
                <div className="mx-auto border bg-sky-700 border-2 border-white justify-start rounded-full flex flex-wrap py-3 px-8 w-full  ">
                    <div
                        className="bg-red-700 px-6 mx-auto text-white text-md font-medium active:scale-90 shadow-lg cursor-pointer rounded-xl text-center py-2"
                        onClick={generateShareableLink}
                    >
                        Generate Link
                    </div>
 
                    <div
                        className=" p-3 bg-sky-600 mx-auto text-white text-lg font-medium active:scale-90 scale-95 shadow-lg cursor-pointer rounded-full border border-1 border-black hover:bg-sky-800 hover:scale-100 focus:bg-sky-700"
                        onClick={toggleMic}
                    >
                        {isMicMuted ? <FiMicOff /> : <FiMic />}
                    </div>
 
                    <div
                        className=" p-3 bg-sky-600 mx-auto text-white text-lg font-medium active:scale-90 scale-95 shadow-lg cursor-pointer rounded-full border border-1 border-black hover:bg-sky-800 hover:scale-100 focus:bg-sky-700"
                        onClick={toggleVideo}
                    >
                        {isVideoOff ? <FiVideoOff /> : <FiVideo />}
                    </div>
                    <div
                        className="bg-red-700 px-5 py-3 mx-auto text-white text-lg font-semibold active:scale-90 shadow-lg cursor-pointer rounded-3xl text-center"
                        onClick={handleEndCall}
                    >
                        <PiPhoneDisconnect size={20} />
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default VideoCall