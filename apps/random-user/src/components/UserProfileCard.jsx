import { memo } from 'react';

const UserProfileCard = ({ user }) => {
  const { name, picture, email, location, phone, dob } = user;
  
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-theme-surface/80 border border-theme-surface hover:border-theme-muted transition-all duration-300 shadow-lg hover:shadow-xl">
      <div className="p-6 relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <img 
              src={picture.large} 
              alt={`${name.first} ${name.last}`} 
              className="w-16 h-16 rounded-full object-cover border-2 border-theme-base group-hover:border-theme-accent transition-colors"
              loading="lazy"
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-theme-surface rounded-full"></div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-theme-accent group-hover:text-white transition-colors">
              {name.title} {name.first} {name.last}
            </h3>
            <p className="text-sm text-theme-muted flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-theme-muted inline-block"></span>
              Age: {dob.age}
            </p>
          </div>
        </div>

        <div className="space-y-3 mt-5 border-t border-theme-base/50 pt-5">
          <div className="flex items-start gap-3 text-sm">
            <svg className="w-5 h-5 text-theme-muted shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-theme-accent break-all">{email}</span>
          </div>

          <div className="flex items-start gap-3 text-sm">
            <svg className="w-5 h-5 text-theme-muted shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-theme-accent">{phone}</span>
          </div>

          <div className="flex items-start gap-3 text-sm">
            <svg className="w-5 h-5 text-theme-muted shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-theme-accent leading-snug">
              {location.street.number} {location.street.name},<br />
              {location.city}, {location.state}, {location.country}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(UserProfileCard);
