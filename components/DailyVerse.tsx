
import React, { useEffect, useState } from 'react';
import { getDailyVerse, translateContent } from '../services/geminiService';
import { BookOpen, RefreshCw, Languages, Loader2, X } from 'lucide-react';
import { Language } from '../types';

interface DailyVerseProps {
  language: Language;
  t: (key: string) => string;
}

const DailyVerse: React.FC<DailyVerseProps> = ({ language, t }) => {
  const [verse, setVerse] = useState<{ text: string; reference: string; version: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [showTranslateMenu, setShowTranslateMenu] = useState(false);
  
  // Translation state
  const [translatedVerse, setTranslatedVerse] = useState<{ text: string; reference: string; version: string } | null>(null);

  const getLocaleCode = (lang: Language) => {
    switch (lang) {
      case 'jp': return 'ja-JP';
      case 'es': return 'es-ES';
      case 'en': return 'en-US';
      default: return 'pt-BR';
    }
  };

  const fetchVerse = async () => {
    setIsLoading(true);
    setTranslatedVerse(null); // Reset translation on new fetch
    setShowTranslateMenu(false);
    try {
      const data = await getDailyVerse(getLocaleCode(language));
      setVerse(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTranslate = async (targetLang: Language) => {
    if (!verse) return;
    
    setIsTranslating(true);
    setShowTranslateMenu(false);
    try {
      const targetCode = getLocaleCode(targetLang);
      // Translate text and reference
      const [transText, transRef] = await Promise.all([
        translateContent(verse.text, targetCode),
        translateContent(verse.reference, targetCode)
      ]);
      
      setTranslatedVerse({
        text: transText,
        reference: transRef,
        version: verse.version // Version usually stays the same acronym or we could translate it too
      });
    } catch (error) {
      console.error("Translation failed", error);
    } finally {
      setIsTranslating(false);
    }
  };

  const resetTranslation = () => {
    setTranslatedVerse(null);
  };

  useEffect(() => {
    fetchVerse();
  }, [language]);

  const displayVerse = translatedVerse || verse;

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-gray-900 rounded-2xl shadow-lg border border-indigo-500/30 overflow-visible relative group">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none overflow-hidden rounded-2xl h-full w-full">
        <BookOpen size={100} className="absolute -right-4 -top-4" />
      </div>
      
      <div className="p-5 relative z-10">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
            <BookOpen size={16} />
            {t('dailyVerse.title')}
          </h3>
          
          <div className="flex items-center gap-1">
             {/* Translation Button */}
             <div className="relative">
                <button 
                  onClick={() => translatedVerse ? resetTranslation() : setShowTranslateMenu(!showTranslateMenu)}
                  disabled={isLoading || isTranslating}
                  className={`transition-colors p-1.5 rounded-full ${translatedVerse ? 'text-indigo-300 bg-indigo-900/50 hover:bg-indigo-900' : 'text-gray-500 hover:text-indigo-400 hover:bg-white/5'}`}
                  title="Traduzir / Translate"
                >
                  {translatedVerse ? <X size={14} /> : <Languages size={14} />}
                </button>

                {/* Language Menu */}
                {showTranslateMenu && (
                  <div className="absolute right-0 top-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-1 flex gap-1 z-50">
                    {(['pt', 'en', 'es', 'jp'] as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => handleTranslate(lang)}
                        className="p-1.5 hover:bg-gray-700 rounded text-lg transition-colors"
                        title={lang.toUpperCase()}
                      >
                        {lang === 'pt' ? '🇧🇷' : lang === 'en' ? '🇺🇸' : lang === 'es' ? '🇪🇸' : '🇯🇵'}
                      </button>
                    ))}
                  </div>
                )}
             </div>

             {/* Refresh Button */}
             <button 
                onClick={fetchVerse} 
                disabled={isLoading || isTranslating}
                className={`text-gray-500 hover:text-indigo-400 transition-colors p-1.5 rounded-full hover:bg-white/5 ${isLoading || isTranslating ? 'animate-spin' : ''}`}
                title="Novo Versículo / Refresh"
              >
                {isTranslating ? <Loader2 size={14} /> : <RefreshCw size={14} />}
              </button>
          </div>
        </div>

        {isLoading ? (
          <div className="h-24 flex items-center justify-center">
            <p className="text-gray-400 text-sm animate-pulse">{t('dailyVerse.loading')}</p>
          </div>
        ) : displayVerse ? (
          <div className="space-y-3 animate-fadeIn">
            <p className="text-gray-100 font-serif italic text-lg leading-relaxed">
              "{displayVerse.text}"
            </p>
            <div className="flex justify-end items-center gap-2 text-xs">
              <span className="font-bold text-indigo-400">{displayVerse.reference}</span>
              <span className="text-gray-500 bg-gray-800 px-1.5 py-0.5 rounded border border-gray-700">{displayVerse.version}</span>
            </div>
          </div>
        ) : (
          <div className="h-24 flex items-center justify-center">
             <p className="text-gray-500 text-xs">...</p>
          </div>
        )}
      </div>
      
      {/* Bottom accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-50 rounded-b-2xl"></div>
    </div>
  );
};

export default DailyVerse;
