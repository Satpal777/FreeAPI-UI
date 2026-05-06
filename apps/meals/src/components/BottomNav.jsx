export default function BottomNav({ onPrev, onNext, currentIndex, totalMeals, hasMore, loading }) {
  return (
    <nav className="h-[80px] md:h-[90px] flex-shrink-0 flex items-center justify-between px-4 md:px-12 bg-white/60 backdrop-blur-xl border-t border-white/50 z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
      <button 
        onClick={onPrev}
        disabled={currentIndex === 0}
        className="group flex items-center gap-2 bg-white border-2 border-brand-main/20 text-brand-dark px-5 py-3 md:px-8 md:py-4 rounded-2xl md:rounded-full shadow-sm hover:shadow-md hover:border-brand-main/50 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-bg transition-all font-bold text-sm md:text-base active:scale-95"
      >
        <svg className="w-5 h-5 transform group-hover:-translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
        <span className="hidden sm:inline">Previous</span>
      </button>
      
      <div className="flex flex-col items-center justify-center">
        <div className="text-sm md:text-base font-extrabold text-brand-dark tracking-wide bg-brand-light/20 px-4 py-1.5 rounded-full border border-brand-main/20">
          {totalMeals > 0 ? `Meal ${currentIndex + 1} / ${totalMeals}${hasMore ? '+' : ''}` : '...'}
        </div>
        <div className="flex gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex % 5 ? 'w-4 bg-brand-dark' : 'w-1.5 bg-brand-light'}`}></div>
          ))}
        </div>
      </div>

      <button 
        onClick={onNext}
        disabled={(!hasMore && currentIndex === totalMeals - 1) || loading}
        className="relative overflow-hidden group flex items-center gap-2 bg-brand-main text-white px-5 py-3 md:px-8 md:py-4 rounded-2xl md:rounded-full shadow-[0_10px_20px_-10px_rgba(47,160,132,0.6)] hover:shadow-[0_15px_25px_-10px_rgba(31,111,95,0.8)] hover:bg-brand-dark disabled:opacity-40 disabled:cursor-not-allowed transition-all font-bold text-sm md:text-base active:scale-95"
      >
        {/* Button shine effect */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
        
        {loading && currentIndex === totalMeals - 1 ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        ) : (
          <>
            <span className="hidden sm:inline">Next Meal</span>
            <span className="sm:hidden">Next</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
          </>
        )}
      </button>
    </nav>
  );
}
