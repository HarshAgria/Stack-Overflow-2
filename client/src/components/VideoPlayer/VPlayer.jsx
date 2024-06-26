import React, { useRef } from 'react';
import './VPlayer.css'
import ReactPlayer from 'react-player';
import video from '../../assets/a.mp4'

const VPlayer = () => {
  const playerRef = useRef(null);

  const handleDoubleClick = (event) => {
    const video = playerRef.current.getInternalPlayer();
    console.log(playerRef.current.getInternalPlayer());
    if (!video) return;
    
    console.log('Double-click detected!');
    console.log('Video object:', video);
    // video.pause();

    const { offsetX } = event.nativeEvent;
    const playerWidth = video.clientWidth;
    const currentTime = video.currentTime;

    if (offsetX < playerWidth / 3) {
      // Double click on left side, seek 10 seconds backward
      video.currentTime = Math.max(0, currentTime - 10);
    } else if (offsetX > (2 * playerWidth) / 3) {
      // Double click on right side, seek 10 seconds forward
      video.currentTime = Math.min(video.duration, currentTime + 10);
    } else {
      // Double click in the middle, toggle play/pause
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  return (
    <div className="video-player" onDoubleClick={handleDoubleClick}>
      <ReactPlayer
        ref={playerRef}
        url='https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_20mb.mp4'
        controls={true}
        width="100%"
        height="auto"
      />
    </div>
  );
};

export default VPlayer;