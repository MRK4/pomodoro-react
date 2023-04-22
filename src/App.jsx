import React, { useState } from "react";
import Timer from "./components/Timer";
import Header from "./components/Header";

const App = () => {
  const [selectedSound, setSelectedSound] = useState("./assets/songs/bell.mp3");
  const [selectedAmbiant, setSelectedAmbiant] = useState(null);

  const handleSoundChange = (sound) => {
    setSelectedSound(sound);
  };

  const handleAmbiantChange = (ambiant) => {
    setSelectedAmbiant(ambiant);
  };

  return (
    <div className="container h-full mx-auto">
      <Header selectedSound={selectedSound} onSoundChange={handleSoundChange} selectedAmbiant={selectedAmbiant} onAmbiantChange={handleAmbiantChange} />
      <main className="w-full h-full px-4 py-32">
        <Timer selectedSound={selectedSound} selectedAmbiant={selectedAmbiant} />
      </main>
      <footer className="container absolute bottom-0 py-4 mx-auto">
        <p className="w-full text-center">
          <small>
          Created by Clément Poudrée - <a className="link" href="https://clementpoudree.com" target="_blank">www.clementpoudree.com</a>
          </small>
        </p>
      </footer>
    </div>
  );
};

export default App;
