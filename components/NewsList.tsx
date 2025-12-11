
import React, { useState } from 'react';
import { CalendarEvent, User, Language } from '../types';
import { format } from 'date-fns';
import { Locale } from 'date-fns';
import Avatar from './Avatar';
import { EVENT_COLORS, EVENT_LABELS } from '../constants';
import { Bell, Languages, Loader2, X } from 'lucide-react';
import { translateContent } from '../services/geminiService';

interface NewsListProps {
  events: CalendarEvent[];
  users: User[];
  t: (key: string) => string;
  locale: Locale;
}

const NewsList: React.FC<NewsListProps> = ({ events, users, t, locale }) => {
  // Sort events by creation date descending
  const sortedEvents = [...events].sort((a, b) => b.date.getTime() - a.date.getTime());
  
  const getUserById = (id: string) => users.find(u => u.id === id);

  // Translation State
  const [translations, setTranslations] = useState<Record<string, { title: string, description: string }>>({});
  const [translatingId, setTranslatingId] = useState<string | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const handleTranslate = async (event: CalendarEvent, targetLang: Language) => {
    setActiveMenuId(null);
    setTranslatingId(event.id);
    
    // Map Language type to API locale code
    const getCode = (l: Language) => {
        switch(l) {
            case 'en': return 'en-US';
            case 'jp': return 'ja-JP';
            case 'es': return 'es-ES';
            default: return 'pt-BR';
        }
    };

    try {
      const code = getCode(targetLang);
      const [title, desc] = await Promise.all([
        translateContent(event.title, code),
        translateContent(event.description, code)
      ]);
      
      setTranslations(prev => ({
        ...prev,
        [event.id]: { title, description: desc }
      }));
    } catch (e) {
      console.error(e);
    } finally {
      setTranslatingId(null);
    }
  };

  const clearTranslation = (id: string) => {
    const newTrans = { ...translations };
    delete newTrans[id];
    setTranslations(newTrans);
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
             const isTranslated = !!translations[event.id];
             const displayTitle = isTranslated ? translations[event.id].title : event.title;
             const displayDesc = isTranslated ? translations[event.id].description : event.description;
             
             return (
               <div key={event.id} className="flex gap-3 relative pb-4 border-b border-gray-700 last:border-0 last:pb-0 group">
                  <div className="flex-shrink-0">
                     {author && <Avatar src={author.avatarUrl} alt={author.name} size="md" className="border-gray-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                     <div className="flex justify-between items-start">
                        <p className="text-sm font-bold text-gray-200 truncate">{author?.name || 'Desconhecido'}</p>
                        
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-gray-500 whitespace-nowrap">
                                {format(event.date, locale.code === 'ja' ? "MM/dd" : "d 'de' MMM", { locale })}
                            </span>
                            
                            {/* Translation Control */}
                            <div className="relative">
                                {isTranslated ? (
                                    <button 
                                        onClick={() => clearTranslation(event.id)}
                                        className="p-1 rounded-full text-indigo-300 bg-indigo-900/50 hover:bg-indigo-900 transition-colors"
                                        title="Restaurar Original"
                                    >
                                        <X size={12} />
                                    </button>
                                ) : (
                                    <button 
                                        onClick={() => setActiveMenuId(activeMenuId === event.id ? null : event.id)}
                                        disabled={translatingId === event.id}
                                        className="p-1 rounded-full text-gray-600 hover:text-indigo-400 hover:bg-gray-700 transition-colors"
                                        title="Traduzir / Translate"
                                    >
                                        {translatingId === event.id ? <Loader2 size={12} className="animate-spin" /> : <Languages size={12} />}
                                    </button>
                                )}

                                {/* Language Dropdown */}
                                {activeMenuId === event.id && !isTranslated && (
                                    <div className="absolute right-0 top-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-xl p-1 flex gap-1 z-20">
                                        {(['pt', 'en', 'es', 'jp'] as Language[]).map((lang) => (
                                            <button
                                                key={lang}
                                                onClick={() => handleTranslate(event, lang)}
                                                className="p-1 hover:bg-gray-700 rounded text-base transition-colors"
                                                title={`Traduzir para ${lang.toUpperCase()}`}
                                            >
                                                {lang === 'pt' ? '🇧🇷' : lang === 'en' ? '🇺🇸' : lang === 'es' ? '🇪🇸' : '🇯🇵'}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                     </div>
                     
                     <p className={`text-[10px] inline-block px-1.5 py-0.5 rounded border mb-1 mt-1 ${EVENT_COLORS[event.type]}`}>
                        {t(`eventModal.types.${event.type}`)}
                     </p>
                     
                     <h4 className="text-sm font-medium text-gray-300 leading-tight mb-1">
                        {displayTitle}
                     </h4>
                     <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                        {displayDesc}
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
