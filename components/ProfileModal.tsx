
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
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setEmail(currentUser.email || '');
      setAge(currentUser.age || '');
      setCity(currentUser.city || '');
      setIsGCMember(currentUser.isGCMember || false);
    }
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...currentUser,
      name,
      email,
      age,
      city,
      isGCMember
    });
    setIsEditing(false);
  };

  const handleGenerateAvatar = () => {
    const randomId = Math.floor(Math.random() * 1000);
    onSave({
      ...currentUser,
      avatarUrl: `https://picsum.photos/seed/${randomId}/200/200`
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col border border-gray-700">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-100">{t('profileModal.title')}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-300">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[80vh]">
           
           {/* Avatar Section */}
           <div className="flex flex-col items-center mb-6">
              <div className="relative group cursor-pointer" onClick={handleGenerateAvatar}>
                <Avatar src={currentUser.avatarUrl} alt={currentUser.name} size="xl" className="ring-4 ring-gray-700 group-hover:ring-yellow-500 transition-all" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                   <RefreshCw className="text-white" size={24} />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">{t('profileModal.changePhoto')}</p>
              
              <div className="mt-2 flex flex-col items-center">
                 <span className={`text-xs px-2 py-0.5 rounded-full border uppercase font-bold tracking-wider mt-1
                    ${currentUser.role === 'admin' ? 'bg-yellow-900/50 text-yellow-500 border-yellow-700' : 
                      currentUser.role === 'editor' ? 'bg-green-900/50 text-green-500 border-green-700' : 
                      'bg-gray-700 text-gray-400 border-gray-600'
                    }
                 `}>
                    {t(`app.profile.${currentUser.role}`)}
                 </span>
              </div>
           </div>

           {/* Form */}
           {isEditing ? (
             <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn">
                <div>
                   <label className="block text-xs font-medium text-gray-400 mb-1">{t('profileModal.labelName')}</label>
                   <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon size={16} className="text-gray-500" />
                      </div>
                      <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="w-full pl-9 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-gray-100 focus:ring-1 focus:ring-yellow-500 outline-none"
                      />
                   </div>
                </div>

                <div>
                   <label className="block text-xs font-medium text-gray-400 mb-1">{t('profileModal.labelEmail')}</label>
                   <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail size={16} className="text-gray-500" />
                      </div>
                      <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="w-full pl-9 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-gray-100 focus:ring-1 focus:ring-yellow-500 outline-none"
                        placeholder={t('profileModal.placeholders.email')}
                      />
                   </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                       <label className="block text-xs font-medium text-gray-400 mb-1">{t('profileModal.labelAge')}</label>
                       <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar size={16} className="text-gray-500" />
                          </div>
                          <input 
                            type="text" 
                            value={age} 
                            onChange={(e) => setAge(e.target.value)} 
                            className="w-full pl-9 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-gray-100 focus:ring-1 focus:ring-yellow-500 outline-none"
                          />
                       </div>
                    </div>
                    <div className="flex-1">
                       <label className="block text-xs font-medium text-gray-400 mb-1">{t('profileModal.labelCity')}</label>
                       <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin size={16} className="text-gray-500" />
                          </div>
                          <input 
                            type="text" 
                            value={city} 
                            onChange={(e) => setCity(e.target.value)} 
                            className="w-full pl-9 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-gray-100 focus:ring-1 focus:ring-yellow-500 outline-none"
                          />
                       </div>
                    </div>
                </div>

                <div 
                   className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${isGCMember ? 'bg-indigo-900/30 border-indigo-500/50' : 'bg-gray-700 border-gray-600'}`}
                   onClick={() => setIsGCMember(!isGCMember)}
                >
                   <div>
                      <p className={`text-sm font-bold ${isGCMember ? 'text-indigo-400' : 'text-gray-400'}`}>{t('profileModal.labelGCMember')}</p>
                      <p className="text-[10px] text-gray-500">{t('profileModal.descGCMember')}</p>
                   </div>
                   <div className={`w-5 h-5 rounded flex items-center justify-center border ${isGCMember ? 'bg-indigo-500 border-indigo-500' : 'border-gray-500'}`}>
                      {isGCMember && <CheckCircle size={14} className="text-white" />}
                   </div>
                </div>

                <div className="pt-2 flex gap-3">
                   <Button type="button" variant="secondary" onClick={() => setIsEditing(false)} className="flex-1 !bg-gray-700 !border-gray-600 !text-gray-300">
                     {t('contactBox.btnCancel')}
                   </Button>
                   <Button type="submit" className="flex-1">
                     {t('profileModal.btnSave')}
                   </Button>
                </div>
             </form>
           ) : (
             <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 text-sm">
                   <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-700 flex items-center gap-3">
                      <UserIcon size={18} className="text-gray-500" />
                      <div className="flex-1 overflow-hidden">
                         <p className="text-xs text-gray-500">{t('profileModal.labelName')}</p>
                         <p className="text-gray-200 font-medium truncate">{currentUser.name}</p>
                      </div>
                   </div>

                   <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-700 flex items-center gap-3">
                      <Mail size={18} className="text-gray-500" />
                      <div className="flex-1 overflow-hidden">
                         <p className="text-xs text-gray-500">{t('profileModal.labelEmail')}</p>
                         <p className="text-gray-200 font-medium truncate">{currentUser.email || '---'}</p>
                      </div>
                   </div>

                   <div className="flex gap-4">
                     <div className="flex-1 bg-gray-700/50 p-3 rounded-lg border border-gray-700 flex items-center gap-3">
                        <Calendar size={18} className="text-gray-500" />
                        <div>
                           <p className="text-xs text-gray-500">{t('profileModal.labelAge')}</p>
                           <p className="text-gray-200 font-medium">{currentUser.age || '-'}</p>
                        </div>
                     </div>
                     <div className="flex-1 bg-gray-700/50 p-3 rounded-lg border border-gray-700 flex items-center gap-3">
                        <MapPin size={18} className="text-gray-500" />
                        <div className="flex-1 overflow-hidden">
                           <p className="text-xs text-gray-500">{t('profileModal.labelCity')}</p>
                           <p className="text-gray-200 font-medium truncate">{currentUser.city || '-'}</p>
                        </div>
                     </div>
                   </div>

                   {currentUser.isGCMember && (
                      <div className="bg-indigo-900/20 border border-indigo-500/30 p-2 rounded-lg text-center">
                         <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{t('profileModal.labelGCMember')}</p>
                      </div>
                   )}
                </div>

                <Button 
                  onClick={() => setIsEditing(true)} 
                  variant="secondary" 
                  className="w-full !bg-gray-700 !border-gray-600 !text-gray-200 hover:!bg-gray-600"
                >
                  {t('contactBox.btnEdit')}
                </Button>

                {/* Admin Request Section */}
                {currentUser.role !== 'admin' && onRequestRole && (
                    <div className="border-t border-gray-700 pt-4 mt-2">
                        {currentUser.requestedRole === 'admin' || currentUser.status === 'pending' ? (
                            <div className="bg-yellow-900/10 border border-yellow-600/30 p-3 rounded-lg flex items-center gap-3">
                                <RefreshCw className="text-yellow-500 animate-spin" size={20} />
                                <p className="text-sm text-yellow-500 font-medium">{t('profileModal.statusPending')}</p>
                            </div>
                        ) : (
                            <button 
                                onClick={() => onRequestRole('admin')}
                                className="w-full py-2 flex items-center justify-center gap-2 text-gray-500 hover:text-yellow-500 transition-colors text-sm"
                            >
                                <Shield size={16} />
                                {t('profileModal.btnRequestAdmin')}
                            </button>
                        )}
                    </div>
                )}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
