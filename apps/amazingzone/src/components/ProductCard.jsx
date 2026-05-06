import { useState } from 'react';

export default function ProductCard({ product, onAddToCart }) {
  const [added, setAdded] = useState(false);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<svg key={i} fill="currentColor" viewBox="0 0 576 512" className="text-amazon-orange w-4 h-4"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>);
      } else if (rating >= i - 0.5) {
        stars.push(<svg key={i} fill="currentColor" viewBox="0 0 536 512" className="text-amazon-orange w-4 h-4"><path d="M508.55 171.51L362.18 150.2 296.77 17.81C290.89 5.98 279.42 0 267.95 0c-11.4 0-22.79 5.9-28.69 17.81l-65.43 132.38-146.38 21.29c-26.25 3.8-36.73 36.09-17.74 54.59l105.89 103-25.06 145.48C86.98 495.33 103.57 512 122.15 512c4.93 0 10-1.17 14.87-3.75l130.95-68.68 130.94 68.7c4.86 2.55 9.92 3.71 14.83 3.71 18.6 0 35.22-16.61 31.66-37.4l-25.03-145.49 105.91-102.98c19.04-18.5 8.52-50.8-17.73-54.6zm-121.74 123.2l-18.12 17.62 4.28 24.88 19.52 113.45-102.13-53.59-22.38-11.74.03-317.19 51.03 103.29 11.18 22.63 25.01 3.64 114.23 16.63-82.65 80.38z"/></svg>);
      } else {
        stars.push(<svg key={i} fill="currentColor" viewBox="0 0 576 512" className="text-amazon-orange w-4 h-4"><path d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"/></svg>);
      }
    }
    return stars;
  };

  const wholePrice = Math.floor(product.price);
  const fractionPrice = Math.round((product.price - wholePrice) * 100).toString().padStart(2, '0');
  
  const handleAddClick = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200 flex flex-col h-full hover:shadow-lg transition-shadow">
      <div className="w-full h-48 bg-gray-50 mb-4 flex items-center justify-center p-2 rounded relative group cursor-pointer">
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
          loading="lazy"
        />
        {product.discountPercentage > 10 && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-sm">
            {Math.round(product.discountPercentage)}% OFF
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1">
        <h2 className="text-base font-medium text-black line-clamp-2 hover:text-amazon-orange cursor-pointer leading-snug mb-1">
          {product.title}
        </h2>
        
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
          {product.brand} • {product.category}
        </p>

        <div className="flex items-center gap-1 mb-2 cursor-pointer">
          <div className="flex">{renderStars(product.rating)}</div>
          <span className="text-amazon-blue text-sm hover:text-red-700 hover:underline">
            {product.rating}
          </span>
        </div>

        <div className="mb-2 mt-auto">
          <div className="flex items-start text-black">
            <span className="text-sm mt-1">₹</span>
            <span className="text-[28px] font-bold leading-none">{wholePrice}</span>
            <span className="text-sm mt-1">{fractionPrice}</span>
          </div>
          {product.discountPercentage > 0 && (
            <div className="text-xs text-gray-500">
              List: <span className="line-through">₹{(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}</span>
            </div>
          )}
        </div>

        <div className="text-xs text-gray-600 mb-4">
          <span className="font-bold text-gray-800">FREE delivery</span> Tomorrow
        </div>

        <button 
          onClick={handleAddClick}
          className={`w-full border rounded-full py-2 text-sm text-black font-semibold shadow-sm transition-all duration-300 transform ${
            added 
              ? 'bg-green-400 border-green-500 scale-105 rotate-1 text-white' 
              : 'bg-amazon-yellow hover:bg-yellow-500 active:bg-yellow-600 border-yellow-500 hover:scale-[1.02]'
          }`}
        >
          {added ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
