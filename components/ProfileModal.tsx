
import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import Button from './Button';
import Avatar from './Avatar';
import { X, User as UserIcon, MapPin, Calendar, RefreshCw, CheckCircle, Shield, Mail } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onSave: (updatedUser: User) => void;
  onRequestRole?: (role: UserRole) => void;
  t: (key: string) => string;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, currentUser, onSave, onRequestRole, t }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [isGCMember, setIsGCMember] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email || '');
      setAge(currentUser.age || '');
      setCity(currentUser.city || '');
      setIsGCMember(currentUser.isGCMember || false);
      setAvatarUrl(currentUser.avatarUrl);
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  const handleRandomizeAvatar = () => {
    const randomId = Math.floor(Math.random() * 1000);
    setAvatarUrl(`https://picsum.photos/seed/${randomId}/150/150`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser: User = {
      ...currentUser,
      name,
      email,
      age,
      city,
      isGCMember,
      avatarUrl
    };
    onSave(updatedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col border border-gray-700">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-100 flex items-center gap-2">
            <UserIcon className="text-yellow-500" size={20} />
            {t('profileModal.title')}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-300">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center justify-center space-y-3">
             <div className="relative group">
               <Avatar src={avatarUrl} alt={name} size="xl" className="w-24 h-24 border-4 border-gray-700 shadow-xl" />
               <button
                 type="button"
                 onClick={handleRandomizeAvatar}
                 className="absolute bottom-0 right-0 bg-yellow-500 text-black p-1.5 rounded-full shadow-lg hover:bg-yellow-400 transition-colors"
                 title="Alterar Foto"
               >
                 <RefreshCw size={16} />
               </button>
             </div>
             <p className="text-xs text-gray-400">{t('profileModal.changePhoto')}</p>
          </div>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">{t('profileModal.labelName')}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
                required
              />
            </div>

            {/* Email Field - Added Here */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-1">
                <Mail size={14} /> {t('profileModal.labelEmail')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none placeholder-gray-500"
                placeholder="exemplo@email.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
               {/* Age */}
               <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-1">
                    <Calendar size={14} /> {t('profileModal.labelAge')}
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
                  />
               </div>
               
               {/* City */}
               <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-1">
                    <MapPin size={14} /> {t('profileModal.labelCity')}
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
                  />
               </div>
            </div>

            {/* GC Member Checkbox */}
            <div className="bg-gray-700/50 p-3 rounded-xl border border-gray-700 flex items-center justify-between cursor-pointer" onClick={() => setIsGCMember(!isGCMember)}>
               <div className="flex items-center gap-3">
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isGCMember ? 'bg-yellow-500/20 text-yellow-500' : 'bg-gray-600/20 text-gray-500'}`}>
                    <CheckCircle size={20} />
                 </div>
                 <div>
                    <p className={`font-bold ${isGCMember ? 'text-yellow-500' : 'text-gray-400'}`}>{t('profileModal.labelGCMember')}</p>
                    <p className="text-xs text-gray-500">{t('profileModal.descGCMember')}</p>
                 </div>
               </div>
               <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${isGCMember ? 'bg-yellow-500 border-yellow-500' : 'bg-transparent border-gray-500'}`}>
                  {isGCMember && <CheckIcon className="text-black w-4 h-4" />}
               </div>
            </div>

            {/* Admin Request Button */}
            {currentUser.role !== 'admin' && !currentUser.requestedRole && onRequestRole && (
               <button
                 type="button"
                 onClick={() => onRequestRole('admin')}
                 className="w-full py-3 border border-yellow-600/50 rounded-lg flex items-center justify-center gap-2 text-yellow-500 hover:bg-yellow-900/20 transition-colors text-sm font-bold"
               >
                 <Shield size={16} />
                 {t('profileModal.btnRequestAdmin')}
               </button>
            )}
            
            {currentUser.requestedRole === 'admin' && (
               <div className="w-full py-3 bg-yellow-900/10 border border-yellow-600/30 rounded-lg flex items-center justify-center gap-2 text-yellow-500 text-sm">
                 <Shield size={16} />
                 {t('profileModal.statusPending')}
               </div>
            )}

          </div>

          <div className="pt-2">
            <Button type="submit" className="w-full justify-center !bg-yellow-500 !text-black hover:!bg-yellow-400 font-bold">
              {t('profileModal.btnSave')}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export default ProfileModal;
