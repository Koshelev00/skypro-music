'use client';
import Link from 'next/link';
import styles from './bar.module.css';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useCallback, useRef, useEffect, useState, ChangeEvent } from 'react';
import {
  setIsPlay,
  setNextTrack,
  setPrevTrack,
  toggleShuffle,
} from '@/store/features/trackSlice';
import { getTimePanel } from '@/utils/helper';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useLikeTrack } from '@/app/hooks/useLikeTracks';

export default function Bar() {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dispatch = useAppDispatch();
  const [isLoop, setIsLoop] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLoadedTrack, setIsLoadedTrack] = useState(false);
  const [volume, setVolume] = useState(50);
  const [timeValue, setTimeValue] = useState(0);
  const { isLike, isLoading, toggleLike } = useLikeTrack(currentTrack);
  const volumeRef = useRef(volume);
  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  useEffect(() => {
    setIsLoadedTrack(false);
  }, [currentTrack]);
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !currentTrack) return; // Add null check

    if (isPlay) {
      audio.play().catch((err) => console.warn('Autoplay error:', err));
    } else {
      audio.pause();
    }
  }, [isPlay, currentTrack]);

  const playTrack = useCallback(() => {
    if (audioRef.current && currentTrack) {
      // Add null check
      audioRef.current.play();
      dispatch(setIsPlay(true));
    }
  }, [dispatch, currentTrack]);

  const pauseTrack = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      dispatch(setIsPlay(false));
    }
  }, [dispatch]);

  const onToggleLoop = useCallback(() => setIsLoop((prev) => !prev), []);
  const onNextTrack = useCallback(() => dispatch(setNextTrack()), [dispatch]);
  const onPrevTrack = useCallback(() => dispatch(setPrevTrack()), [dispatch]);
  const onToggleShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev);
    dispatch(toggleShuffle());
  }, [dispatch]);

  const onTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setTimeValue(audioRef.current.currentTime);
    }
  }, []);
  const onLoadedMetaData = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
      dispatch(setIsPlay(true));
      setIsLoadedTrack(true);
    }
  }, [dispatch]);

  const onVolumeChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  }, []);
  const onProgressChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const inputTime = Number(e.target.value);
      setTimeValue(inputTime);
      audioRef.current.currentTime = inputTime;
    }
  }, []);

  const handleTrackEnd = useCallback(() => {
    if (isLoop) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      dispatch(setNextTrack());
    }
  }, [dispatch]);

  return (
    <div className={styles.bar}>
      <audio
        className={styles.audio}
        ref={audioRef}
        controls
        src={currentTrack?.track_file}
        preload="auto"
        loop={isLoop}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetaData}
        onEnded={handleTrackEnd}
      ></audio>
      <div className={styles.bar__content}>
        <div className={styles.track__timeBlock}>
          <span className={styles.track__timeText}>
            {getTimePanel(timeValue, audioRef.current?.duration)}
          </span>
        </div>
        <ProgressBar
          max={audioRef.current?.duration || 0}
          step={0.1}
          readOnly={!isLoadedTrack}
          value={timeValue}
          onChange={onProgressChange}
        />
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div className={styles.player__btnPrev} onClick={onPrevTrack}>
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div
                className={classNames(styles.player__btnPlay, styles.btn)}
                onClick={!isPlay ? playTrack : pauseTrack}
              >
                <svg className={styles.player__btnPlaySvg}>
                  <use
                    xlinkHref={
                      !isPlay
                        ? '/icon/sprite.svg#icon-play'
                        : '/icon/sprite.svg#icon-pause'
                    }
                  ></use>
                </svg>
              </div>
              <div
                className={classNames(styles.player__btnNext, styles.btn)}
                onClick={onNextTrack}
              >
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                className={classNames(styles.player__btnRepeat, styles.btnIcon)}
                onClick={onToggleLoop}
              >
                <svg
                  className={classNames(styles.player__btnRepeatSvg, {
                    [styles.player__iconActive]: isLoop,
                  })}
                >
                  <use xlinkHref="/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                className={classNames(
                  styles.player__btnShuffle,
                  styles.btnIcon,
                )}
                onClick={onToggleShuffle}
              >
                <svg
                  className={classNames(styles.player__btnShuffleSvg, {
                    [styles.player__iconActive]: isShuffle,
                  })}
                >
                  <use xlinkHref="/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <Link className={styles.trackPlay__authorLink} href="">
                    {currentTrack?.name}
                  </Link>
                </div>
                <div className={styles.trackPlay__album}>
                  <Link className={styles.trackPlay__albumLink} href="">
                    {currentTrack?.author}
                  </Link>
                </div>
              </div>

              <div className={styles.trackPlay__dislike}>
                <div
                  className={classNames(
                    styles.trackPlay__dislike,
                    styles.btnIcon,
                    {
                      [styles.track__timeSvg_loading]: isLoading,
                    },
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike();
                  }}
                >
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use
                      xlinkHref={
                        !isAuth
                          ? '/icon/sprite.svg#dislike'
                          : isLike
                            ? '/icon/sprite.svg#icon-like-active'
                            : '/icon/sprite.svg#icon-like'
                      }
                    ></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={classNames(styles.volume__progress, styles.btn)}>
                <input
                  className={classNames(
                    styles.volume__progressLine,
                    styles.btn,
                  )}
                  type="range"
                  name="range"
                  onChange={onVolumeChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
