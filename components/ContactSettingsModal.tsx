
import React, { useState, useEffect } from 'react';
import { ContactInfo } from '../types';
import Button from './Button';
import { X, Phone, Mail, Instagram, Edit2 } from 'lucide-react';

interface ContactSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactInfo: ContactInfo;
  onSave: (newInfo: ContactInfo) => void;
  t: (key: string) => string;
}

const ContactSettingsModal: React.FC<ContactSettingsModalProps> = ({ isOpen, onClose, contactInfo, onSave, t }) => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');

  useEffect(() => {
    if (isOpen) {
      setPhone(contactInfo.phone);
      setEmail(contactInfo.email);
      setInstagram(contactInfo.instagram);
    }
  }, [isOpen, contactInfo]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ phone, email, instagram });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col border border-gray-700">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-100 flex items-center gap-2">
            <Edit2 className="text-yellow-500" size={20} />
            {t('contact.editTitle')}
          </h3>
          <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-300">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-2">
               <Phone size={14} /> {t('contact.phone')}
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
              placeholder="080-1234-5678"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-2">
               <Mail size={14} /> {t('contact.email')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
              placeholder="contact@kairos.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-2">
               <Instagram size={14} /> {t('contact.instagram')}
            </label>
            <input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
              placeholder="@kairos.gc"
              required
            />
          </div>

          <div className="pt-2 flex gap-3">
             <Button type="button" variant="secondary" onClick={onClose} className="flex-1 !bg-gray-700 !border-gray-600 !text-gray-300">
                {t('contact.btnCancel')}
             </Button>
             <Button type="submit" className="flex-1 !bg-yellow-500 !text-black font-bold">
                {t('contact.btnSave')}
             </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ContactSettingsModal;
