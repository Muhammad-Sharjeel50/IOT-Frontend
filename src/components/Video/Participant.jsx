import React, { useEffect, useState, useRef } from 'react';
import { RemoteTrackPublication, LocalTrackPublication } from 'twilio-video';

const trackpubsToTracks = (trackMap) => {
  return Array.from(trackMap.values()).map((publication) => {
    if (publication instanceof RemoteTrackPublication) {
      return publication.track;
    } else if (publication instanceof LocalTrackPublication) {
      return publication.track;
    }
    return publication;
  });
};

const Participant = ({ participant }) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const videoRef = useRef();
 

  useEffect(() => {
    const trackSubscribed = (track) => {
      if (track.kind === 'video') {
        setVideoTracks((prev) => [...prev, track]);
      } 
    
    };

    const trackUnsubscribed = (track) => {
      if (track.kind === 'video') {
        setVideoTracks((prev) => prev.filter((t) => t !== track));
      } 
     
    };

    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    ;

    participant.on('trackSubscribed', trackSubscribed);
    participant.on('trackUnsubscribed', trackUnsubscribed);

    return () => {
      setVideoTracks([]);
    
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);

      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  return (
    <div className="participant">
      <h3>{participant.identity}</h3>
      <video ref={videoRef} autoPlay={true} />
   
    </div>
  );
};
export default Participant;
