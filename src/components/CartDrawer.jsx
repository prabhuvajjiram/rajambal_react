import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-lg">
        <div className="p-4 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Cart</h2>
            <button onClick={onClose}>&times;</button>
          </div>

          <div className="flex-grow overflow-auto">
            {cart.map((item) => (
              <div key={`${item.id}-${item.selectedColor}`} className="mb-4 p-4 border-b">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <h3 className="font-medium">{item.title}</h3>
                {item.selectedColor && (
                  <p className="text-sm text-gray-600">Color: {item.selectedColor}</p>
                )}
                <p className="text-[#BE3A8E]">₹{item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.selectedColor, item.quantity - 1)}
                    className="px-2 py-1 border rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.selectedColor, item.quantity + 1)}
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id, item.selectedColor)}
                    className="ml-auto text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">₹{total.toFixed(2)}</span>
            </div>
            <button
              onClick={() => {
                onClose();
                navigate('/checkout');
              }}
              className="w-full bg-gradient-to-r from-[#BE3A8E] to-[#9C2D73] text-white py-2 rounded"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartDrawer;