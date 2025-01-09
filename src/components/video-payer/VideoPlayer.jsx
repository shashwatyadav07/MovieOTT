import React, { useRef, useState, useEffect } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import ReplayIcon from '@mui/icons-material/Replay';
import Forward10SharpIcon from '@mui/icons-material/Forward10Sharp';
import Replay10SharpIcon from '@mui/icons-material/Replay10Sharp';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './VideoPlayer.css'
// import Video from './assets/BigBuckBunny.mp4'
import SpeedIcon from '@mui/icons-material/Speed';

const Video = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
function VideoPlayer() {
  const videoRef = useRef(null)
  const videoContainerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.4) //setting to low volume
  const [currTime, setCurrTime] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [opacity, setOpacity] = useState(1)
  const timerRef = useRef(null);

  //key doen functions
  const handleKeyDown = (e) => {
    if(videoRef.current){
    console.log("key pressed" + e.key);
    switch (e.key.toLowerCase()) {
      case ' ':
      case 'k':
        handlePlayPause()
        break
      case "f":
        handleFullScreen()
        break
      case "m":
        toggleMute()
        break
      case "arrowleft":
      case "j":
        handleSkip(-10)
        break
      case "arrowright":
      case "l":
        handleSkip(10)
        break
      case "escape":
        e.preventDefault()
        break

    }
  }
  };

  useEffect(() => {

    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('mousemove', handleHover);
    startTimer();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousemove', handleHover);
      clearTimeout(timerRef.current)
    };
  }, []);

  //load the meta data
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = volume;
    video.muted = false
    setTotalTime(video.duration);
  }

  //set the total duration
  const formatDuration = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    } else {
      return `${minutes}:${String(seconds).padStart(2, '0')}`;
    }
  };

  //play from beginning
  function handlePlayStart() {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }
  ///toggle play and pause
  function handlePlayPause() {
    setIsPlaying((prev) => {
      if (prev) {
        videoRef.current.pause()
      }
      else {
        videoRef.current.play()
      }

    })

  }

  //volume change
  function handleVolumeChange(e) {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;

  }

  //toggle mute button
  function toggleMute() {
    videoRef.current.muted = !videoRef.current.muted
    if (!videoRef.current.muted) {
      setVolume(0.4)
    }
    else {
      setVolume(0)
    }
  }


  //timeline change
  function handleTimelineChange(e) {
    const newTime = parseFloat(e.target.value);
    setCurrTime(newTime);
    videoRef.current.currentTime = newTime;

  }

  function handleTimeUpdate() {
    const newTime = videoRef.current.currentTime;
    setCurrTime(newTime);
  }

  //toggle Fullscreen
  const handleFullScreen = () => {
    if (document.fullscreenElement==null){
      videoContainerRef?.current.requestFullscreen();
      
    }
    else {
      document.exitFullscreen();
        }
  };

  //skip back 10 seconds
  function handleSkip(sec) {
    const newTime = videoRef.current?.currentTime + sec
    setCurrTime(newTime)
    videoRef.current.currentTime = newTime
  }

  //playback Rate
  function handleSpeed(x) {
    videoRef.current.playbackRate = x
  }

  //handling the hover
  const startTimer = () => {
    timerRef.current = setTimeout(() => {
      setOpacity(0);
    }, 5000);
  }
  const handleHover = () => {
    setOpacity(1);
    clearTimeout(timerRef.current);
    startTimer();

  }
  //handle navigation back
  function handleNavigationBack(){
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('mousemove', handleHover);
    window.history.back()
  }

  return (
    <div className='video-container full-screen' ref={videoContainerRef}
      onMouseEnter={handleHover}>
      <video className='video-main' src={Video}
        ref={videoRef}
        controls={false}
        onPlay={() => { setIsPlaying(true) }}
        onPause={() => { setIsPlaying(false) }}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}>
        <track kind="captions" srcLang="en" src="./assets/subtitles.vtt" />
      </video>

      <div className='top-bar' style={{ opacity, transistion: 'opacity 0.5s' }}>

        <ArrowBackIcon sx={{ fontSize: 40 }}  className='top-left-btn' onClick={handleNavigationBack} />
        <div className='top-right-btn'>

        <div className='dropdown-caption'>
        <SubtitlesIcon sx={{ fontSize: 40, cursor: 'pointer' }} />
            
            <div className='dropdown-caption-content'>
              <button>Hindi</button>
              <button>English</button>
              <button>Malayalam</button>
              <button>Kannada</button>
              <button>Tamil</button>
              <button>Telugu</button>
            </div>
          </div>
          
          <div className='dropdown'>
            <OndemandVideoIcon sx={{ fontSize: 40, cursor: 'pointer' }} />
            
            <div className='dropdown-content'>
              <button>4k</button>
              <button>1080p</button>
              <button>720p</button>
              <button>480p</button>
              <button>360p</button>
              <button>144p</button>
            </div>
          </div>
        </div>
      </div>

      <div className='center-controls' style={{ opacity, transistion: 'opacity 0.5s' }}>
        <Replay10SharpIcon className='icon-style' onClick={() => { handleSkip(-10) }} />
        {isPlaying ? <PauseIcon onClick={handlePlayPause} className='icon-style' /> : <PlayArrowIcon onClick={handlePlayPause} className='icon-style' />}
        <Forward10SharpIcon className='icon-style' onClick={() => { handleSkip(+10) }} />
      </div>
      <div className="video-controls-container" style={{ opacity, transistion: 'opacity 0.5s' }}>
        <div className="timeline-container">
          <input className="timelinebar" type="range" min="0" max={totalTime} step="any" value={currTime} onChange={handleTimelineChange} />
          <div className="thumb-indicator"></div>
        </div>

        <div className="controls" style={{ "fontSize": "1.5rem" }}>

