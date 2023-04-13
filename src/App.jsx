import Timer from "./components/Timer";

const App = () => {
  return (
    <div className="w-full h-full">
      <main className="w-full h-full">
        <Timer />
      </main>
      <footer className="absolute bottom-0 flex w-full justify-centeritems-center">
        <small className="w-full py-4 text-xs text-center">Created by Clément Poudrée - <a className="link" href="https://clementpoudree.com" target="_blank">www.clementpoudree.com</a></small>
      </footer>
    </div>
  );
};

export default App;
