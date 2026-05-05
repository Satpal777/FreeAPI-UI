import { Suspense, lazy } from 'react';
import './App.css';

const UserList = lazy(() => import('./components/UserList'));

function App() {
  return (
    <div className="min-h-screen bg-theme-base text-theme-accent font-sans selection:bg-theme-muted/30">
      <nav className="sticky top-0 z-50 bg-theme-base/80 backdrop-blur-md border-b border-theme-surface shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
              <div className="w-10 h-10 bg-theme-surface rounded-xl shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <svg className="w-6 h-6 text-theme-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-theme-accent transition-colors">Random<span className="text-theme-muted">Users</span></span>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <Suspense fallback={
          <div className="min-h-[80vh] flex flex-col items-center justify-center">
             <div className="relative w-16 h-16 mb-6">
                <div className="absolute inset-0 border-4 border-theme-surface rounded-full"></div>
                <div className="absolute inset-0 border-4 border-theme-accent rounded-full border-t-transparent animate-spin"></div>
             </div>
             <p className="text-theme-muted font-medium animate-pulse text-lg">Loading Application...</p>
          </div>
        }>
          <UserList />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
