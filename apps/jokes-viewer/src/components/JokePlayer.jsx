import { useState } from 'react';
import Card from './Card';

export default function JokePlayer({ joke, onNext, onPrev, hasNext, hasPrev, isLoading }) {
    const [startX, setStartX] = useState(null);
    const [endX, setEndX] = useState(null);
    const [swipeState, setSwipeState] = useState('idle');

    const minSwipeDistance = 50;

    const onDragStart = (e) => {
        if (swipeState !== 'idle' && swipeState !== 'fly-in') return;
        
        const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        
        setStartX(clientX);
        setEndX(null);
        setSwipeState('dragging');
    };

    const onDragMove = (e) => {
        if (swipeState !== 'dragging') return;
        
        const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        setEndX(clientX);
    };

    const onDragEnd = () => {
        if (swipeState !== 'dragging') return;
        
        if (startX === null || endX === null) {
            setSwipeState('idle');
            return;
        }
        
        const distance = startX - endX;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        const canGoNext = isLeftSwipe && hasNext && !isLoading;
        const canGoPrev = isRightSwipe && hasPrev && !isLoading;

        if (canGoNext || canGoPrev) {
            setSwipeState('fly-out');
            setEndX(startX - (isLeftSwipe ? 1000 : -1000));
            
            setTimeout(() => {
                if (canGoNext) onNext();
                if (canGoPrev) onPrev();
                
                setStartX(null);
                setEndX(null);
                setSwipeState('fly-in');
                
                setTimeout(() => {
                    setSwipeState('idle');
                }, 50);
            }, 300);

        } else {
            setStartX(null);
            setEndX(null);
            setSwipeState('idle');
        }
    };

    let dragOffset = 0;
    if (startX !== null && endX !== null) {
        dragOffset = endX - startX;
    }
    
    let transitionStyle = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    if (swipeState === 'dragging') transitionStyle = 'none';
    if (swipeState === 'fly-out') transitionStyle = 'all 0.3s ease-out';
    if (swipeState === 'fly-in') transitionStyle = 'none';

    const cardOpacity = (swipeState === 'fly-out' || swipeState === 'fly-in') ? 0 : 1;
    const cardScale = swipeState === 'fly-in' ? 0.95 : 1;

    const cardStyle = {
        transform: `translateX(${dragOffset}px) rotate(${dragOffset * 0.05}deg) scale(${cardScale})`,
        transition: transitionStyle,
        opacity: cardOpacity
    };

    return (
        <div className='mt-10 flex flex-col items-center justify-center flex-1 w-full max-w-4xl px-4 select-none'>
            <div 
                className="flex-1 w-full flex justify-center min-h-[300px] items-center cursor-grab active:cursor-grabbing overflow-visible"
                onTouchStart={onDragStart}
                onTouchMove={onDragMove}
                onTouchEnd={onDragEnd}
                onMouseDown={onDragStart}
                onMouseMove={onDragMove}
                onMouseUp={onDragEnd}
                onMouseLeave={onDragEnd}
            >
                <div style={cardStyle} className="w-full flex justify-center relative z-20">
                    {joke ? (
                        <Card joke={joke} />
                    ) : (
                        <div className="w-16 h-16 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
                    )}
                </div>
            </div>
        </div>
    );
}