import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api';
import ProductCard from '../components/ProductCard';

function Products() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold text-center mb-12">Our Products</h1>
      
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error loading products</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;