import React, { useState } from 'react';
import { FaShoppingCart, FaStar, FaTrash, FaSpinner } from 'react-icons/fa';
import '../../../src/css/taiwind.css'


const ShoppingCart = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Product 1', price: 19.99, quantity: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30', rating: 4, size: 'M' },
    { id: 2, name: 'Product 2', price: 29.99, quantity: 2, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e', rating: 5, size: 'L' },
  ]);
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateQuantity = (id, newQuantity) => {
    setItems(items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateSize = (id, newSize) => {
    setItems(items.map(item => item.id === id ? { ...item, size: newSize } : item));
  };

  const handleCardDetailsChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
    validateField(e.target.name, e.target.value);
  };

  const validateField = (fieldName, value) => {
    let error = '';
    switch (fieldName) {
      case 'number':
        error = /^\d{16}$/.test(value) ? '' : 'Invalid card number';
        break;
      case 'expiry':
        error = /^(0[1-9]|1[0-2])\/\d{2}$/.test(value) ? '' : 'Invalid expiry date';
        break;
      case 'cvv':
        error = /^\d{3,4}$/.test(value) ? '' : 'Invalid CVV';
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({ ...prevErrors, [fieldName]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulating API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Order submitted successfully!');
    }, 2000);
  };

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = 5.99;
  const discount = 10;
  const finalTotal = totalPrice + shippingCost - discount;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-100 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Shopping Cart</h2>
          <div className="relative">
            <FaShoppingCart className="text-2xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {items.length}
            </span>
          </div>
        </div>

        {/* Cart Items */}
        <div className="p-4">
          {items.map(item => (
            <div key={item.id} className="flex items-center mb-4 p-2 hover:bg-gray-50 transition-colors duration-200">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
              <div className="flex-grow">
                <h3 className="font-semibold">{item.name}</h3>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < item.rating ? 'text-yellow-400' : 'text-gray-300'} />
                  ))}
                </div>
                <div className="mt-2 flex items-center">
                  <select
                    value={item.size}
                    onChange={(e) => updateSize(item.id, e.target.value)}
                    className="mr-2 border rounded p-1"
                    aria-label="Select size"
                  >
                    {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 border rounded p-1 mr-2"
                    aria-label="Quantity"
                  />
                  <button onClick={() => removeItem(item.id)} className="text-red-500" aria-label="Remove item">
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Credit Card Form and Order Summary */}
        <form onSubmit={handleSubmit} className="p-4 bg-gray-50">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
              <div className="mb-4">
                <label htmlFor="cardNumber" className="block mb-1">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="number"
                  value={cardDetails.number}
                  onChange={handleCardDetailsChange}
                  className={`w-full p-2 border rounded ${errors.number ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="1234 5678 9012 3456"
                  aria-invalid={errors.number ? 'true' : 'false'}
                  aria-describedby="cardNumberError"
                />
                {errors.number && <p id="cardNumberError" className="text-red-500 text-sm mt-1">{errors.number}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="cardExpiry" className="block mb-1">Expiry Date</label>
                <input
                  type="text"
                  id="cardExpiry"
                  name="expiry"
                  value={cardDetails.expiry}
                  onChange={handleCardDetailsChange}
                  className={`w-full p-2 border rounded ${errors.expiry ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="MM/YY"
                  aria-invalid={errors.expiry ? 'true' : 'false'}
                  aria-describedby="cardExpiryError"
                />
                {errors.expiry && <p id="cardExpiryError" className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="cardCVV" className="block mb-1">CVV</label>
                <input
                  type="text"
                  id="cardCVV"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardDetailsChange}
                  className={`w-full p-2 border rounded ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="123"
                  aria-invalid={errors.cvv ? 'true' : 'false'}
                  aria-describedby="cardCVVError"
                />
                {errors.cvv && <p id="cardCVVError" className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="cardName" className="block mb-1">Name on Card</label>
                <input
                  type="text"
                  id="cardName"
                  name="name"
                  value={cardDetails.name}
                  onChange={handleCardDetailsChange}
                  className="w-full p-2 border rounded border-gray-300"
                  placeholder="John Doe"
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              <div className="bg-white p-4 rounded shadow">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  'Place Order'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShoppingCart;