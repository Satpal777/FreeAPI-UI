import { useState } from 'react';
import { IoSearchOutline, IoMic } from "react-icons/io5";
import Popup from './Popup';
import gif2 from '../assets/gif2.gif';

export default function Search({ onSearch }) {
    const [query, setQuery] = useState("");
    const [isMicOpen, setIsMicOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="flex w-full items-center">
            <div className="flex w-full items-center border border-zinc-700 bg-[#121212] rounded-l-full px-4 py-1.5 focus-within:border-blue-500 ml-8 sm:ml-0">
                <div className="hidden focus-within:block pr-3">
                    <IoSearchOutline className="w-5 h-5 text-white" />
                </div>
                <input 
                    type="text" 
                    placeholder="Search" 
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        if (onSearch) onSearch(e.target.value);
                    }}
                    className="w-full bg-transparent outline-none text-white placeholder-zinc-400 text-base py-1"
                />
            </div>
            <button type="submit" className="border border-l-0 border-zinc-700 bg-zinc-800 hover:bg-zinc-700 px-5 py-1.5 rounded-r-full transition-colors flex items-center justify-center h-full">
                <IoSearchOutline className="w-5 h-5 text-white py-[1px]" />
            </button>
            <div className="relative">
                <button type="button" onClick={() => setIsMicOpen(true)} className="p-2 ml-4 bg-zinc-800 hover:bg-zinc-700 rounded-full flex-shrink-0 transition-colors">
                    <IoMic className="w-5 h-5 text-white" />
                </button>
                <Popup 
                    isOpen={isMicOpen} 
                    onClose={() => setIsMicOpen(false)} 
                    imageSrc={gif2} 
                    altText="Voice Search Popup" 
                    positionClasses="top-12 right-0" 
                />
            </div>
        </form>
    );
}