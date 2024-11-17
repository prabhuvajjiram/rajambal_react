import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts, deleteProduct } from '../../api';
import AdminLayout from '../../components/admin/AdminLayout';
import ProductForm from '../../components/admin/ProductForm';

function Products() {
  const queryClient = useQueryClient();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    }
  });

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <AdminLayout>Loading...</AdminLayout>;
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
        >
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products?.map((product) => (
              <tr key={product._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={product.image_path}
                    alt={product.title}
                    className="h-12 w-12 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{product.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">₹{product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(isAddModalOpen || editingProduct) && (
        <ProductForm
          product={editingProduct}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingProduct(null);
          }}
        />
      )}
    </AdminLayout>
  );
}

export default Products;