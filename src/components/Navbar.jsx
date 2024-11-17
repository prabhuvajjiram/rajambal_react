import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar({ onCartClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img src="/logo.svg" alt="Rajambal Cottons" className="h-8 w-auto" />
            <span className="ml-2 text-xl font-semibold text-[#BE3A8E]">
              Rajambal Cottons
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-[#BE3A8E]">Home</Link>
            <Link to="/products" className="hover:text-[#BE3A8E]">Products</Link>
            <Link to="/about" className="hover:text-[#BE3A8E]">About</Link>
            <Link to="/contact" className="hover:text-[#BE3A8E]">Contact</Link>
            <button 
              className="relative"
              onClick={onCartClick}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#BE3A8E] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4">
            <Link
              to="/"
              className="block py-2 hover:text-[#BE3A8E]"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block py-2 hover:text-[#BE3A8E]"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/about"
              className="block py-2 hover:text-[#BE3A8E]"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block py-2 hover:text-[#BE3A8E]"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <button
              className="block w-full text-left py-2 hover:text-[#BE3A8E]"
              onClick={() => {
                onCartClick();
                setIsMenuOpen(false);
              }}
            >
              Cart ({totalItems})
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;