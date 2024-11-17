import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero';

function Home() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });

  return (
    <div>
      <Hero />
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">Error loading products</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products?.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;