
import React, { useState, useEffect } from 'react';
import { BIBLE_VERSES } from '../constants';
import { Language } from '../types';
import { translateContent } from '../services/geminiService';
import { BookOpen, Languages, Loader2 } from 'lucide-react';
import Button from './Button';

interface DailyVerseProps {
  language: Language;
}

const DailyVerse: React.FC<DailyVerseProps> = ({ language }) => {
  const [verse, setVerse] = useState<{ ref: string; text: string }>({ ref: '', text: '' });
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    // Select verse based on day of month to ensure rotation (1-31)
    const dayOfMonth = new Date().getDate();
    const index = (dayOfMonth - 1) % BIBLE_VERSES.length;
    setVerse(BIBLE_VERSES[index]);
    setTranslatedText(null); // Reset translation when date changes (though date changes rarely)
  }, []);

  // Reset translation if language changes back to PT
  useEffect(() => {
    if (language === 'pt') {
        setTranslatedText(null);
    }
  }, [language]);

  const handleTranslate = async () => {
    if (language === 'pt') return; // Original is PT
    
    setIsTranslating(true);
    try {
      const translated = await translateContent(`${verse.ref} - ${verse.text}`, language === 'jp' ? 'ja' : language);
      setTranslatedText(translated);
    } catch (error) {
      console.error("Erro ao traduzir versículo:", error);
    } finally {
      setIsTranslating(false);
    }
  };

  if (!verse.text) return null;

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg border border-yellow-600/30 p-5 mb-6 relative overflow-hidden group">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <BookOpen size={80} className="text-yellow-500" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
            <span className="bg-yellow-900/30 text-yellow-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide border border-yellow-600/30">
                Versículo do Dia (NVI)
            </span>
            {language !== 'pt' && (
                <button 
                    onClick={handleTranslate} 
                    disabled={isTranslating || !!translatedText}
                    className="text-gray-400 hover:text-yellow-400 transition-colors disabled:opacity-50"
                    type="button"
                    title="Traduzir Versículo"
                >
                    {isTranslating ? <Loader2 size={14} className="animate-spin" /> : <Languages size={14} />}
                </button>
            )}
        </div>

        <p className="text-gray-200 text-lg font-serif italic leading-relaxed mb-2">
            "{translatedText || verse.text}"
        </p>
        
        <p className="text-yellow-500 font-bold text-sm text-right">
            — {verse.ref}
        </p>
      </div>
    </div>
  );
};

export default DailyVerse;
