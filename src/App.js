import React, { useState } from "react";
import Folder from "./Folder";
import "./App.css"

const App = () => {
  const [data, setData] = useState({
    Applications: {},
    Desktop: ["Screenshot1.jpg", "videopal.mp4"],
    Documents: ["Document1.jpg", "Document2.jpg", "Document3.jpg"],
    Downloads: {
      Drivers: ["Printerdriver.dmg", "cameradriver.dmg"],
      Images: {},
    },
  });

  return (
    <div className="app-container">
      <h1 className="app-header">Evaluation</h1>
      <Folder data={data} setData={setData} name="Root" path={[]} />
    </div>
  );
};

export default App;
