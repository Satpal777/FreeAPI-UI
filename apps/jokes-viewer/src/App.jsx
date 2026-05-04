import { useEffect, useState, useCallback } from 'react'
import './App.css'
import JokePlayer from './components/JokePlayer'


function App() {

  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState(null);

  const fetchJokes = useCallback(async (page = 1, signal) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.freeapi.app/api/v1/public/randomjokes?limit=10&page=${page}`, {
        headers: {
          'Accept': 'application/json',
        },
        signal
      });
      const data = await response.json();
      if (data?.data?.data) {
        const jokesWithImages = data.data.data.flatMap((joke, index) => [
          joke,
          { isImageOnly: true, id: `img-${joke.id || Math.random()}`, imageIndex: index % 3 }
        ]);

        if (page === 1) {
          setJokes(jokesWithImages);
          setCurrentIndex(0);
        } else {
          setJokes(prev => [...prev, ...jokesWithImages]);
        }
        setPaginationInfo({
          nextPage: data.data.nextPage,
          totalPages: data.data.totalPages,
          totalItems: data.data.totalItems
        });
        setCurrentPage(page);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted');
      } else {
        setError(error.message || "An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    fetchJokes(1, abortController.signal);
    return () => {
      abortController.abort()
    }
  }, [fetchJokes])

  const handleNext = () => {
    if (currentIndex < jokes.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (paginationInfo?.nextPage && !isLoading) {
      fetchJokes(currentPage + 1);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div className="h-screen w-full bg-zinc-950 flex flex-col items-center p-6 md:p-12 text-white font-sans overflow-hidden">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl md:text-6xl font-black text-orange-400 tracking-tighter">
          Hasi ke Tahake 😁
        </h1>
        <p className="text-zinc-500 text-sm md:text-base font-medium max-w-md mx-auto">
          Unleash the laughter with our curated collection of random jokes.
        </p>
      </div>

      <div className="flex-1 w-full flex items-center justify-center overflow-hidden">
        {jokes.length > 0 ? (
          <JokePlayer
            joke={jokes[currentIndex]}
            onNext={handleNext}
            onPrev={handlePrev}
            hasPrev={currentIndex > 0}
            hasNext={currentIndex < jokes.length - 1 || !!paginationInfo?.nextPage}
            isLoading={isLoading}
          />
        ) : (
          <div className="flex flex-col items-center gap-4">
            {isLoading ? (
              <>
                <div className="w-10 h-10 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
                <p className="text-orange-400/60 font-bold tracking-widest uppercase text-xs">Curating humor...</p>
              </>
            ) : (
              <p className="text-zinc-500">No jokes found. <button onClick={() => fetchJokes()} className="text-orange-400 underline">Try again</button></p>
            )}
          </div>
        )}
      </div>

      <div className="py-6 text-zinc-700 text-[10px] md:text-[12px] font-bold uppercase tracking-[0.4em] text-center">
        Haste Raho ☕ Pite Raho
      </div>

      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 flex items-center gap-3 text-orange-500/40 pointer-events-none select-none animate-pulse">
        <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">Swipe to Browse</span>
        <div className="flex gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce-x"><path d="m15 18-6-6 6-6" /></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce-x-reverse"><path d="m9 18 6-6-6-6" /></svg>
        </div>
      </div>
    </div>
  )
}

export default App
