
import React, { useState } from 'react';
import Button from './Button';
import Logo from './Logo';
import { Mail, Lock, ArrowRight, Phone, Eye, Shield } from 'lucide-react';
import { Language } from '../types';

interface LoginScreenProps {
  onLogin: (value: string, type: 'email' | 'phone') => void;
  t: (key: string) => string;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, t, language, setLanguage }) => {
  const [activeTab, setActiveTab] = useState<'viewer' | 'admin'>('viewer');
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onLogin(inputValue.trim().toLowerCase(), activeTab === 'viewer' ? 'phone' : 'email');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col ring-1 ring-yellow-600/20">
        
        {/* Header Visual */}
        <div className="bg-black p-8 text-center relative overflow-hidden border-b border-yellow-600/30">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
             <div className="absolute top-[-50px] left-[-50px] w-32 h-32 rounded-full bg-yellow-600 blur-3xl"></div>
             <div className="absolute bottom-[-20px] right-[-20px] w-24 h-24 rounded-full bg-yellow-500 blur-2xl"></div>
          </div>
          
           {/* Language Selector in Login */}
           <div className="absolute top-4 right-4 flex items-center gap-1 z-20">
              <button onClick={() => setLanguage('pt')} className={`text-lg hover:scale-110 transition-transform ${language === 'pt' ? 'opacity-100' : 'opacity-40'}`} title="Português">🇧🇷</button>
              <button onClick={() => setLanguage('en')} className={`text-lg hover:scale-110 transition-transform ${language === 'en' ? 'opacity-100' : 'opacity-40'}`} title="English">🇺🇸</button>
              <button onClick={() => setLanguage('jp')} className={`text-lg hover:scale-110 transition-transform ${language === 'jp' ? 'opacity-100' : 'opacity-40'}`} title="日本語">🇯🇵</button>
              <button onClick={() => setLanguage('es')} className={`text-lg hover:scale-110 transition-transform ${language === 'es' ? 'opacity-100' : 'opacity-40'}`} title="Español">🇪🇸</button>
           </div>

          <div className="flex flex-col items-center justify-center relative z-10 mb-2">
            <Logo className="h-16 w-auto text-yellow-500 mb-2" />
            <h1 className="text-5xl font-script text-yellow-500 drop-shadow-sm">{t('app.title')}</h1>
          </div>
          <p className="text-yellow-200/80 text-sm font-medium relative z-10 tracking-wider uppercase">{t('login.headerSub')}</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800">
          <button
            onClick={() => { setActiveTab('viewer'); setInputValue(''); }}
            className={`flex-1 py-4 text-sm font-medium text-center transition-colors flex items-center justify-center gap-2
              ${activeTab === 'viewer' ? 'text-yellow-500 border-b-2 border-yellow-500 bg-yellow-900/10' : 'text-gray-500 hover:text-gray-300'}
            `}
          >
            <Eye size={16} />
            {t('login.tabViewer')}
          </button>
          <button
            onClick={() => { setActiveTab('admin'); setInputValue(''); }}
            className={`flex-1 py-4 text-sm font-medium text-center transition-colors flex items-center justify-center gap-2
              ${activeTab === 'admin' ? 'text-gray-200 border-b-2 border-gray-600 bg-gray-800' : 'text-gray-500 hover:text-gray-300'}
            `}
          >
            <Shield size={16} />
            {t('login.tabAdmin')}
          </button>
        </div>

        {/* Login Form */}
        <div className="p-8">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold text-gray-100">
              {activeTab === 'viewer' ? t('login.viewerTitle') : t('login.adminTitle')}
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {activeTab === 'viewer' 
                ? t('login.viewerDesc') 
                : t('login.adminDesc')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">
                {activeTab === 'viewer' ? t('login.labelPhone') : t('login.labelEmail')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {activeTab === 'viewer' ? (
                    <Phone size={18} className="text-gray-500" />
                  ) : (
                    <Mail size={18} className="text-gray-500" />
                  )}
                </div>
                <input
                  type={activeTab === 'viewer' ? "tel" : "email"}
                  required
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  placeholder={activeTab === 'viewer' ? "+81 090-1354-5731" : "seu.nome@empresa.com"}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className={`w-full justify-center py-2.5 text-base font-bold shadow-md
                ${activeTab === 'viewer' 
                  ? '!bg-gray-100 !text-black hover:!bg-gray-300' 
                  : '!bg-yellow-500 !text-black hover:!bg-yellow-400'}
              `}
              icon={<ArrowRight size={18} />}
            >
              {activeTab === 'viewer' ? t('login.btnAccess') : t('login.btnContinue')}
            </Button>
          </form>

          <div className="mt-8 border-t border-gray-800 pt-6">
            <div className="flex items-start gap-3 text-xs text-gray-500">
               <Lock size={14} className="mt-0.5 flex-shrink-0 text-yellow-600" />
               <p>
                 {activeTab === 'viewer' 
                   ? t('login.footerViewer') 
                   : t('login.footerAdmin')}
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
