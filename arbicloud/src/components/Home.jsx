import React, { useState, useEffect } from "react";

function Home() {
  const url = "https://www.arbi.cloud/test";
  const [data, setData] = useState([]);

  const fetchInfo = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((d) => setData(d))
  }


  useEffect(() => {
    fetchInfo();
  }, []);
    console.log(data)
  return (
    <div className="App">
      <h1 style={{ color: "green" }}>ML Logistic Solution and ML Ops</h1>
      <center>
        <p>Data</p>
      </center>
    </div>
  );
}

export default Home;