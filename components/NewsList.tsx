
import React, { useState } from 'react';
import { CalendarEvent, User } from '../types';
import { format } from 'date-fns';
import Avatar from './Avatar';
import { EVENT_COLORS, EVENT_LABELS } from '../constants';
import { Bell, Languages, Loader2 } from 'lucide-react';
import { translateContent } from '../services/geminiService';

interface NewsListProps {
  events: CalendarEvent[];
  users: User[];
  t: (key: string) => string;
  locale: any;
}

const NewsList: React.FC<NewsListProps> = ({ events, users, t, locale }) => {
  // Sort events by creation date descending
  const sortedEvents = [...events].sort((a, b) => b.date.getTime() - a.date.getTime());
  const getUserById = (id: string) => users.find(u => u.id === id);

  // Translation State
  const [translations, setTranslations] = useState<Record<string, { title?: string, description?: string }>>({});
  const [translatingId, setTranslatingId] = useState<string | null>(null);

  const handleTranslateEvent = async (event: CalendarEvent) => {
      const id = event.id;
      if (translations[id]) {
          // Toggle off
          const newTrans = { ...translations };
          delete newTrans[id];
          setTranslations(newTrans);
          return;
      }

      setTranslatingId(id);
      try {
          // Translate both title and description
          const [transTitle, transDesc] = await Promise.all([
              translateContent(event.title, locale.code || 'en'),
              translateContent(event.description, locale.code || 'en')
          ]);
          setTranslations(prev => ({
              ...prev,
              [id]: { title: transTitle, description: transDesc }
          }));
      } catch (e) {
          console.error(e);
      } finally {
          setTranslatingId(null);
      }
  };

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
             const isTranslating = translatingId === event.id;
             const hasTranslation = !!translations[event.id];

             return (
               <div key={event.id} className="flex gap-3 relative pb-4 border-b border-gray-700 last:border-0 last:pb-0 group">
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
                     
                     <div className="flex justify-between items-center mt-1 mb-1">
                        <p className={`text-[10px] inline-block px-1.5 py-0.5 rounded border ${EVENT_COLORS[event.type]}`}>
                            {t(`eventModal.types.${event.type}`)}
                        </p>
                        
                        {/* Translate Button */}
                        <button 
                            onClick={() => handleTranslateEvent(event)}
                            disabled={isTranslating}
                            className={`p-1 rounded-full transition-colors ${hasTranslation ? 'text-yellow-500 bg-yellow-900/20' : 'text-gray-500 hover:text-yellow-500 hover:bg-gray-700'}`}
                            title="Traduzir/Translate"
                        >
                            {isTranslating ? <Loader2 size={12} className="animate-spin" /> : <Languages size={12} />}
                        </button>
                     </div>

                     <h4 className="text-sm font-medium text-gray-300 leading-tight mb-1">
                        {translations[event.id]?.title || event.title}
                     </h4>
                     <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed whitespace-pre-wrap">
                        {translations[event.id]?.description || event.description}
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
