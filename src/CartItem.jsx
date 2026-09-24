import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.cost * item.quantity;
    });
    return total.toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    alert("Checkout functionality coming soon!");
  };

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Your cart is empty!</h2>
        <button onClick={onContinueShopping} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
            <img className="cart-item-image" src={item.image} alt={item.name} style={{width: "120px", height: "120px", objectFit: "cover", borderRadius: '8px'}}/>
            <div className="cart-item-details" style={{ flexGrow: 1 }}>
              <div className="cart-item-name" style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{item.name}</div>
              <div className="cart-item-cost" style={{ color: '#666', margin: '5px 0' }}>Unit Price: ${item.cost}</div>
              
              <div className="cart-item-quantity" style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                <button onClick={() => handleDecrement(item)} style={{ padding: '5px 15px', fontSize: '16px', cursor: 'pointer', border: '1px solid #ccc', backgroundColor: '#f9f9f9' }}>-</button>
                <span className="cart-item-quantity-value" style={{ margin: '0 15px', fontWeight: 'bold', fontSize: '1.1em' }}>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)} style={{ padding: '5px 15px', fontSize: '16px', cursor: 'pointer', border: '1px solid #ccc', backgroundColor: '#f9f9f9' }}>+</button>
              </div>
              
              <div className="cart-item-total" style={{ fontWeight: 'bold', color: '#333' }}>
                Subtotal: ${(item.cost * item.quantity).toFixed(2)}
              </div>
              
              <button 
                className="cart-item-delete" 
                onClick={() => handleRemove(item)} 
                style={{ marginTop: '10px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="continue_shopping_btn" style={{ marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <button onClick={onContinueShopping} style={{ padding: '12px 25px', cursor: 'pointer', border: '1px solid #4CAF50', backgroundColor: 'white', color: '#4CAF50', borderRadius: '5px', fontWeight: 'bold' }}>
          Continue Shopping
        </button>
        <button onClick={handleCheckout} style={{ padding: '12px 25px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
