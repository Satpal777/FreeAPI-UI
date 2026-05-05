import { useState } from "react";
import Search from "./Search";
import { IoMenuOutline, IoSearchOutline, IoNotificationsOutline } from "react-icons/io5";
import { BiVideoPlus } from "react-icons/bi";
import { FaYoutube } from "react-icons/fa";
import Popup from "./Popup";

import gif1 from "../assets/gif1.gif";
import gif3 from "../assets/gif3.gif";
import gif4 from "../assets/gif4.gif";
import gif5 from "../assets/gif5.gif";

export default function Header({ onSearch }) {
    const [activePopup, setActivePopup] = useState(null);

    const popupConfig = {
        menu: { imageSrc: gif1, altText: "Menu Popup", positionClasses: "top-14 left-4" },
        video: { imageSrc: gif3, altText: "Create Video Popup", positionClasses: "top-14 right-28" },
        bell: { imageSrc: gif4, altText: "Notifications Popup", positionClasses: "top-14 right-14" },
        profile: { imageSrc: gif5, altText: "Profile Popup", positionClasses: "top-14 right-4" }
    };

    const currentPopup = activePopup ? popupConfig[activePopup] : null;

    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-[#0f0f0f] flex items-center justify-between px-4 z-50">
            <div className="flex items-center gap-4">
                <button onClick={() => setActivePopup('menu')} className="p-2 hover:bg-zinc-800 rounded-full">
                    <IoMenuOutline className="w-6 h-6 text-white" />
                </button>
                
                <div className="flex items-center gap-1 cursor-pointer">
                    <FaYoutube className="text-[#FF0000] w-8 h-8" />
                    <span className="text-[21px] font-semibold tracking-tighter text-white" style={{ fontFamily: '"Roboto", Arial, sans-serif' }}>
                        YouTube
                    </span>
                </div>
            </div>
            
            <div className="flex-1 max-w-[720px] ml-10 mr-4 hidden sm:flex justify-center">
                <Search onSearch={onSearch} />
            </div>

            <div className="flex items-center gap-2">
                <button className="sm:hidden p-2 hover:bg-zinc-800 rounded-full">
                    <IoSearchOutline className="w-6 h-6 text-white" />
                </button>
                
                <button onClick={() => setActivePopup('video')} className="p-2 hover:bg-zinc-800 rounded-full hidden sm:block">
                    <BiVideoPlus className="w-6 h-6 text-white" />
                </button>

                <button onClick={() => setActivePopup('bell')} className="p-2 hover:bg-zinc-800 rounded-full">
                    <IoNotificationsOutline className="w-6 h-6 text-white" />
                </button>

                <div onClick={() => setActivePopup('profile')} className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-medium text-white ml-2 cursor-pointer">
                    S
                </div>
            </div>

            {currentPopup && (
                <Popup 
                    isOpen={!!currentPopup} 
                    onClose={() => setActivePopup(null)} 
                    imageSrc={currentPopup.imageSrc} 
                    altText={currentPopup.altText} 
                    positionClasses={currentPopup.positionClasses} 
                />
            )}
        </header>
    );
}