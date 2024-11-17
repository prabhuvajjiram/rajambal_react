import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { loginAdmin } from '../../api';

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const mutation = useMutation({
    mutationFn: loginAdmin,
    onSuccess: (data) => {
      localStorage.setItem('adminToken', data.token);
      navigate('/admin/dashboard');
    },
    onError: (error) => {
      alert(error.response?.data?.message || 'Login failed');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(credentials);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;