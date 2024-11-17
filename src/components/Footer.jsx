import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-primary">Home</Link></li>
              <li><Link to="/products" className="hover:text-primary">Products</Link></li>
              <li><Link to="/about" className="hover:text-primary">About</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li>37, Mettu Street, Kanchipuram</li>
              <li>Email: sales@rajambalcottons.com</li>
              <li>Phone: +91-9445069336</li>
              <li>Phone: +91-9443369336</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary">Facebook</a>
              <a href="#" className="hover:text-primary">Instagram</a>
              <a href="#" className="hover:text-primary">Twitter</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>&copy; 2024 Rajambal Cottons. All rights reserved.</p>
          <div className="mt-2 flex items-center justify-center space-x-2 text-sm">
            <p>Designed by Prabu Vajjiram</p>
            <span>|</span>
            <Link 
              to="/admin/login" 
              className="text-primary hover:text-primary-dark transition-colors"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;