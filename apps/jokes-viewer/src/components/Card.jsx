import img1 from '../assets/r1.png';
import img2 from '../assets/r2.png';
import img3 from '../assets/r3.png';

export default function Card({ joke }) {
    if (!joke) return null;

    if (joke.isImageOnly) {
        let imageSrc = img1;
        if (joke.imageIndex === 1) imageSrc = img2;
        if (joke.imageIndex === 2) imageSrc = img3;
        return (
            <div className="bg-zinc-900 border-2 border-orange-500/30 w-full max-w-md p-6 rounded-2xl shadow-2xl backdrop-blur-sm transition-all hover:border-orange-500/50 flex flex-col items-center">
                <div className="w-full relative rounded-xl overflow-hidden shadow-md border border-white/10 shrink-0 bg-zinc-800 flex items-center justify-center">
                    <img
                        src={imageSrc}
                        alt="Random visual"
                        className="w-full h-auto max-h-[60vh] object-contain select-none pointer-events-none"
                        draggable="false"
                    />
                </div>
            </div>
        );
    }

    const content = joke.content || joke.joke || "No joke content found.";

    return (
        <div className="bg-zinc-900 border-2 border-orange-500/30 w-full max-w-md p-10 rounded-2xl shadow-2xl backdrop-blur-sm transition-all hover:border-orange-500/50 flex flex-col items-center gap-0">
            <div className="overflow-y-auto pr-2 custom-scrollbar w-full max-h-[300px]">
                <p className="text-xl md:text-2xl font-medium leading-relaxed text-zinc-100 text-center">
                    "{content}"
                </p>
            </div>
        </div>
    );
}