import React from 'react';
import Home from './components/Home';
function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;













// import { useState, useEffect } from 'react';
// import Details from './components/Details'
// function App() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     // Replace 'YOUR_BACKEND_API_URL' with the actual URL of your backend API
//     const backendApiUrl = 'http://localhost:8000/';

//     fetch(`${backendApiUrl}`)
//       .then((response) => response.json())
//       .then((data) => setData(data))
//       .catch((error) => console.error('Error fetching data:', error));
//   }, []);

//   return (
//     <div>
//       <h1>Hello from React Vite App</h1>
//       {data && <p>Data from Backend: {data.message}</p>}
//       <Details/>
//     </div>
//   );
// }

// export default App;
