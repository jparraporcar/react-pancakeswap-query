import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const url = "https://api.pancakeswap.info/api/v2/tokens";
  const [dataArray, setDataArray] = useState<any>([]);
  const [time, setTime] = useState<any>("");

  const fetchData = async () => {
    const response = await fetch(url);
    return response.json();
  };

  useEffect(() => {
    fetchData()
      .then((input) => {
        const { updated_at, data } = input;
        setTime(updated_at);
        const entries = Object.entries(data);
        const newArray = entries.map((el: any) => {
          let arrayFirst;
          let arraySecond;
          [arrayFirst, arraySecond] = el;
          const newObj: any = {};
          newObj[`address`] = arrayFirst;
          newObj["data"] = arraySecond;
          return newObj;
        });
        setDataArray(newArray);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <h1>timestamp: {time}</h1>
      <ul>
        {dataArray.map((el: any, i: any) => {
          return (
            <li key={i}>
              <p>address: {el.address}</p>
              <p>price: {el.data.price}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
