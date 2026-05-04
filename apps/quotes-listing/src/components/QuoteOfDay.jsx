export function QuoteOfDay({ quote }) {
    return (
        <div className="hero">
            <div className="board">
                <div className="quote">
                    "{quote?.content || "Your quote will appear here..."}"
                    {quote?.author && <div className="text-sm mt-4 text-right opacity-80">- {quote.author}</div>}
                </div>
            </div>
        </div>
    )
}