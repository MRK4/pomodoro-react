import React from "react";

function Header(props) {
  function youtubeLinkToUrl(link) {
    const videoId = link.match(/(\?|&)v=[^&]*(&|$)/)[1];
    return `https://www.youtube.com/watch?v=${videoId}`;
  }

  const handleSoundChange = (event) => {
    props.onSoundChange(event.target.value);
    const audio = new Audio(event.target.value);
    audio.volume = 0.2;
    audio.play();
  };

  // Create a handler for the ambiant sound
  const handleAmbiantChange = (event) => {
    props.onAmbiantChange(event.target.value);
    props.onSelectedAmbiantChange(youtubeLinkToUrl(event.target.value));
  };

  return (
    <header className="sticky top-0 flex items-center justify-between w-full px-4 py-4">
      <div className="flex items-center">
        <label htmlFor="ambiant" className="mr-2 text-xs">
          Ambiant sound:
        </label>
        <select
          className="w-20 select select-success"
          id="ambiant"
          value={props.selectedAmbiant}
          onChange={handleAmbiantChange}
        >
          <option selected>🚫</option>
          <option value="https://www.youtube.com/watch?v=xNN7iTA57jM">🔥 Rain & Thunderstorm</option>
          <option value="https://www.youtube.com/watch?v=xNN7iTA57jM">🌲 Forest</option>
          <option value="https://www.youtube.com/watch?v=4vIQON2fDWM">📚 Old Library</option>
          <option value="https://www.youtube.com/watch?v=Cec4Z-Vlf7Q">🚂 Train Ride</option>
          <option value="https://www.youtube.com/watch?v=_x3hVRSIe2g">🌧️ Rain Falling on Window</option>
          <option value="https://www.youtube.com/watch?v=c0_ejQQcrwI">☕ Rainy Night Coffee Shop</option>
          <option value="https://www.youtube.com/watch?v=jfKfPfyJRdk">🎵 LoFi radio</option>
        </select>
      </div>
      <div className="flex items-center">
        <label htmlFor="sound" className="mr-2 text-xs">
          Notification sound:
        </label>
        <select
          className="w-20 select select-success"
          id="sound"
          value={props.selectedSound}
          onChange={handleSoundChange}
        >
          <option value="./assets/songs/bell.mp3" selected>🔔</option>
          <option value="./assets/songs/clown.mp3">🤡</option>
          <option value="./assets/songs/birds.mp3">🐦</option>
          <option value="./assets/songs/japanese_chim.mp3">🇯🇵</option>
        </select>
      </div>
    </header>
  );
}

export default Header;
