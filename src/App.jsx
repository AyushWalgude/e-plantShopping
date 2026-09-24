import React, { useState } from 'react';
import './App.css';
import ProductList from './ProductList';
import AboutUs from './AboutUs';

function App() {
  const [showProducts, setShowProducts] = useState(false);

  const handleGetStarted = () => {
    setShowProducts(true);
  };

  return (
    <div className="App">
      {!showProducts ? (
        <div className="landing-page">
          <h1>Paradise Nursery</h1>
          <p>Where Green Meets Serenity</p>
          <AboutUs />
          <button className="get-started-btn" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      ) : (
        <ProductList />
      )}
    </div>
  );
}

export default App;
