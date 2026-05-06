import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Background from './components/Background';
import MealCard from './components/MealCard';
import BottomNav from './components/BottomNav';
import './App.css';

function App() {
  const [meals, setMeals] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const fetchMeals = useCallback(async (pageToFetch) => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.freeapi.app/api/v1/public/meals?page=${pageToFetch}&limit=10`);
      const result = await response.json();
      
      if (result.success && result.data && result.data.data) {
        const newMeals = result.data.data;
        setMeals(prev => [...prev, ...newMeals]);
        setHasMore(result.data.nextPage);
      } else {
        setError('Failed to load meals.');
      }
    } catch (err) {
      setError('An error occurred while fetching meals.');
    } finally {
      setLoading(false);
    }
  }, [hasMore]);

  useEffect(() => {
    fetchMeals(page);
  }, [page, fetchMeals]);

  const handleNext = () => {
    if (currentIndex < meals.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
    
    // Lazy load next page when approaching the end
    if (currentIndex >= meals.length - 3 && hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const currentMeal = meals[currentIndex];

  return (
    <div className="h-[100dvh] w-full overflow-hidden relative bg-brand-bg flex flex-col font-sans text-gray-800 selection:bg-brand-light selection:text-brand-dark">
      
      <Background />
      <Header />

      {/* Main Content Area (Flexible Height, strictly no body scrolling) */}
      <main className="flex-1 min-h-0 p-3 md:p-6 lg:p-8 flex items-center justify-center relative z-10 w-full max-w-7xl mx-auto">
        
        {error && (
          <div className="bg-red-100/90 backdrop-blur-md text-red-700 p-4 rounded-2xl shadow-lg border border-red-200">
            {error}
          </div>
        )}

        {meals.length === 0 && loading && (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-brand-light border-t-brand-dark rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-4 border-brand-main border-b-transparent rounded-full animate-[spin_1.5s_reverse_infinite]"></div>
            </div>
            <p className="text-brand-dark font-bold text-lg animate-pulse tracking-wide">Cooking up recipes...</p>
          </div>
        )}

        {currentMeal && <MealCard currentMeal={currentMeal} />}
      </main>

      <BottomNav 
        onPrev={handlePrev}
        onNext={handleNext}
        currentIndex={currentIndex}
        totalMeals={meals.length}
        hasMore={hasMore}
        loading={loading}
      />

    </div>
  );
}

export default App;
