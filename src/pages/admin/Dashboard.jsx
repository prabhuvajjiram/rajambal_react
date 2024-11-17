import { useQuery } from '@tanstack/react-query';
import { getAdminStats } from '../../api';
import AdminLayout from '../../components/admin/AdminLayout';

function Dashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: getAdminStats
  });

  if (isLoading) {
    return <AdminLayout>Loading...</AdminLayout>;
  }

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Products</h3>
          <p className="text-3xl font-bold text-primary">{stats?.totalProducts || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-primary">{stats?.totalOrders || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-primary">₹{stats?.totalRevenue || 0}</p>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;