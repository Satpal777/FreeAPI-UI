export function QuoteCard({ quote }) {
    return (
        <div className="bg-zinc-800 p-4 rounded-lg shadow-md">
            <p className="text-orange-400 text-xl mb-2">"{quote.content}"</p>
            <p className="text-violet-400 text-sm text-right">- {quote.author}</p>
            <div className="flex items-center justify-between gap-4 flex-wrap mt-2">
                <p className="text-red-200 text-xs mt-2">Utpan hua tha: {quote.dateAdded}</p>
                <p className="text-pink-200 text-xs mt-2">ferfar kiya tha: {quote.dateModified}</p>
            </div>
        </div>
    )
}