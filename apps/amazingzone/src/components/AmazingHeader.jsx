import { useState } from 'react';

export default function AmazingHeader({ cartCount, searchTerm, onSearchChange }) {
  const [spinLogo, setSpinLogo] = useState(false);

  const handleLogoClick = () => {
    if (spinLogo) return;
    setSpinLogo(true);
    setTimeout(() => setSpinLogo(false), 1000);
  };

  return (
    <header className="w-full flex flex-col z-50 relative">
      <div className="bg-amazon-header h-16 w-full flex items-center px-4 gap-4 text-white">
        <div 
          onClick={handleLogoClick}
          className={`flex items-center gap-1 border border-transparent hover:border-white p-1 rounded cursor-pointer transition-transform duration-1000 ${spinLogo ? 'rotate-[360deg] scale-110' : ''}`}
        >
          <span className="font-bold text-xl tracking-wide">Amazing</span>
          <span className="font-bold text-xl text-amazon-orange">Zone</span>
        </div>

        <div className="hidden md:flex items-end gap-1 border border-transparent hover:border-white p-1 rounded cursor-pointer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white mb-1 w-[18px] h-[18px]"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <div className="flex flex-col">
            <span className="text-[11px] text-gray-300 leading-3">Deliver to</span>
            <span className="text-sm font-bold leading-4">Your Location</span>
          </div>
        </div>

        <div className="flex-1 hidden sm:flex h-10 rounded-md overflow-hidden bg-white focus-within:ring-2 focus-within:ring-amazon-orange">
          <select className="bg-gray-100 border-r border-gray-300 text-black text-xs px-2 outline-none cursor-pointer hover:bg-gray-200 w-auto">
            <option>All</option>
          </select>
          <input 
            type="text" 
            placeholder="Search Amazing Zone"
            value={searchTerm}
            onChange={onSearchChange}
            className="flex-1 px-3 text-black outline-none h-full"
          />
          <button className="bg-amazon-orange w-12 flex items-center justify-center hover:bg-yellow-500 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 w-5 h-5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
        </div>

        <div className="flex flex-col border border-transparent hover:border-white p-1 rounded cursor-pointer ml-auto sm:ml-0">
          <span className="text-[11px] text-gray-300 leading-3">Hello, sign in</span>
          <span className="text-sm font-bold leading-4 flex items-center">Account & Lists</span>
        </div>

        <div className="hidden lg:flex flex-col border border-transparent hover:border-white p-1 rounded cursor-pointer">
          <span className="text-[11px] text-gray-300 leading-3">Returns</span>
          <span className="text-sm font-bold leading-4">& Orders</span>
        </div>

        <div className="flex items-end border border-transparent hover:border-white p-1 rounded cursor-pointer relative">
          <div className="relative">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            <span className="absolute -top-1 left-3 text-amazon-orange font-bold text-sm bg-amazon-header rounded-full px-1">{cartCount}</span>
          </div>
          <span className="text-sm font-bold hidden md:block ml-1">Cart</span>
        </div>
      </div>

      <div className="bg-amazon-sub h-10 w-full flex items-center px-4 gap-4 text-white text-sm overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-1 border border-transparent hover:border-white p-1 rounded cursor-pointer flex-shrink-0 font-bold">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          <span>All</span>
        </div>
        <a href="#" className="border border-transparent hover:border-white p-1 rounded whitespace-nowrap">Today's Deals</a>
        <a href="#" className="border border-transparent hover:border-white p-1 rounded whitespace-nowrap">Customer Service</a>
        <a href="#" className="border border-transparent hover:border-white p-1 rounded whitespace-nowrap">Registry</a>
        <a href="#" className="border border-transparent hover:border-white p-1 rounded whitespace-nowrap">Gift Cards</a>
        <a href="#" className="border border-transparent hover:border-white p-1 rounded whitespace-nowrap">Sell</a>
      </div>

      <div className="bg-amazon-header p-3 flex sm:hidden h-14">
        <div className="flex-1 flex rounded-md overflow-hidden bg-white">
          <input 
            type="text" 
            placeholder="Search Amazing Zone"
            value={searchTerm}
            onChange={onSearchChange}
            className="flex-1 px-3 text-black outline-none h-full"
          />
          <button className="bg-amazon-orange w-12 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 w-5 h-5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
        </div>
      </div>
    </header>
  );
}
