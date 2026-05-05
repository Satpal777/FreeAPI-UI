import { useState, useEffect, useRef, useCallback } from 'react';
import UserProfileCard from './UserProfileCard';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  
  const observer = useRef();
  
  const lastUserElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`https://api.freeapi.app/api/v1/public/randomusers?page=${page}&limit=10`);
        const result = await response.json();
        
        if (result.success) {
          setUsers(prev => {
            const existingIds = new Set(prev.map(u => u.login?.uuid || u.id));
            const newUsers = result.data.data.filter(u => !existingIds.has(u.login?.uuid || u.id));
            return [...prev, ...newUsers];
          });
          setHasMore(result.data.nextPage);
        } else {
          setError(result.message || 'Failed to fetch users');
          setHasMore(false);
        }
      } catch (err) {
        setError('An error occurred while fetching users from the network.');
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    if (hasMore) {
      fetchUsers();
    }
  }, [page]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-theme-accent mb-4 tracking-tight">
          Community Members
        </h1>
        <p className="text-theme-muted max-w-2xl mx-auto text-lg md:text-xl">
          Discover and connect with professionals around the globe.
        </p>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-center max-w-2xl mx-auto">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {users.map((user, index) => {
          const uniqueKey = user.login?.uuid || user.id || index;
          if (users.length === index + 1) {
            return (
              <div ref={lastUserElementRef} key={uniqueKey}>
                <UserProfileCard user={user} />
              </div>
            );
          } else {
            return <UserProfileCard key={uniqueKey} user={user} />;
          }
        })}
      </div>
      
      {loading && (
        <div className="flex justify-center mt-12 mb-8">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-theme-surface rounded-full"></div>
            <div className="absolute inset-0 border-4 border-theme-accent rounded-full border-t-transparent animate-spin"></div>
          </div>
        </div>
      )}

      {!hasMore && !loading && users.length > 0 && (
        <div className="text-center text-theme-muted mt-12 mb-8 bg-theme-surface/40 rounded-2xl py-8 border border-theme-surface backdrop-blur-sm">
          <p className="text-lg font-medium">You've reached the end of the list.</p>
        </div>
      )}
    </div>
  );
};

export default UserList;
