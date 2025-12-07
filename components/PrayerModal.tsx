
import React, { useState } from 'react';
import { User, ContactMethod } from '../types';
import Button from './Button';
import { X, Heart, Send, Lock, EyeOff, User as UserIcon, MessageSquare, Mail, Phone } from 'lucide-react';

interface PrayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onSend: (content: string, isAnonymous: boolean, contactData?: { allowed: boolean, method?: ContactMethod, info?: string }) => void;
  t: (key: string) => string;
}

const PrayerModal: React.FC<PrayerModalProps> = ({ isOpen, onClose, currentUser, onSend, t }) => {
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  // Contact State
  const [contactAllowed, setContactAllowed] = useState(false);
  const [contactMethod, setContactMethod] = useState<ContactMethod>('email');
  const [contactInfo, setContactInfo] = useState('');

  const MAX_CHARS = 250;

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSend(content, isAnonymous, {
        allowed: contactAllowed,
        method: contactAllowed ? contactMethod : undefined,
        info: contactAllowed ? contactInfo : undefined
      });
      
      // Reset Form
      setContent('');
      setIsAnonymous(false);
      setContactAllowed(false);
      setContactMethod('email');
      setContactInfo('');
      
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col border border-gray-700 ring-1 ring-pink-500/20 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gray-900 border-b border-gray-800 flex items-center justify-between sticky top-0 z-10">
          <h3 className="text-lg font-bold text-gray-100 flex items-center gap-2">
            <Heart className="text-pink-500 fill-pink-500" size={20} />
            {t('prayerModal.title')}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-300">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="bg-pink-900/10 border border-pink-900/30 rounded-lg p-3">
             <p className="text-xs text-pink-200 leading-relaxed">
               {t('prayerModal.verse')}
             </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 flex justify-between">
              <span>{t('prayerModal.labelRequest')}</span>
              <span className={`text-xs ${content.length > MAX_CHARS ? 'text-red-500' : 'text-gray-500'}`}>
                {content.length}/{MAX_CHARS}
              </span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value.slice(0, MAX_CHARS))}
              rows={4}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-shadow outline-none resize-none text-gray-100 placeholder-gray-500"
              placeholder={t('prayerModal.placeholder')}
              required
            />
          </div>

          <div className="space-y-3">
            {/* Privacy Toggle */}
            <div 
              className="flex items-center justify-between bg-gray-700/30 p-3 rounded-lg border border-gray-700 cursor-pointer"
              onClick={() => setIsAnonymous(!isAnonymous)}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${isAnonymous ? 'bg-gray-600 text-gray-300' : 'bg-pink-500/20 text-pink-500'}`}>
                  {isAnonymous ? <EyeOff size={18} /> : <UserIcon size={18} />}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-200">
                      {isAnonymous ? t('prayerModal.modeAnon') : t('prayerModal.modeName')}
                  </span>
                  <span className="text-[10px] text-gray-400">
                      {isAnonymous ? t('prayerModal.descAnon') : `${t('prayerModal.descName')} ${currentUser.name}`}
                  </span>
                </div>
              </div>
              <div className={`w-10 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${isAnonymous ? 'bg-pink-600' : 'bg-gray-600'}`}>
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${isAnonymous ? 'translate-x-4' : ''}`}></div>
              </div>
            </div>

            {/* Contact Toggle */}
            <div 
              className="flex items-center justify-between bg-gray-700/30 p-3 rounded-lg border border-gray-700 cursor-pointer"
              onClick={() => setContactAllowed(!contactAllowed)}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${contactAllowed ? 'bg-blue-500/20 text-blue-500' : 'bg-gray-600 text-gray-300'}`}>
                  <MessageSquare size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-200">
                      {t('prayerModal.contactTitle')}
                  </span>
                  <span className="text-[10px] text-gray-400">
                      {t('prayerModal.contactDesc')}
                  </span>
                </div>
              </div>
              <div className={`w-10 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${contactAllowed ? 'bg-blue-600' : 'bg-gray-600'}`}>
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${contactAllowed ? 'translate-x-4' : ''}`}></div>
              </div>
            </div>
            
            {/* Contact Details Form */}
            {contactAllowed && (
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 animate-fadeIn">
                 <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">{t('prayerModal.formContact')}</label>
                 
                 <div className="grid grid-cols-3 gap-2 mb-4">
                    <button
                       type="button"
                       onClick={() => setContactMethod('sms')}
                       className={`p-2 rounded-md text-xs font-medium border transition-colors ${contactMethod === 'sms' ? 'bg-blue-900/50 border-blue-500 text-blue-200' : 'bg-gray-700 border-gray-600 text-gray-400'}`}
                    >
                      SMS
                    </button>
                    <button
                       type="button"
                       onClick={() => setContactMethod('short_mail')}
                       className={`p-2 rounded-md text-xs font-medium border transition-colors ${contactMethod === 'short_mail' ? 'bg-blue-900/50 border-blue-500 text-blue-200' : 'bg-gray-700 border-gray-600 text-gray-400'}`}
                    >
                      Short Mail
                    </button>
                    <button
                       type="button"
                       onClick={() => setContactMethod('email')}
                       className={`p-2 rounded-md text-xs font-medium border transition-colors ${contactMethod === 'email' ? 'bg-blue-900/50 border-blue-500 text-blue-200' : 'bg-gray-700 border-gray-600 text-gray-400'}`}
                    >
                      E-mail
                    </button>
                 </div>

                 <div>
                   <label className="block text-xs font-medium text-gray-400 mb-1">
                     {contactMethod === 'email' ? t('prayerModal.labelEmail') : t('prayerModal.labelPhone')}
                   </label>
                   <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {contactMethod === 'email' ? <Mail size={14} className="text-gray-500"/> : <Phone size={14} className="text-gray-500"/>}
                      </div>
                      <input 
                        type={contactMethod === 'email' ? 'email' : 'tel'}
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                        required={contactAllowed}
                        className="w-full pl-9 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder={contactMethod === 'email' ? 'seu@email.com' : 'Ex: 090-1234-5678'}
                      />
                   </div>
                 </div>
              </div>
            )}
          </div>

          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full justify-center !bg-pink-600 hover:!bg-pink-700 text-white font-bold"
              icon={<Send size={16} />}
            >
              {t('prayerModal.btnSend')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrayerModal;
