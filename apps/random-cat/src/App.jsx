import RandomCat from './components/RandomCat';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-theme-bg font-sans selection:bg-theme-yellow/30 selection:text-theme-text flex flex-col">
      <nav className="bg-theme-surface border-b-4 border-theme-yellow shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-theme-yellow rounded-2xl flex items-center justify-center transform -rotate-6 shadow-sm border-2 border-theme-orange">
                <svg className="w-7 h-7 text-theme-red" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M226.78,131.55l-21.75-22a4.42,4.42,0,0,1-.5-5.69c8.47-13.62,11.23-28.79,8.21-45.06a8,8,0,0,0-5.83-6.28c-16.19-3.79-31.52-1.39-45.56,7.15a4.4,4.4,0,0,1-5.6-.4l-23-21.57a16,16,0,0,0-21.84-.28l-23.7,21.9a4.39,4.39,0,0,1-5.59.5C67.6,51.27,52.27,48.87,36.08,52.66a8,8,0,0,0-5.83,6.28c-3,16.27-.26,31.44,8.21,45.06a4.42,4.42,0,0,1-.5,5.69l-21.75,22a16,16,0,0,0,0,22.79l18.41,18.63A104,104,0,0,0,128,224a103.3,103.3,0,0,0,93.4-51l18.41-18.63A16,16,0,0,0,226.78,131.55ZM128,208a87.49,87.49,0,0,1-76.41-44.52l-1.34-2.45L31.62,142.22l20.48-20.73A20.42,20.42,0,0,0,54.43,95.1C47.88,85,45.69,73.83,48,61.42c12.24-2.27,23.3-.1,33.24,6.34a20.4,20.4,0,0,0,26.68-2.07l22-20.28,21.32,20a20.4,20.4,0,0,0,26.74,1.83c9.94-6.44,21-8.61,33.24-6.34,2.33,12.41.14,23.59-6.41,33.68a20.42,20.42,0,0,0,2.33,26.39l20.48,20.73L209.2,161a87.61,87.61,0,0,1-81.2,47Z"></path>
                </svg>
              </div>
              <span className="font-black text-2xl md:text-3xl tracking-tight text-theme-green">
                Random<span className="text-theme-orange">Cat</span>
              </span>
            </div>
            <div>
              <a href="https://github.com/Satpal777" target="_blank" rel="noreferrer" className="text-sm font-black text-theme-text/40 hover:text-theme-red transition-colors uppercase tracking-widest">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 py-8 md:py-12">
        <RandomCat />
      </main>
      
      <footer className="py-6 text-center text-sm font-bold text-theme-text/40 border-t border-theme-text/10 mt-auto">
        Powered by FreeAPI.app
      </footer>
    </div>
  );
}

export default App;
