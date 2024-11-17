import { useState } from 'react';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const [selectedColor, setSelectedColor] = useState(null);
  const { addToCart } = useCart();
  const [currentImage, setCurrentImage] = useState(product.image_path);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setCurrentImage(color.image_path);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative aspect-square">
        <img
          src={currentImage}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="text-gray-600">₹{product.price}</p>
        
        {product.colors && product.colors.length > 0 && (
          <div className="flex gap-2 mt-2">
            <div
              className="w-8 h-8 rounded-full cursor-pointer border-2"
              onClick={() => {
                setSelectedColor(null);
                setCurrentImage(product.image_path);
              }}
              style={{
                borderColor: !selectedColor ? '#BE3A8E' : 'transparent'
              }}
            >
              <img
                src={product.image_path}
                alt="Original"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            {product.colors.map((color) => (
              <div
                key={color.name}
                className="w-8 h-8 rounded-full cursor-pointer border-2"
                onClick={() => handleColorSelect(color)}
                style={{
                  borderColor: selectedColor?.name === color.name ? '#BE3A8E' : 'transparent'
                }}
              >
                <img
                  src={color.image_path}
                  alt={color.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => addToCart(product, selectedColor?.name, currentImage)}
          className="mt-4 w-full bg-gradient-to-r from-[#BE3A8E] to-[#9C2D73] text-white py-2 px-4 rounded hover:opacity-90 transition-opacity"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;