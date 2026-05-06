import ProductCard from './ProductCard';

export default function ProductGrid({ 
  products, 
  loading, 
  error, 
  hasMore, 
  onAddToCart, 
  onLoadMore, 
  loadClicks 
}) {
  return (
    <div className="px-4 mt-10 relative z-20">
      
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md shadow border border-red-200 mb-6">
          {error}
        </div>
      )}

      {products.length === 0 && !loading && (
        <div className="w-full flex justify-center py-12 text-gray-500 font-medium">
          No products match your search.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      {loading && (
        <div className="w-full flex justify-center my-8">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-amazon-orange rounded-full animate-spin"></div>
        </div>
      )}

      {!loading && hasMore && products.length > 0 && (
        <div className="w-full flex justify-center mt-8">
          <button 
            onClick={onLoadMore}
            className={`px-6 py-2 rounded-md shadow-sm text-sm font-semibold text-gray-800 transition-all duration-500 ease-out transform ${
              loadClicks >= 3 
                ? 'hover:-translate-y-2 hover:rotate-3 hover:bg-amazon-yellow hover:scale-110 bg-white border border-amazon-orange shadow-amazon-orange/50' 
                : 'bg-white border border-gray-300 hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-md'
            }`}
          >
            {loadClicks >= 5 ? "Whoa, save some products for the rest of us!" : loadClicks >= 3 ? "Okay, you really like scrolling..." : "Load More Products"}
          </button>
        </div>
      )}

      {!loading && !hasMore && products.length > 0 && (
        <div className="w-full flex justify-center mt-8">
          <p className="text-gray-500 text-sm">No more products to show.</p>
        </div>
      )}
    </div>
  );
}
