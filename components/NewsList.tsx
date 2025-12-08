
import React from 'react';
import { CalendarEvent, User } from '../types';
import { format } from 'date-fns';
import { Locale } from 'date-fns';
import Avatar from './Avatar';
import { EVENT_COLORS, EVENT_LABELS } from '../constants';
import { Bell } from 'lucide-react';

interface NewsListProps {
  events: CalendarEvent[];
  users: User[];
  t: (key: string) => string;
  locale: Locale;
}

const NewsList: React.FC<NewsListProps> = ({ events, users, t, locale }) => {
  // Sort events by creation date descending (simulated by date here for simplicity, or just recent events)
  const sortedEvents = [...events].sort((a, b) => b.date.getTime() - a.date.getTime());
  
  const getUserById = (id: string) => users.find(u => u.id === id);

  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 h-full flex flex-col">
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
         <h2 className="text-lg font-bold text-gray-100 flex items-center">
            <Bell className="mr-2 text-yellow-500" size={20} />
            {t('newsList.title')}
         </h2>
         <span className="text-xs font-medium px-2 py-1 bg-gray-700 text-gray-300 rounded-full">
            {events.length}
         </span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {sortedEvents.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
             <p>{t('newsList.empty')}</p>
          </div>
        ) : (
          sortedEvents.map(event => {
             const author = getUserById(event.authorId);
             return (
               <div key={event.id} className="flex gap-3 relative pb-4 border-b border-gray-700 last:border-0 last:pb-0">
                  <div className="flex-shrink-0">
                     {author && <Avatar src={author.avatarUrl} alt={author.name} size="md" className="border-gray-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                     <div className="flex justify-between items-start">
                        <p className="text-sm font-bold text-gray-200 truncate">{author?.name || 'Desconhecido'}</p>
                        <span className="text-[10px] text-gray-500 whitespace-nowrap ml-2">
                           {format(event.date, locale.code === 'ja' ? "MM/dd" : "d 'de' MMM", { locale })}
                        </span>
                     </div>
                     <p className={`text-[10px] inline-block px-1.5 py-0.5 rounded border mb-1 mt-1 ${EVENT_COLORS[event.type]}`}>
                        {t(`eventModal.types.${event.type}`)}
                     </p>
                     <h4 className="text-sm font-medium text-gray-300 leading-tight mb-1">{event.title}</h4>
                     <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                        {event.description}
                     </p>
                  </div>
               </div>
             )
          })
        )}
      </div>
    </div>
  );
};

export default NewsList;
