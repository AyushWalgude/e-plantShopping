import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList() {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);

  // Sample data - you can add more categories and plants
  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", cost: "$15", image: "snake-plant.jpg", description: "Purifies air." },
        { name: "Spider Plant", cost: "$12", image: "spider-plant.jpg", description: "Easy to care for." }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  if (showCart) {
    return <CartItem onContinueShopping={() => setShowCart(false)} />;
  }

  return (
    <div>
      <nav>
        <h2>Paradise Nursery</h2>
        <button onClick={() => setShowCart(true)}>View Cart</button>
      </nav>
      
      <div className="product-list">
        {plantsArray.map((category, index) => (
          <div key={index}>
            <h3>{category.category}</h3>
            <div className="plant-grid">
              {category.plants.map((plant, plantIndex) => (
                <div className="plant-card" key={plantIndex}>
                  <img src={plant.image} alt={plant.name} style={{width: "150px"}}/>
                  <h4>{plant.name}</h4>
                  <p>{plant.description}</p>
                  <p>{plant.cost}</p>
                  <button onClick={() => handleAddToCart(plant)}>Add to Cart</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
