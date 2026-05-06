import { useState, useEffect, useCallback } from 'react';
import AmazingHeader from './components/AmazingHeader';
import Banner from './components/Banner';
import Footer from './components/Footer';
import ProductGrid from './components/ProductGrid';

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [loadClicks, setLoadClicks] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = useCallback(async (pageToFetch) => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.freeapi.app/api/v1/public/randomproducts?page=${pageToFetch}&limit=12`);
      const result = await response.json();
      
      if (result.success && result.data && result.data.data) {
        setProducts(prev => {
          const newItems = result.data.data.filter(newItem => !prev.some(p => p.id === newItem.id));
          return [...prev, ...newItems];
        });
        setHasMore(result.data.nextPage);
      } else {
        setError('Failed to load products.');
      }
    } catch (err) {
      setError('An error occurred while fetching products.');
    } finally {
      setLoading(false);
    }
  }, [hasMore]);

  useEffect(() => {
    fetchProducts(page);
  }, [page, fetchProducts]);

  const handleAddToCart = (product) => {
    setCartCount(prev => prev + 1);
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage(prev => prev + 1);
      setLoadClicks(prev => prev + 1);
    }
  };

  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-amazon-bg font-sans text-gray-900 flex flex-col">
      <AmazingHeader 
        cartCount={cartCount} 
        searchTerm={searchTerm} 
        onSearchChange={(e) => setSearchTerm(e.target.value)} 
      />

      <main className="flex-1 w-full max-w-[1500px] mx-auto pb-12">
        <Banner />
        <ProductGrid 
          products={filteredProducts}
          loading={loading}
          error={error}
          hasMore={hasMore}
          onAddToCart={handleAddToCart}
          onLoadMore={loadMore}
          loadClicks={loadClicks}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
