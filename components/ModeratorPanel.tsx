
import React, { useState } from 'react';
import { User, PrayerRequest, UserRole } from '../types';
import Avatar from './Avatar';
import Button from './Button';
import { X, Check, Shield, Eye, Heart, BarChart2, User as UserIcon, EyeOff, MessageCircle, Mail, Phone, Smartphone, AlertTriangle, Languages, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { Locale } from 'date-fns';
import { translateContent } from '../services/geminiService';

interface ModeratorPanelProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  currentUser: User;
  prayerRequests?: PrayerRequest[];
  onApprove: (userId: string, role: UserRole) => void;
  onReject: (userId: string) => void;
  t: (key: string) => string;
  locale: Locale;
}

const ModeratorPanel: React.FC<ModeratorPanelProps> = ({ 
  isOpen, 
  onClose, 
  users, 
  currentUser,
  prayerRequests = [], 
  onApprove, 
  onReject,
  t,
  locale
}) => {
  const [activeTab, setActiveTab] = useState<'access' | 'prayers' | 'stats'>('access');
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [translatingId, setTranslatingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const pendingUsers = users.filter(u => u.status === 'pending');
  const adminRequests = users.filter(u => u.requestedRole === 'admin');
  
  const getUserById = (id: string) => users.find(u => u.id === id);

  const isSuperAdmin = currentUser.email === 'pr.mukai@gmail.com';

  const handleTranslate = async (id: string, text: string) => {
    if (translations[id]) {
        // Toggle off translation
        const newTranslations = { ...translations };
        delete newTranslations[id];
        setTranslations(newTranslations);
        return;
    }

    setTranslatingId(id);
    try {
        const translated = await translateContent(text, locale.code || 'en');
        setTranslations(prev => ({ ...prev, [id]: translated }));
    } catch (e) {
        console.error(e);
    } finally {
        setTranslatingId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col h-[85vh] border border-gray-700">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-100 flex items-center gap-2">
            <Shield className="text-yellow-500" size={20} />
            {t('moderator.title')} {isSuperAdmin && <span className="text-xs bg-yellow-600 text-black px-2 py-0.5 rounded-full ml-2">Super Admin</span>}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-300">
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700 bg-gray-800">
           <button 
             onClick={() => setActiveTab('access')}
             className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors relative ${activeTab === 'access' ? 'border-yellow-500 text-yellow-500 bg-yellow-900/10' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
           >
             {t('moderator.tabAccess')} ({pendingUsers.length + (isSuperAdmin ? adminRequests.length : 0)})
             {isSuperAdmin && adminRequests.length > 0 && (
                <span className="absolute top-2 right-4 w-2 h-2 bg-red-500 rounded-full"></span>
             )}
           </button>
           <button 
             onClick={() => setActiveTab('prayers')}
             className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'prayers' ? 'border-pink-500 text-pink-500 bg-pink-900/10' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
           >
             {t('moderator.tabPrayers')} ({prayerRequests.length})
           </button>
           <button 
             onClick={() => setActiveTab('stats')}
             className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'stats' ? 'border-blue-500 text-blue-500 bg-blue-900/10' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
           >
             {t('moderator.tabStats')}
           </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-900">
          
          {/* TAB: Access Control */}
          {activeTab === 'access' && (
             <div className="space-y-6">
              
              {/* SECTION: Admin Promotion Requests (Only for Pr. Mukai) */}
              {isSuperAdmin && adminRequests.length > 0 && (
                <div className="bg-yellow-900/10 border border-yellow-600/30 rounded-xl p-4 mb-6">
                   <h4 className="text-sm font-bold text-yellow-500 flex items-center gap-2 mb-3">
                     <AlertTriangle size={16} /> {t('moderator.sectionPromote')}
                   </h4>
                   <div className="space-y-3">
                     {adminRequests.map(user => (
                       <div key={user.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-900/50 border border-gray-700 p-3 rounded-lg gap-4">
                          <div className="flex items-center gap-3">
                            <Avatar src={user.avatarUrl} alt={user.name} size="md" className="border-yellow-600" />
                            <div>
                              <p className="font-bold text-gray-100">{user.name}</p>
                              <p className="text-xs text-gray-400">Current: {user.role}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                             <Button variant="primary" onClick={() => onApprove(user.id, 'admin')} className="text-xs h-8 bg-yellow-600 hover:bg-yellow-500 text-black font-bold">
                               <Shield size={14} className="mr-1" /> {t('moderator.btnApproveAdmin')}
                             </Button>
                             <Button variant="secondary" onClick={() => onApprove(user.id, user.role)} className="text-xs h-8">
                               {t('moderator.btnKeep')}
                             </Button>
                          </div>
                       </div>
                     ))}
                   </div>
                </div>
              )}

              {/* SECTION: New User Approvals */}
              <h4 className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">{t('moderator.sectionNew')}</h4>
              {pendingUsers.length === 0 ? (
                <div className="text-center py-8 bg-gray-800 rounded-xl border border-dashed border-gray-700">
                   <p className="text-gray-500 font-medium">{t('moderator.emptyNew')}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingUsers.map(user => (
                    <div key={user.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-800 border border-gray-700 p-4 rounded-xl gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar src={user.avatarUrl} alt={user.name} size="md" />
                        <div>
                          <p className="font-bold text-gray-100">{user.email || user.phone}</p>
                          <p className="text-xs text-gray-400">Solicitado hoje</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="secondary" onClick={() => onApprove(user.id, 'viewer')} className="text-xs h-8">
                          <Eye size={14} className="mr-1" /> {t('app.profile.viewer')}
                        </Button>
                        <Button variant="primary" onClick={() => onApprove(user.id, 'editor')} className="text-xs h-8 bg-green-700 hover:bg-green-600">
                          <Check size={14} className="mr-1" /> {t('app.profile.editor')}
                        </Button>
                        
                        {/* Only Super Admin can directly approve as Admin from pending */}
                        {isSuperAdmin && (
                           <Button variant="primary" onClick={() => onApprove(user.id, 'admin')} className="text-xs h-8 bg-yellow-600 hover:bg-yellow-500 text-black font-bold" title="Tornar Moderador">
                             <Shield size={14} />
                           </Button>
                        )}

                        <Button variant="danger" onClick={() => onReject(user.id)} className="text-xs h-8">
                          <X size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
             </div>
          )}

          {/* TAB: Prayer Requests */}
          {activeTab === 'prayers' && (
            <div className="space-y-4">
               <div className="flex justify-between items-center mb-2">
                 <h4 className="text-sm font-bold text-pink-400">Total: {prayerRequests.length}</h4>
               </div>
               
               {prayerRequests.length === 0 ? (
                  <div className="text-center py-12 bg-gray-800 rounded-xl border border-dashed border-gray-700">
                    <Heart className="mx-auto text-gray-600 mb-2" size={32} />
                    <p className="text-gray-500 font-medium">{t('moderator.emptyPrayers')}</p>
                  </div>
               ) : (
                  prayerRequests.map(prayer => {
                    const author = getUserById(prayer.authorId);
                    return (
                      <div key={prayer.id} className="bg-gray-800 border-l-4 border-pink-600 p-4 rounded-r-xl shadow-sm">
                         <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              {prayer.isAnonymous ? (
                                <div className="bg-gray-700 p-1.5 rounded-full"><EyeOff size={14} className="text-gray-400"/></div>
                              ) : (
                                <Avatar src={author?.avatarUrl || ''} alt="" size="sm" className="w-6 h-6" />
                              )}
                              <div>
                                <span className={`text-sm font-bold block ${prayer.isAnonymous ? 'text-gray-400 italic' : 'text-gray-200'}`}>
                                  {prayer.isAnonymous ? t('prayerModal.modeAnon') : author?.name}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] text-gray-500">
                                  {format(prayer.createdAt, "d MMM, HH:mm", { locale })}
                                </span>
                            </div>
                         </div>
                         
                         <div className="relative group">
                           <p className="text-gray-300 text-sm leading-relaxed bg-gray-900/50 p-3 rounded-lg border border-gray-700/50 mb-3 whitespace-pre-wrap">
                             "{translations[prayer.id] || prayer.content}"
                           </p>
                           
                           {/* Translate Button */}
                           <div className="flex justify-end -mt-2 mb-2">
                              <button 
                                onClick={() => handleTranslate(prayer.id, prayer.content)}
                                disabled={translatingId === prayer.id}
                                className="flex items-center gap-1.5 text-[10px] font-medium text-blue-400 hover:text-blue-300 transition-colors px-2 py-1 rounded-full bg-blue-900/20 hover:bg-blue-900/40"
                              >
                                {translatingId === prayer.id ? (
                                    <>
                                      <Loader2 size={10} className="animate-spin" />
                                      Traduzindo...
                                    </>
                                ) : (
                                    <>
                                      <Languages size={10} />
                                      {translations[prayer.id] ? 'Ver Original' : 'Traduzir'}
                                    </>
                                )}
                              </button>
                           </div>
                         </div>

                         {/* Contact Info Section */}
                         {prayer.contactAllowed && (
                           <div className="mt-3 bg-blue-900/20 border border-blue-900/40 rounded-lg p-3 flex items-start gap-3">
                              <div className="bg-blue-600/20 p-2 rounded-full text-blue-400">
                                <MessageCircle size={16} />
                              </div>
                              <div>
                                <p className="text-xs font-bold text-blue-400 mb-1 uppercase">{t('prayerModal.contactTitle')}</p>
                                <p className="text-sm text-gray-300 flex items-center gap-2">
                                  {prayer.contactMethod === 'email' && <Mail size={14} />}
                                  {prayer.contactMethod === 'sms' && <Smartphone size={14} />}
                                  {prayer.contactMethod === 'short_mail' && <Mail size={14} />}
                                  <span className="font-mono bg-gray-900 px-2 py-0.5 rounded border border-gray-700 select-all">
                                    {prayer.contactInfo || 'Sem informação'}
                                  </span>
                                  <span className="text-xs text-gray-500 capitalize">({prayer.contactMethod?.replace('_', ' ')})</span>
                                </p>
                              </div>
                           </div>
                         )}
                      </div>
                    );
                  })
               )}
            </div>
          )}

          {/* TAB: Statistics */}
          {activeTab === 'stats' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                 <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                    <p className="text-gray-400 text-xs uppercase font-bold">{t('moderator.totalUsers')}</p>
                    <p className="text-2xl font-bold text-blue-400">{users.length}</p>
                 </div>
                 <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                    <p className="text-gray-400 text-xs uppercase font-bold">{t('moderator.totalLogins')}</p>
                    <p className="text-2xl font-bold text-green-400">
                      {users.reduce((acc, curr) => acc + (curr.loginCount || 0), 0)}
                    </p>
                 </div>
              </div>

              <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-900/50 border-b border-gray-700 text-xs text-gray-400 uppercase">
                      <th className="p-4 font-semibold">{t('moderator.tableUser')}</th>
                      <th className="p-4 font-semibold">{t('moderator.tableRole')}</th>
                      <th className="p-4 font-semibold text-right">{t('moderator.tableLogins')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {users.sort((a,b) => (b.loginCount || 0) - (a.loginCount || 0)).map(user => (
                      <tr key={user.id} className="hover:bg-gray-700/30 transition-colors">
                        <td className="p-3 pl-4 flex items-center gap-3">
                          <Avatar src={user.avatarUrl} alt={user.name} size="sm" />
                          <div>
                            <p className="text-sm font-medium text-gray-200">{user.name}</p>
                            <p className="text-[10px] text-gray-500">{user.email || user.phone}</p>
                          </div>
                        </td>
                        <td className="p-3 text-xs text-gray-400 capitalize">{user.role}</td>
                        <td className="p-3 pr-4 text-right">
                           <span className="inline-block px-2 py-1 bg-gray-900 rounded-md text-xs font-bold text-blue-400 border border-gray-700 min-w-[30px] text-center">
                             {user.loginCount || 0}
                           </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ModeratorPanel;
