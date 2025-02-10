import { useRef, useEffect, useState } from 'preact/hooks';
import shaka from 'shaka-player';

function FastVideo({ currentVideo, onNextVideo, onPlayPause, config }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [showControls, setShowControls] = useState(true);


  useEffect(() => {
    shaka.polyfill.installAll();
    if (shaka.Player.isBrowserSupported()) {
      initPlayer();
    } else {
      console.error('Browser not supported!');
    }

    const videoElement = videoRef.current;
    videoElement.addEventListener('play', () => {
      onPlayPause(true);
      setShowControls(false);
  });
    videoElement.addEventListener('pause', () => { 
      onPlayPause(false);
      setShowControls(true);
  });

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      videoElement.removeEventListener('play', () => onPlayPause(true));
      videoElement.removeEventListener('pause', () => onPlayPause(false));
    };
  }, []);

  useEffect(() => {
    if (playerRef.current) {
      loadVideo();
    }
  }, [currentVideo]);

  const initPlayer = async () => {
    try {
      playerRef.current = new shaka.Player(videoRef.current);
      await loadVideo();
      console.log('Video player initialized!');
    } catch (error) {
      console.error('Error initializing player:', error);
    }
  };

  const loadVideo = async () => {
    try {
      await playerRef.current.load(currentVideo);
      console.log(`Loaded video: ${currentVideo}`);
    } catch (error) {
      console.error('Error loading video:', error);
    }
  };

  return (
    <div className="video-container">
      <video 
        ref={videoRef}
        width="100%" 
        height="100%"
        controls
        autoplay
        muted={config.muted}
      />
      {showControls && (
      <button onClick={onNextVideo} className="next-button">
      →
      </button>
      )}
    </div>
  );
}

export default FastVideo;
