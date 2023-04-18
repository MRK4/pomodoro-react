import React, { useState } from "react";
import Timer from "./components/Timer";
import Header from "./components/Header";

const App = () => {
  const [selectedSound, setSelectedSound] = useState("./assets/songs/bell.mp3");

  const handleSoundChange = (sound) => {
    setSelectedSound(sound);
  };

  return (
    <div className="container h-full px-4 mx-auto">
      <Header selectedSound={selectedSound} onSoundChange={handleSoundChange} />
      <main className="w-full h-full">
        <Timer selectedSound={selectedSound} />
      </main>
      <footer className="absolute bottom-0 flex w-full justify-centeritems-center">
        <small className="w-full py-4 text-xs text-center">Created by Clément Poudrée - <a className="link" href="https://clementpoudree.com" target="_blank">www.clementpoudree.com</a></small>
      </footer>
    </div>
  );
};

export default App;
