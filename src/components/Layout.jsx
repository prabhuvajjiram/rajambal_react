import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import { useState } from 'react';

function Layout() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Footer />
    </div>
  );
}

export default Layout;