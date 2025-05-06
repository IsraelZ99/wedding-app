import React, { useEffect, useRef, useState } from "react";
// import Button from "../common/Button";
import { IoPauseCircle, IoPlayCircle } from "react-icons/io5";
import "../../styles/audio-player.scss";
import theme from "../../styles/_base-theme.module.scss";

interface AudioPlayerProps {
  songLocation: string;
  artistName: string;
  songName: string;
  albumImage: string;
  onPlaySong: () => void;
  onStopSong: () => void;
}

enum AUDIO_PLAYER_ACTIONS {
  PLAY = "PLAY",
  PAUSE = "PAUSE",
}

const roundToTwoDecimalsToString = (number: number) => {
  return number < 9 ? `0${number}` : `${number}`;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  songLocation,
  artistName,
  songName,
  albumImage,
  onPlaySong,
  onStopSong,
}) => {
  const [playerAction, setPlayerAction] = useState<AUDIO_PLAYER_ACTIONS | null>(
    null
  );
  const [currentTime, setCurrentTime] = useState<string>("00:00");
  const [trackLength, setTrackLength] = useState<string>("00:00");
  const [playProgress, setPlayProgress] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(new Audio(songLocation));

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateCurrentTime = () => {
      const currentMinutes = Math.floor(audio.currentTime / 60);
      const currentSeconds = Math.floor(
        audio.currentTime - currentMinutes * 60
      );
      const updatedPlayProgress = (audio.currentTime / audio.duration) * 100;
      if (isNaN(currentMinutes) || isNaN(currentSeconds)) {
        setCurrentTime("00:00");
      } else
        setCurrentTime(
          `${roundToTwoDecimalsToString(
            currentMinutes
          )}:${roundToTwoDecimalsToString(currentSeconds)}`
        );
      setPlayProgress(updatedPlayProgress);
    };

    const setAudioDuration = () => {
      const durationMinutes = Math.floor(audio.duration / 60);
      const durationSeconds = Math.floor(audio.duration - durationMinutes * 60);
      if (isNaN(durationMinutes) || isNaN(durationSeconds)) {
        setCurrentTime("00:00");
      } else
        setTrackLength(
          `${roundToTwoDecimalsToString(
            durationMinutes
          )}:${roundToTwoDecimalsToString(durationSeconds)}`
        );
    };

    audio.addEventListener("timeupdate", updateCurrentTime);
    audio.addEventListener("loadedmetadata", setAudioDuration);
  }, []);

  useEffect(() => {
    if (playProgress === 100) {
      setPlayerAction(AUDIO_PLAYER_ACTIONS.PLAY);
      setPlayProgress(0);
      setCurrentTime("00:00");
    }
  }, [playProgress]);

  const isPlayingAudio = playerAction === AUDIO_PLAYER_ACTIONS.PAUSE;
  const isPauseAudio = playerAction === AUDIO_PLAYER_ACTIONS.PLAY;

  useEffect(() => {
    if (playerAction === AUDIO_PLAYER_ACTIONS.PLAY) {
      audioRef.current?.pause();
    } else if (playerAction === AUDIO_PLAYER_ACTIONS.PAUSE) {
      audioRef.current?.play();
    }
  }, [playerAction]);

  const handleOnPlayPause = (action: AUDIO_PLAYER_ACTIONS) => {
    let newAction = null;
    if (action === AUDIO_PLAYER_ACTIONS.PLAY) {
      onPlaySong();
      newAction = AUDIO_PLAYER_ACTIONS.PAUSE;
    } else {
      onStopSong();
      newAction = AUDIO_PLAYER_ACTIONS.PLAY;
    }
    setPlayerAction(newAction);
  };

  return (
    <div id="audio-player">
      <div id="player">
        <div
          id="player-track"
          className={isPlayingAudio ? "active" : ""}
          style={{
            padding: isPlayingAudio ? "1em 1em 1em 7em" : "1em 1em 0.3em 7em",
          }}
        >
          <div id="album-name">{songName}</div>
          <div id="track-name">{artistName}</div>
          <div id="track-time" className={isPlayingAudio ? "active" : ""}>
            <div id="current-time">{currentTime}</div>
            <div id="track-length">{trackLength}</div>
          </div>
          <div id="seek-bar-container">
            <div id="seek-time"></div>
            <div id="s-hover"></div>
            <div id="seek-bar" style={{ width: `${playProgress}%` }}></div>
          </div>
        </div>
        <div id="player-content">
          <div id="album-art" className={isPlayingAudio ? "active" : ""}>
            <img src={albumImage} className="active" id="_1" />
            <div id="buffer-box">Buffering ...</div>
          </div>
          <div id="player-controls">
            <div className="control">
              <div className="button-container">
                <div className="song-button" id="play-pause-button">
                  {(isPauseAudio || playerAction == null) && (
                    <IoPlayCircle
                      color={theme.primary}
                      size={"4em"}
                      className="btn-control"
                      onClick={() =>
                        handleOnPlayPause(AUDIO_PLAYER_ACTIONS.PLAY)
                      }
                    />
                  )}
                  {isPlayingAudio && (
                    <IoPauseCircle
                      color={theme.primary}
                      size={"4em"}
                      className="btn-control"
                      onClick={() =>
                        handleOnPlayPause(AUDIO_PLAYER_ACTIONS.PAUSE)
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
