import React, { useState } from "react";

import "./assets/App.css";
import OrderEntry from "./components/OrderEntry";
import OrderBook from "./components/OrderBook";

const App = () => {
  const [refetch, setRefetch] = useState(false);

  const onPost = () => {
    setRefetch(true);
  };

  const onGet = () => {
    setRefetch(false);
  };

  return (
    <div className="App">
      <OrderEntry onSubmit={onPost} />
      <OrderBook refetch={refetch} onRefetch={onGet} />
    </div>
  );
};

export default App;
