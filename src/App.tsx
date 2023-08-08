import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("https://api.coincap.io/v2/assets")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return <></>;
}

export default App;