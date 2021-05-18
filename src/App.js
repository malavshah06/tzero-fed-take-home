import React from 'react';
import './assets/App.css';
import OrderEntry from './components/OrderEntry';
import OrderBook from './components/OrderBook';

const App = () => {
  return (
    <div className='App'>
      <OrderEntry />
      <OrderBook />
    </div>
  );
}

export default App;
