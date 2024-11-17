import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct, updateProduct } from '../../api';

function ProductForm({ product, onClose }) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: product?.title || '',
    description: product?.description || '',
    price: product?.price || '',
    image: null,
    colors: product?.colors || []
  });

  const mutation = useMutation({
    mutationFn: product ? updateProduct : createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      onClose();
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'colors') {
        formData.colors.forEach((color, index) => {
          data.append(`colors[${index}][name]`, color.name);
          if (color.image instanceof File) {
            data.append(`colors[${index}][image]`, color.image);
          }
        });
      } else if (key === 'image' && formData[key]) {
        data.append(key, formData[key]);
      } else {
        data.append(key, formData[key]);
      }
    });

    if (product) {
      data.append('id', product._id);
    }

    mutation.mutate(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">
          {product ? 'Edit Product' : 'Add Product'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Image</label>
            <input
              type="file"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              className="w-full"
              accept="image/*"
              required={!product}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;