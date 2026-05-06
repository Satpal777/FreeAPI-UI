export default function MealCard({ currentMeal }) {
  const getIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== '') {
        ingredients.push({
          name: ingredient.trim(),
          measure: measure ? measure.trim() : ''
        });
      }
    }
    return ingredients;
  };

  return (
    <div className="w-full h-full max-h-[850px] bg-white/70 backdrop-blur-2xl rounded-3xl md:rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(47,160,132,0.15)] border border-white/60 flex flex-col md:flex-row overflow-hidden transform transition-all duration-500">
      {/* Left: Image Section (Fixed flex block) */}
      <div className="w-full h-[35%] md:h-full md:w-[45%] relative group overflow-hidden flex-shrink-0">
        <img 
          src={currentMeal.strMealThumb} 
          alt={currentMeal.strMeal} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80"></div>
        
        <div className="absolute top-4 left-4 md:top-6 md:left-6 flex flex-wrap gap-2">
          <span className="bg-brand-dark/90 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-2xl shadow-lg uppercase tracking-wider transform transition hover:-translate-y-1 hover:shadow-brand-dark/40 cursor-default">
            {currentMeal.strCategory}
          </span>
          <span className="bg-white/90 backdrop-blur-md text-brand-dark text-xs font-bold px-4 py-2 rounded-2xl shadow-lg cursor-default">
            {currentMeal.strArea}
          </span>
        </div>

        {/* Title overlay on mobile (only visible if we want, but better in right pane) */}
        <div className="absolute bottom-4 left-4 right-4 md:hidden">
          <h2 className="text-2xl font-extrabold text-white leading-tight drop-shadow-md">
            {currentMeal.strMeal}
          </h2>
        </div>
      </div>

      {/* Right: Content Section (Scrollable internally) */}
      <div className="flex-1 flex flex-col p-5 md:p-8 lg:p-10 min-h-0 bg-white/40">
        
        {/* Title area (Hidden on mobile image overlay, shown here) */}
        <div className="hidden md:block flex-shrink-0 mb-6 border-b border-brand-main/10 pb-4">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 leading-tight tracking-tight">
            {currentMeal.strMeal}
          </h2>
          {currentMeal.strTags && (
            <div className="flex flex-wrap gap-2 mt-2">
              {currentMeal.strTags.split(',').map((tag, idx) => (
                <span key={idx} className="text-xs bg-brand-light/20 text-brand-dark border border-brand-light/30 px-3 py-1.5 rounded-xl font-semibold uppercase tracking-wider transition-colors hover:bg-brand-light/40">
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Scrollable Content (Ingredients & Instructions) */}
        <div className="flex-1 overflow-y-auto pr-2 md:pr-4 space-y-8 custom-scrollbar">
          
          {/* Ingredients */}
          <div className="bg-white/50 p-5 rounded-3xl border border-white">
            <h3 className="text-lg font-bold text-brand-dark mb-4 flex items-center gap-2">
              <span className="bg-brand-main/20 p-2 rounded-xl text-brand-main">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              </span>
              Ingredients
            </h3>
            <div className="flex flex-wrap gap-2">
              {getIngredients(currentMeal).map((ing, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-light transition-all group">
                  <span className="font-bold text-brand-main">{ing.measure}</span>
                  <span className="text-gray-700 font-medium group-hover:text-brand-dark transition-colors">{ing.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white/50 p-5 rounded-3xl border border-white">
            <h3 className="text-lg font-bold text-brand-dark mb-4 flex items-center gap-2">
              <span className="bg-brand-main/20 p-2 rounded-xl text-brand-main">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              </span>
              Instructions
            </h3>
            <div className="text-gray-700 leading-relaxed space-y-4 font-medium">
              {currentMeal.strInstructions.split('\n').filter(line => line.trim() !== '').map((para, idx) => (
                <div key={idx} className="flex gap-4">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-light/30 text-brand-dark flex items-center justify-center text-xs font-bold mt-0.5">{idx + 1}</span>
                  <p>{para}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Links (Fixed inside right pane) */}
        <div className="flex-shrink-0 pt-5 mt-2 border-t border-brand-main/10 flex flex-wrap gap-3 items-center">
          {currentMeal.strYoutube && (
            <a 
              href={currentMeal.strYoutube} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 md:flex-none flex items-center justify-center gap-2 font-bold bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white px-5 py-3 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg shadow-red-500/20"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              Watch Video
            </a>
          )}
          {currentMeal.strSource && (
            <a 
              href={currentMeal.strSource} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 md:flex-none flex items-center justify-center gap-2 font-bold bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 px-5 py-3 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
