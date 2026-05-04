import { useEffect, useState } from 'react'
import { QuoteCard } from './components/QuoteCard';
import { QuoteOfDay } from './components/QuoteOfDay';
import './App.css';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(false);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.freeapi.app/api/v1/public/quotes');
      const data = await response.json();
      console.log(data.data);
      setQuotes(data.data.data);
    }
    catch (error) {
      console.error('Error fetching quotes:', error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuotes();
  }, [])

  return (
    <>
      <section className='bg-zinc-950 min-h-screen w-screen box-border carrois-gothic-regular overflow-x-hidden'>
        {
          !loading ? (quotes.length > 0 ? (
            showList ? (
              <div className="pb-20">
                <h1 className='text-orange-300 text-5xl font-semibold text-center py-10'>Chai pe Farmaish</h1>
                <div className="flex justify-center mb-10">
                  <button
                    onClick={() => setShowList(false)}
                    className="bg-orange-300 hover:bg-orange-400 text-zinc-950 font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-orange-300/20"
                  >
                    ← Back to Quote of the Day
                  </button>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10'>
                  {quotes.map((quote) => (
                    <QuoteCard key={quote.id} quote={quote} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="relative h-screen w-full">
                <QuoteOfDay quote={quotes[0]} />
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
                  <button
                    onClick={() => setShowList(true)}
                    className="bg-orange-300 hover:bg-orange-400 text-zinc-950 font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 shadow-orange-300/20"
                  >
                    Explore More Quotes →
                  </button>
                </div>
              </div>
            )
          ) : (
            <div className="h-screen flex items-center justify-center">
              <p className='text-gray-400 text-center text-xl'>So javo guys 🥱</p>
            </div>
          ))
            : (
              <div className="h-screen flex items-center justify-center">
                <p className='text-gray-400 text-center text-xl animate-pulse'>Ruko Bhaya... 🏃‍♂️‍➡️me abhi quote leje aya 🏃‍♀️</p>
              </div>
            )
        }
      </section>
    </>
  )
}

export default App
