import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaAngleLeft, FaAngleRight, FaPause } from "react-icons/fa";

const Player = ({ currentSong, setCurrentSong, isPlaying, setIsPlaying, songs }) => {
  //ref
  const audioRef = useRef(null);
  //Effect
  useEffect(() => {
    if (isPlaying && audioRef.current.paused) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then((audio) => audioRef.current.play()).catch((error) => {});
      }
    }
  }, [isPlaying, currentSong]);
  //Event Handler
  const playSongHandler = () => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //calcualte percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animationPercentage = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({ ...songInfo, currentTime: current, duration, animationPercentage });
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = (direction) => {
    let currentIndex = songs.indexOf(currentSong);
    switch (direction) {
      case "skip-back":
        setCurrentSong(songs[(currentIndex - 1 >= 0 ? currentIndex : songs.length) - 1]);
        break;
      case "skip-forward":
        setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        break;
      default:
        return;
    }
  };

  const getTime = (time) =>
    isNaN(time) ? getTime(0) : Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);

  //State
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  // Add the styles
  const trackAnimation = { transform: `translateX(${songInfo.animationPercentage}%)` };
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{ background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]} )` }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div className="animate-track" style={trackAnimation}></div>
        </div>
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FaAngleLeft onClick={() => skipTrackHandler("skip-back")} className="skip-back" size="2rem" />
        {isPlaying ? (
          <FaPause onClick={playSongHandler} className="play" size="2rem" />
        ) : (
          <FaPlay onClick={playSongHandler} className="play" size="2rem" />
        )}
        <FaAngleRight onClick={() => skipTrackHandler("skip-forward")} className="skip-forward" size="2rem" />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={() => skipTrackHandler("skip-forward")}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};

export default Player;
