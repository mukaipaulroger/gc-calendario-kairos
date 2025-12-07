
import React, { useState, useEffect } from 'react';
import { User, EventType, CalendarEvent } from '../types';
import Avatar from './Avatar';
import Button from './Button';
import { enhanceAnnouncement, translateContent } from '../services/geminiService';
import { X, Sparkles, AlertCircle, Calendar, Languages, Loader2 } from 'lucide-react';
import { isSameDay, format } from 'date-fns';
import { EVENT_COLORS, EVENT_LABELS } from '../constants';
import { Locale } from 'date-fns';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  currentUser: User;
  onSave: (title: string, description: string, type: EventType) => void;
  events: CalendarEvent[];
  t: (key: string) => string;
  locale: Locale;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, selectedDate, currentUser, onSave, events, t, locale }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<EventType>('notice');
  const [isEnhancing, setIsEnhancing] = useState(false);
  
  // Translation State
  const [translations, setTranslations] = useState<Record<string, { title?: string, description?: string }>>({});
  const [translatingId, setTranslatingId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setDescription('');
      setType('notice');
      setTranslations({});
    }
  }, [isOpen]);

  if (!isOpen || !selectedDate) return null;

  const handleEnhance = async () => {
    if (!description.trim()) return;
    setIsEnhancing(true);
    try {
      const enhanced = await enhanceAnnouncement(description, type);
      setDescription(enhanced);
    } catch (e) {
      console.error(e);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleTranslateEvent = async (event: CalendarEvent) => {
      const id = event.id;
      if (translations[id]) {
          const newTrans = { ...translations };
          delete newTrans[id];
          setTranslations(newTrans);
          return;
      }

      setTranslatingId(id);
      try {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description) {
      onSave(title, description, type);
      onClose();
    }
  };

  const formattedDate = format(selectedDate, locale.code === 'ja' ? 'yyyy年 MMMM d日 (eeee)' : 'EEEE, d MMMM', { locale });
  
  // Filter events for this day
  const dayEvents = events.filter(e => isSameDay(e.date, selectedDate));
  
  const canEdit = currentUser.role === 'admin' || currentUser.role === 'editor';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] border border-gray-700">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between bg-gray-900">
          <div className="flex items-center space-x-3">
             <div className="bg-gray-800 p-2 rounded-lg text-yellow-500 border border-gray-700">
                <Calendar size={20} />
             </div>
             <div>
               <h3 className="text-lg font-bold text-gray-100 capitalize">{formattedDate}</h3>
               <p className="text-xs text-gray-400">{t('calendar.details')}</p>
             </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Existing Events List */}
          <div className="space-y-3">
             {dayEvents.length === 0 ? (
               <div className="text-center py-6 border border-dashed border-gray-700 rounded-xl">
                 <p className="text-gray-500 text-sm">{t('calendar.emptyDay')}</p>
               </div>
             ) : (
               dayEvents.map(event => (
                 <div key={event.id} className="bg-gray-700/50 p-4 rounded-xl border border-gray-700 relative group">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded border ${EVENT_COLORS[event.type]}`}>
                        {t(`eventModal.types.${event.type}`)}
                      </span>
                      
                      <button 
                        onClick={() => handleTranslateEvent(event)}
                        disabled={translatingId === event.id}
                        className="p-1 rounded-full text-gray-400 hover:text-yellow-500 hover:bg-gray-600 transition-colors"
                        title="Traduzir/Translate"
                      >
                         {translatingId === event.id ? <Loader2 size={14} className="animate-spin" /> : <Languages size={14} />}
                      </button>
                    </div>
                    
                    <h4 className="font-bold text-gray-200 text-lg mb-1">
                        {translations[event.id]?.title || event.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">
                        {translations[event.id]?.description || event.description}
                    </p>
                 </div>
               ))
             )}
          </div>

          {/* Create Form (Only for Admins/Editors) */}
          {canEdit && (
            <div className="border-t border-gray-700 pt-6">
              <h4 className="text-sm font-bold text-gray-300 mb-4 flex items-center">
                <PlusIcon className="w-4 h-4 mr-2" />
                {t('eventModal.addTitle')}
              </h4>
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Type Selection */}
                <div className="grid grid-cols-3 gap-3">
                  {(['notice', 'news', 'urgent'] as EventType[]).map((tType) => (
                    <button
                      key={tType}
                      type="button"
                      onClick={() => setType(tType)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium border transition-all ${
                        type === tType 
                          ? tType === 'urgent' ? 'bg-red-900/50 border-red-700 text-red-200 ring-1 ring-red-700' 
                          : tType === 'news' ? 'bg-green-900/50 border-green-700 text-green-200 ring-1 ring-green-700'
                          : 'bg-blue-900/50 border-blue-700 text-blue-200 ring-1 ring-blue-700'
                          : 'bg-gray-700 border-gray-600 text-gray-400 hover:bg-gray-600'
                      }`}
                    >
                      {t(`eventModal.types.${tType}`)}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">{t('eventModal.fieldTitle')}</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-shadow outline-none text-gray-100 placeholder-gray-500"
                    placeholder={t('eventModal.placeholderTitle')}
                    required
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-400">{t('eventModal.fieldDesc')}</label>
                    <button
                      type="button"
                      onClick={handleEnhance}
                      disabled={!description.trim() || isEnhancing}
                      className="text-xs flex items-center text-yellow-500 hover:text-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      <Sparkles size={14} className="mr-1" />
                      {isEnhancing ? t('eventModal.enhancing') : t('eventModal.enhanceAI')}
                    </button>
                  </div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-shadow outline-none resize-none text-gray-100 placeholder-gray-500"
                    placeholder={t('eventModal.placeholderDesc')}
                    required
                  />
                </div>

                {type === 'urgent' && (
                  <div className="bg-red-900/30 border border-red-900/50 p-3 rounded-lg flex items-start text-red-300 text-sm">
                      <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
                      <p>{t('eventModal.urgentHelp')}</p>
                  </div>
                )}

                <div className="pt-2 flex justify-end space-x-3">
                  <Button type="button" variant="secondary" onClick={onClose} className="!bg-gray-700 !border-gray-600 !text-gray-200 hover:!bg-gray-600">
                    {t('eventModal.btnClose')}
                  </Button>
                  <Button type="submit" variant={type === 'urgent' ? 'danger' : 'primary'}>
                    {t('eventModal.btnPublish')}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
        
        {!canEdit && (
            <div className="p-4 bg-gray-900 border-t border-gray-800 flex justify-end">
                 <Button type="button" variant="secondary" onClick={onClose} className="!bg-gray-700 !border-gray-600 !text-gray-200 hover:!bg-gray-600">
                    {t('eventModal.btnClose')}
                  </Button>
            </div>
        )}

      </div>
    </div>
  );
};

// Helper component for the Plus Icon
const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

export default EventModal;
