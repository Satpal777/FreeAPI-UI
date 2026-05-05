import { useState, useEffect } from 'react';

const RandomCat = () => {
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCat = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.freeapi.app/api/v1/public/cats/cat/random');
      const result = await response.json();
      if (result.success) {
        setCat(result.data);
      } else {
        setError(result.message || 'Failed to fetch cat');
      }
    } catch (err) {
      setError('Network error while fetching the cat.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCat();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-theme-green tracking-tight">
            Purr-fect Match
          </h1>
          <p className="text-theme-text/80 text-lg md:text-xl mt-2 font-medium">
            Discover a random furry friend today!
          </p>
        </div>
        <button 
          onClick={fetchCat}
          disabled={loading}
          className="bg-theme-orange hover:bg-theme-red text-white font-extrabold text-lg py-4 px-8 rounded-2xl transition-all duration-300 shadow-[0_8px_0_rgb(234,82,82)] hover:shadow-[0_4px_0_rgb(234,82,82)] hover:translate-y-1 active:shadow-none active:translate-y-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Summoning...
            </>
          ) : 'Fetch Another Cat'}
        </button>
      </div>

      {error && (
        <div className="p-6 bg-theme-red/10 border-2 border-theme-red rounded-2xl text-theme-red font-semibold mb-8 text-center text-lg">
          {error}
        </div>
      )}

      {loading && !cat && (
        <div className="flex justify-center items-center h-[500px] bg-theme-surface rounded-[2rem] shadow-sm border border-theme-yellow/30">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-8 border-theme-yellow/20 rounded-full"></div>
            <div className="absolute inset-0 border-8 border-theme-orange rounded-full border-t-transparent animate-spin"></div>
          </div>
        </div>
      )}

      {cat && (
        <div className="bg-theme-surface rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(91,126,60,0.15)] border-2 border-theme-green/10 transition-all duration-500 relative flex flex-col md:flex-row">
          
          {/* Decorative blurs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-theme-yellow opacity-10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-theme-green opacity-5 rounded-full translate-y-1/3 -translate-x-1/4 blur-3xl pointer-events-none"></div>

          <div className="relative w-full md:w-2/5 min-h-[400px] md:min-h-[600px] shrink-0">
            <img 
              src={cat.image} 
              alt={cat.name} 
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-theme-text/80 backdrop-blur-md text-white p-6">
              <div className="flex justify-between items-center">
                <span className="font-extrabold tracking-wide text-lg text-theme-yellow">{cat.origin || 'Unknown Origin'}</span>
                <span className="bg-theme-green px-4 py-1.5 rounded-full text-sm font-extrabold shadow-sm">
                  {cat.life_span} yrs
                </span>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 relative z-10 flex flex-col justify-center w-full">
            {cat.alt_names && (
              <div className="inline-block px-4 py-1.5 rounded-full bg-theme-yellow/20 text-theme-orange font-bold text-sm mb-4 self-start border border-theme-yellow/50">
                {cat.alt_names}
              </div>
            )}
            
            <h2 className="text-4xl md:text-5xl font-black text-theme-green mb-6 leading-tight">
              {cat.name}
            </h2>
            
            <p className="text-theme-text/90 leading-relaxed mb-10 text-lg font-medium">
              {cat.description}
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm uppercase tracking-widest font-black text-theme-orange mb-3">Temperament</h4>
                <div className="flex flex-wrap gap-2.5">
                  {cat.temperament?.split(', ').map(trait => (
                    <span key={trait} className="px-4 py-1.5 bg-theme-green/10 text-theme-green rounded-xl text-sm font-bold border-2 border-theme-green/20">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t-2 border-theme-yellow/30 grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div>
                  <span className="text-xs text-theme-text/60 font-black uppercase tracking-wider block mb-2">Affection</span>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map(star => (
                      <div key={star} className={`w-3 h-8 rounded-full ${star <= cat.affection_level ? 'bg-theme-red' : 'bg-theme-red/15'}`}></div>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-theme-text/60 font-black uppercase tracking-wider block mb-2">Energy</span>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map(star => (
                      <div key={star} className={`w-3 h-8 rounded-full ${star <= cat.energy_level ? 'bg-theme-orange' : 'bg-theme-orange/15'}`}></div>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-theme-text/60 font-black uppercase tracking-wider block mb-2">Intelligence</span>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map(star => (
                      <div key={star} className={`w-3 h-8 rounded-full ${star <= cat.intelligence ? 'bg-theme-yellow' : 'bg-theme-yellow/15'}`}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex gap-6">
              {cat.wikipedia_url && (
                <a href={cat.wikipedia_url} target="_blank" rel="noreferrer" className="text-theme-green hover:text-theme-orange font-bold text-base flex items-center gap-2 transition-colors group">
                  Wikipedia 
                  <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </a>
              )}
              {cat.vetstreet_url && (
                <a href={cat.vetstreet_url} target="_blank" rel="noreferrer" className="text-theme-green hover:text-theme-orange font-bold text-base flex items-center gap-2 transition-colors group">
                  VetStreet 
                  <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomCat;
