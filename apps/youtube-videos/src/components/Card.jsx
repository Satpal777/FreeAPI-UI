import { forwardRef } from 'react';
import { formatCount, timeAgo, parseDuration } from '../utils/formatters';
import { BiLike, BiCommentDetail } from 'react-icons/bi';

const Card = forwardRef(({ video }, ref) => {
    const item = video.items || {};
    const snippet = item.snippet || {};
    const statistics = item.statistics || {};
    const contentDetails = item.contentDetails || {};

    const thumbnails = snippet.thumbnails || {};
    const thumbnail = thumbnails.maxres || thumbnails.high || thumbnails.medium || thumbnails.default || {};

    return (
        <div ref={ref} className="flex flex-col gap-3 cursor-pointer group w-full hover:bg-amber-900/15 p-4 rounded-lg transition-all duration-300">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-zinc-800">
                <img
                    src={thumbnail.url}
                    alt={snippet.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                />
                {contentDetails.duration && (
                    <div className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">
                        {parseDuration(contentDetails.duration)}
                    </div>
                )}
            </div>

            <div className="flex gap-4 items-start pr-4">
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-zinc-700 flex items-center justify-center overflow-hidden">
                    <img 
                        src="https://avatars.githubusercontent.com/u/11613311?v=4" 
                        alt={snippet.channelTitle} 
                        className="w-full h-full object-cover" 
                    />
                </div>

                <div className="flex flex-col w-full">
                    <h3 className="text-white text-[17px] font-semibold line-clamp-2 leading-snug group-hover:text-blue-500 transition-colors">
                        {snippet.title}
                    </h3>
                    <div className="text-zinc-400 text-[14.5px] mt-1.5 flex flex-col gap-0.5">
                        <span className="hover:text-white transition-colors">{snippet.channelTitle}</span>
                        <div className="flex flex-wrap items-center gap-1.5">
                            <span>{formatCount(statistics.viewCount)} views</span>
                            <span className="text-[10px]">•</span>
                            <span>{timeAgo(snippet.publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-1.5 text-[14px] text-zinc-500 font-medium">
                            <div className="flex items-center gap-1.5 hover:text-white transition-colors" title="Likes">
                                <BiLike className="w-[18px] h-[18px]" />
                                <span>{formatCount(statistics.likeCount)}</span>
                            </div>
                            <div className="flex items-center gap-1.5 hover:text-white transition-colors" title="Comments">
                                <BiCommentDetail className="w-[18px] h-[18px]" />
                                <span>{formatCount(statistics.commentCount)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

Card.displayName = 'Card';

export default Card;