<span title='Replay' style={{fontSize:'16px',cursor:'pointer'}}>
<ReplayIcon style={{ "fontSize": "2rem", "marginLeft": "10px" }} onClick={handlePlayStart} />
</span>
          

          <div style={{ "margin": "0 13px" }} className="volume-container">

            {volume === 0 || videoRef.current?.muted === true ? <VolumeOffIcon style={{ "fontSize": "2.5rem" }} onClick={toggleMute} /> : (volume < 0.5 ? <VolumeDownIcon style={{ "fontSize": "2.5rem" }} onClick={toggleMute} /> : <VolumeUpIcon onClick={toggleMute} />)}
            <input className="volume-slider" type="range" min="0" max="1" step="any" value={volume} onChange={handleVolumeChange} />
          </div>

          <div className="duration-container">
            <div className="current-time">{formatDuration(currTime)}</div>
            /
            <div className="total-time">{formatDuration(totalTime)}</div>
          </div>
          <div className='dropup'>
            <SpeedIcon style={{ "fontSize": "2.5rem", "marginRight": "1.5rem", cursor: 'pointer' }} />
            < div className='dropup-content' >
              <button onClick={() => handleSpeed(2)}>2x</button>
              <button onClick={() => handleSpeed(1.75)}>1.75x</button>
              <button onClick={() => handleSpeed(1.5)}>1.5x</button>
              <button onClick={() => handleSpeed(1.25)}>1.25x</button>
              <button onClick={() => handleSpeed(1)}>1x</button>
              <button onClick={() => handleSpeed(0.75)}>0.75x</button>
              <button onClick={() => handleSpeed(0.5)}>0.5x</button>
              <button onClick={() => handleSpeed(0.25)}>0.25x</button>

            </div>
          </div>

          {(document.fullscreenElement==null) ?  <FullscreenIcon style={{ "fontSize": "2.5rem", "marginRight": "1.5rem" }} onClick={handleFullScreen} />:<FullscreenExitIcon style={{ "fontSize": "2.5rem", "marginRight": "1.5rem" }} onClick={handleFullScreen} />}
        </div>
      </div>

    </div >
  )
}

export default VideoPlayer