
import React, { useState } from 'react';
import { Mail, Phone, Instagram, MapPin, Edit2, Save, X } from 'lucide-react';

interface ContactInfoBoxProps {
  isAdmin: boolean;
  t: (key: string) => string;
}

const ContactInfoBox: React.FC<ContactInfoBoxProps> = ({ isAdmin, t }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [info, setInfo] = useState({
    email: 'contato@kairos.com',
    phone: '090-1234-5678',
    instagram: '@kairos.gc',
    address: 'Tokyo-to, Minato-ku...'
  });

  const [editForm, setEditForm] = useState(info);

  const handleSave = () => {
    setInfo(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(info);
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-4 relative group">
       <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
         <h3 className="text-gray-100 font-bold flex items-center gap-2">
           <span className="text-yellow-500">ℹ️</span> {t('contactBox.title')}
         </h3>
         
         {isAdmin && !isEditing && (
            <button 
              onClick={() => setIsEditing(true)} 
              className="text-gray-500 hover:text-yellow-500 transition-colors p-1"
              title={t('contactBox.btnEdit')}
            >
               <Edit2 size={16} />
            </button>
         )}
       </div>

       {isEditing ? (
         <div className="space-y-3 animate-fadeIn">
            <div>
               <label className="text-xs text-gray-500 mb-1 block">{t('contactBox.labelEmail')}</label>
               <input 
                 value={editForm.email}
                 onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                 className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm text-white focus:ring-1 focus:ring-yellow-500 outline-none"
               />
            </div>
            <div>
               <label className="text-xs text-gray-500 mb-1 block">{t('contactBox.labelPhone')}</label>
               <input 
                 value={editForm.phone}
                 onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                 className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm text-white focus:ring-1 focus:ring-yellow-500 outline-none"
               />
            </div>
            <div>
               <label className="text-xs text-gray-500 mb-1 block">{t('contactBox.labelInsta')}</label>
               <input 
                 value={editForm.instagram}
                 onChange={(e) => setEditForm({...editForm, instagram: e.target.value})}
                 className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm text-white focus:ring-1 focus:ring-yellow-500 outline-none"
               />
            </div>
            <div>
               <label className="text-xs text-gray-500 mb-1 block">{t('contactBox.labelAddress')}</label>
               <input 
                 value={editForm.address}
                 onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                 className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm text-white focus:ring-1 focus:ring-yellow-500 outline-none"
               />
            </div>

            <div className="flex gap-2 pt-2">
               <button onClick={handleSave} className="flex-1 bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-1.5 rounded text-xs flex items-center justify-center gap-1">
                 <Save size={14} /> {t('contactBox.btnSave')}
               </button>
               <button onClick={handleCancel} className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 py-1.5 rounded text-xs flex items-center justify-center gap-1">
                 <X size={14} /> {t('contactBox.btnCancel')}
               </button>
            </div>
         </div>
       ) : (
         <div className="space-y-3">
            {info.email && (
              <div className="flex items-center gap-3 text-sm text-gray-300">
                 <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-blue-400">
                    <Mail size={16} />
                 </div>
                 <span className="truncate">{info.email}</span>
              </div>
            )}
            {info.phone && (
              <div className="flex items-center gap-3 text-sm text-gray-300">
                 <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-green-400">
                    <Phone size={16} />
                 </div>
                 <span>{info.phone}</span>
              </div>
            )}
            {info.instagram && (
              <div className="flex items-center gap-3 text-sm text-gray-300">
                 <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-pink-400">
                    <Instagram size={16} />
                 </div>
                 <a 
                   href={`https://instagram.com/${info.instagram.replace('@','')}`} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="hover:text-pink-400 transition-colors"
                 >
                   {info.instagram}
                 </a>
              </div>
            )}
            {info.address && (
              <div className="flex items-center gap-3 text-sm text-gray-300">
                 <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-red-400">
                    <MapPin size={16} />
                 </div>
                 <span className="text-xs">{info.address}</span>
              </div>
            )}
         </div>
       )}
    </div>
  );
};

export default ContactInfoBox;
