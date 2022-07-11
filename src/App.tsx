import { useState } from "react";
import "./App.css";
import IntervalExample from "./IntervalExample";

function App() {
  const [initiate, setInitiate] = useState<boolean>(false);
  const toggleFetching = () => {
    setInitiate((prevState) => !prevState);
  };
  return (
    <div className="App">
      <button onClick={toggleFetching}>
        {initiate === false ? "start retrieving" : "stop retrieving"}
      </button>
      {initiate && <IntervalExample />}
    </div>
  );
}

export default App;
