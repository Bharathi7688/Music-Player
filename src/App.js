import './App.css';
import React, {useState, useRef, useEffect} from 'react';

function App() {
  const [songs] = useState([
    { title: 'Song 1', artist: 'Artist 1', src: '/song1.mp3'},
    { title: 'Song 2', artist: 'Artist 2', src: '/song2.mp3' },
    { title: 'Song 3', artist: 'Artist 3', src: '/song3.mp3' },
    { title: 'Song 4', artist: 'Artist 4', src: '/song4.mp3'},
    { title: 'Song 5', artist: 'Artist 5', src: '/song5.mp3' },
    { title: 'Song 6', artist: 'Artist 6', src: '/song6.mp3' },
    { title: 'Song 7', artist: 'Artist 7', src: '/song7.mp3'},
    { title: 'Song 8', artist: 'Artist 8', src: '/song8.mp3' },
    { title: 'Song 9', artist: 'Artist 9', src: '/song9.mp3' },
    { title: 'Song 10', artist: 'Artist 10', src: '/song10.mp3'},
    { title: 'Song 11', artist: 'Artist 11', src: '/song11.mp3' },
    { title: 'Song 12', artist: 'Artist 12', src: '/song12.mp3' },
  ]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);


  const playPauseHandler = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextSongHandler = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(false); 
  };

  const prevSongHandler = () => {
    setCurrentSongIndex((prevIndex) =>
      (prevIndex - 1 + songs.length) % songs.length
    );
    setIsPlaying(false);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      const playPromise = audioRef.current.play();
      playPromise
        .catch((error) => console.warn('Audio playback was interrupted:', error));
    }
  }, [currentSongIndex]);


  const onSongEndHandler = () => {
    nextSongHandler();
  };

  return (
    <div className="music-player">
      <h1>React Music Player</h1>

      <div className="song-details">
        <h2>{songs[currentSongIndex].title}</h2>
        <p>{songs[currentSongIndex].artist}</p>
      </div>

      <audio
        ref={audioRef}
        src={songs[currentSongIndex].src}
        onEnded={onSongEndHandler}
        controls
      ></audio>

      <div className="controls">
        <button onClick={prevSongHandler}>Previous</button>
        <button onClick={playPauseHandler}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={nextSongHandler}>Next</button>
      </div>

      <div className="playlist">
        <h3>Playlist</h3>
        <ul>
          {songs.map((song, index) => (
            <li
              key={index}
              className={index === currentSongIndex ? 'active' : ''}
              onClick={() => {
                setCurrentSongIndex(index);
                setIsPlaying(true);
              }}
            >
              {song.title} - {song.artist}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
