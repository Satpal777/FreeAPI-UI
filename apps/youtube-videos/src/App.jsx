import { useEffect, useState, useRef, useCallback } from 'react';
import './App.css';
import Header from './components/Header';
import Card from './components/Card';

function App() {
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const observer = useRef();

  const lastVideoElementRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();

    // Disable intersection observer if loading OR if there is an active search query
    if (loading || searchQuery) return;

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore, searchQuery]);

  useEffect(() => {
    const abortController = new AbortController();

    const getData = async () => {
      setLoading(true);
      try {
        const result = await fetch(
          `https://api.freeapi.app/api/v1/public/youtube/videos?page=${page}&limit=10`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            signal: abortController.signal
          }
        );
        const json = await result.json();

        if (json.success && json.data && Array.isArray(json.data.data)) {
          setYoutubeVideos(prev => {
            // Avoid duplicates by comparing the correct id path (items.id)
            const newVideos = json.data.data.filter(
              newVid => !prev.some(existingVid => existingVid?.items?.id === newVid?.items?.id)
            );
            return [...prev, ...newVideos];
          });
          setHasMore(json.data.nextPage);
        }

        // Only turn off loading if the request wasn't aborted
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error("Failed to fetch videos", error);
          setLoading(false);
        }
      }
    };

    getData();

    return () => {
      abortController.abort();
    };
  }, [page]);

  // Filter videos based on the search query
  const displayedVideos = youtubeVideos.filter(video => {
    if (!searchQuery) return true;
    const title = video?.items?.snippet?.title?.toLowerCase() || '';
    const channel = video?.items?.snippet?.channelTitle?.toLowerCase() || '';
    const query = searchQuery.toLowerCase();
    return title.includes(query) || channel.includes(query);
  });

  return (
    <div className="min-h-screen w-full bg-[#0f0f0f] text-white font-sans selection:bg-blue-500/30">
      <Header onSearch={setSearchQuery} />
      <div className="pt-24 px-4 md:px-6 pb-12 max-w-[2400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayedVideos.map((video, index) => {
            const videoId = video?.items?.id || index;
            if (displayedVideos.length === index + 1) {
              return <Card ref={lastVideoElementRef} key={videoId} video={video} />;
            } else {
              return <Card key={videoId} video={video} />;
            }
          })}
        </div>
        {displayedVideos.length === 0 && !loading && (
          <div className="text-center text-zinc-400 mt-20 text-lg">
            No videos found for "{searchQuery}"
          </div>
        )}
        {loading && (
          <div className="flex justify-center my-8 w-full">
            <div className="w-8 h-8 border-[3px] border-zinc-600 border-t-red-500 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
