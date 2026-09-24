import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList() {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);
  const cartItems = useSelector(state => state.cart.items);
  
  // Calculate total quantity for the navbar
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Costs are stored as raw numbers to fix Question 7 feedback
  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", cost: 15, image: "https://via.placeholder.com/150", description: "Purifies air." },
        { name: "Spider Plant", cost: 12, image: "https://via.placeholder.com/150", description: "Easy to care for." },
        { name: "Peace Lily", cost: 18, image: "https://via.placeholder.com/150", description: "Beautiful white blooms." },
        { name: "Boston Fern", cost: 14, image: "https://via.placeholder.com/150", description: "Loves humidity." },
        { name: "Rubber Plant", cost: 20, image: "https://via.placeholder.com/150", description: "Broad glossy leaves." },
        { name: "Aloe Vera", cost: 10, image: "https://via.placeholder.com/150", description: "Healing properties." }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", cost: 16, image: "https://via.placeholder.com/150", description: "Calming scent." },
        { name: "Jasmine", cost: 18, image: "https://via.placeholder.com/150", description: "Sweet fragrance." },
        { name: "Rosemary", cost: 12, image: "https://via.placeholder.com/150", description: "Great for cooking." },
        { name: "Mint", cost: 8, image: "https://via.placeholder.com/150", description: "Refreshing herb." },
        { name: "Lemon Balm", cost: 10, image: "https://via.placeholder.com/150", description: "Citrus scent." },
        { name: "Oregano", cost: 9, image: "https://via.placeholder.com/150", description: "Herbaceous aroma." }
      ]
    },
    {
      category: "Insect Repellent Plants",
      plants: [
        { name: "Marigold", cost: 7, image: "https://via.placeholder.com/150", description: "Repels mosquitoes." },
        { name: "Geranium", cost: 14, image: "https://via.placeholder.com/150", description: "Beautiful and useful." },
        { name: "Basil", cost: 9, image: "https://via.placeholder.com/150", description: "Repels flies." },
        { name: "Citronella", cost: 18, image: "https://via.placeholder.com/150", description: "Famous mosquito repellent." },
        { name: "Catnip", cost: 11, image: "https://via.placeholder.com/150", description: "Cats love it, bugs hate it." },
        { name: "Lemongrass", cost: 15, image: "https://via.placeholder.com/150", description: "Citrusy bug deterrent." }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isAddedToCart = (plantName) => {
    return cartItems.some(item => item.name === plantName);
  };

  if (showCart) {
    return <CartItem onContinueShopping={() => setShowCart(false)} />;
  }

  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', backgroundColor: '#4CAF50', color: 'white', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Paradise Nursery</h2>
        <button 
          onClick={() => setShowCart(true)} 
          style={{ fontSize: '16px', padding: '10px 20px', cursor: 'pointer', backgroundColor: 'white', color: '#4CAF50', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
          View Cart ({totalQuantity})
        </button>
      </nav>
      
      <div className="product-list" style={{ padding: '20px' }}>
        {plantsArray.map((category, index) => (
          <div key={index}>
            <h2>{category.category}</h2>
            <div className="plant-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
              {category.plants.map((plant, plantIndex) => (
                <div className="plant-card" key={plantIndex} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', width: '220px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                  <img src={plant.image} alt={plant.name} style={{width: "100%", height: "150px", objectFit: "cover", borderRadius: '5px'}}/>
                  <h3>{plant.name}</h3>
                  <p style={{ color: '#666' }}>{plant.description}</p>
                  <p style={{ fontWeight: 'bold', fontSize: '1.2em' }}>${plant.cost}</p>
                  <button 
                    onClick={() => handleAddToCart(plant)} 
                    disabled={isAddedToCart(plant.name)}
                    style={{
                      backgroundColor: isAddedToCart(plant.name) ? '#ccc' : '#4CAF50',
                      color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', width: '100%',
                      cursor: isAddedToCart(plant.name) ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isAddedToCart(plant.name) ? "Added to Cart" : "Add to Cart"}
                  </button>
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
