
import React from 'react';
import { ContactInfo } from '../types';
import { Phone, Mail, Instagram, Edit2 } from 'lucide-react';

interface ContactCardProps {
  contactInfo: ContactInfo;
  onEdit: () => void;
  canEdit: boolean;
  t: (key: string) => string;
}

const ContactCard: React.FC<ContactCardProps> = ({ contactInfo, onEdit, canEdit, t }) => {
  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-5 mt-auto relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-100">{t('contact.title')}</h3>
        {canEdit && (
          <button 
            onClick={onEdit}
            className="p-1.5 rounded-full hover:bg-gray-700 text-gray-400 hover:text-yellow-500 transition-colors"
            title={t('contact.editTitle')}
            type="button"
          >
            <Edit2 size={16} />
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 group">
           <div className="bg-gray-700 p-2 rounded-full text-green-400 group-hover:bg-green-900/30 transition-colors">
              <Phone size={18} />
           </div>
           <div>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{t('contact.phone')}</p>
              <p className="text-sm font-medium text-gray-200">{contactInfo.phone}</p>
           </div>
        </div>

        <div className="flex items-center gap-3 group">
           <div className="bg-gray-700 p-2 rounded-full text-blue-400 group-hover:bg-blue-900/30 transition-colors">
              <Mail size={18} />
           </div>
           <div>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{t('contact.email')}</p>
              <p className="text-sm font-medium text-gray-200 break-all">{contactInfo.email}</p>
           </div>
        </div>

        <div className="flex items-center gap-3 group">
           <div className="bg-gray-700 p-2 rounded-full text-pink-400 group-hover:bg-pink-900/30 transition-colors">
              <Instagram size={18} />
           </div>
           <div>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{t('contact.instagram')}</p>
              <p className="text-sm font-medium text-gray-200">{contactInfo.instagram}</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
