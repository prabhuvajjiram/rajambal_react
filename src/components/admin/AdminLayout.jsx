import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    queryClient.clear();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/admin/dashboard" className="flex items-center">
                <span className="text-xl font-bold text-primary">Admin Panel</span>
              </Link>
              <div className="ml-10 flex items-center space-x-4">
                <Link
                  to="/admin/dashboard"
                  className="text-gray-700 hover:text-primary px-3 py-2 rounded-md"
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/products"
                  className="text-gray-700 hover:text-primary px-3 py-2 rounded-md"
                >
                  Products
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-primary px-3 py-2 rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}

export default AdminLayout;