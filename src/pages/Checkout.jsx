import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { submitCheckout } from '../api';

function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const mutation = useMutation({
    mutationFn: submitCheckout,
    onSuccess: () => {
      alert('Order placed successfully!');
      clearCart();
      navigate('/');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      ...formData,
      items: cart,
      total
    });
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <button
          onClick={() => navigate('/products')}
          className="bg-gradient-to-r from-[#BE3A8E] to-[#9C2D73] text-white px-6 py-2 rounded-lg"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-12">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.selectedColor}`}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    {item.selectedColor && (
                      <p className="text-sm text-gray-600">
                        Color: {item.selectedColor}
                      </p>
                    )}
                    <p className="text-[#BE3A8E]">
                      ₹{item.price} x {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-xl font-semibold">
              Total: ₹{total.toFixed(2)}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#BE3A8E]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#BE3A8E]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#BE3A8E]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#BE3A8E] h-32"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#BE3A8E] to-[#9C2D73] text-white py-3 rounded-lg hover:opacity-90 transition-opacity"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;