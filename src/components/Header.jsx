import React from "react";

function Header(props) {
  const handleSoundChange = (event) => {
    props.onSoundChange(event.target.value);
    const audio = new Audio(event.target.value);
    audio.volume = 0.2;
    audio.play();
  };

  return (
    <header className="sticky top-0 flex items-center justify-between w-full px-4 py-4">
      <h1 className="text-2xl font-bold">Pomodoro</h1>
      <div className="flex items-center">
        <label htmlFor="sound" className="mr-2">
          Notification sound:
        </label>
        <select
          className="select select-success"
          id="sound"
          value={props.selectedSound}
          onChange={handleSoundChange}
        >
          <option value="./assets/songs/bell.mp3">🔔</option>
          <option value="./assets/songs/clown.mp3">🤡</option>
          <option value="./assets/songs/birds.mp3">🐦</option>
          <option value="./assets/songs/japanese_chim.mp3">🇯🇵</option>
        </select>
      </div>
    </header>
  );
}

export default Header;
