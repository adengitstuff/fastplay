import { useState } from 'preact/hooks';
import FastVideo from './components/FastVideo';
import './App.css';

export function App() {
  const [videos, setVideos] = useState([
    'https://d258psubze4zsn.cloudfront.net/transcoded/dash.mpd',
    'https://d258psubze4zsn.cloudfront.net/$$/transcoded/hls/master.m3u8.m3u8',
    'https://d258psubze4zsn.cloudfront.net/{{filename}}/transcoded/dash/manifest.mpd',
    'https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd',
    'https://dash.akamaized.net/digitalprimates/fraunhofer/480p_video/heaac_2_0_with_video/ElephantsDream/elephants_dream_480p_heaac2_0.mpd',
    'https://dash.akamaized.net/dash264/TestCases/1a/sony/SNE_DASH_SD_CASE1A_REVISED.mpd'
    // Add more video URLs as needed
  ]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoConfiguration = {
    showNextButton: true,
    autpplay: true,
    muted: true,
    'controlPanelElements': ['play_pause', 'time_and_duration', 'mute', 'volume', 'overflow_menu'],
    'overflowMenuButtons' : ['quality', 'chapter'],
  };
  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  return (
    <div className="App">
      <FastVideo 
        currentVideo={videos[currentVideoIndex]}
        onNextVideo={handleNextVideo}
        config={videoConfiguration}
      />
    </div>
  );
}
