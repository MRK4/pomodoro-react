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
    <div className="h-full">
      <Header selectedSound={selectedSound} onSoundChange={handleSoundChange} selectedAmbiant={selectedAmbiant} onAmbiantChange={handleAmbiantChange} />
      <main className="w-full h-full py-16">
        <Timer selectedSound={selectedSound} selectedAmbiant={selectedAmbiant} />
      </main>
      <footer className="absolute bottom-0 w-full py-4">
        <p className="w-full text-center">
          <small>
          Created by <a className="link" href="https://clementpoudree.com" target="_blank">Clément Poudrée</a>
          </small>
        </p>
      </footer>
    </div>
  );
};

export default App;
