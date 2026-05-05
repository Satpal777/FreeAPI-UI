import { useEffect, useRef } from 'react';

export default function Popup({ isOpen, onClose, imageSrc, altText, positionClasses = "" }) {
    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            setTimeout(() => document.addEventListener('mousedown', handleClickOutside), 0);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div ref={popupRef} className={`absolute z-[100] bg-[#212121] border border-zinc-700 rounded-xl shadow-2xl overflow-hidden p-2 min-w-[200px] ${positionClasses}`}>
            <img src={imageSrc} alt={altText} className="w-full h-auto rounded-lg object-contain max-h-[400px]" />
        </div>
    );
}
