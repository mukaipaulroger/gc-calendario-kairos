
import React, { useState, useEffect } from 'react';
import { addMonths, format } from 'date-fns';
import subMonths from 'date-fns/subMonths';
import ptBR from 'date-fns/locale/pt-BR';
import ja from 'date-fns/locale/ja';
import enUS from 'date-fns/locale/en-US';
import es from 'date-fns/locale/es';
import { CalendarEvent, User, EventType, UserRole, PrayerRequest, ContactMethod, Language, ContactInfo } from './types';
import { USERS, DEFAULT_CONTACT_INFO } from './constants';
import { TRANSLATIONS } from './translations';
import CalendarGrid from './components/CalendarGrid';
import EventModal from './components/EventModal';
import NewsList from './components/NewsList';
import Avatar from './components/Avatar';
import Button from './components/Button';
import LoginScreen from './components/LoginScreen';
import ModeratorPanel from './components/ModeratorPanel';
import ProfileModal from './components/ProfileModal';
import PrayerModal from './components/PrayerModal';
import ContactCard from './components/ContactCard';
import ContactSettingsModal from './components/ContactSettingsModal';
import Logo from './components/Logo';
import DailyVerse from './components/DailyVerse';
import { ChevronLeft, ChevronRight, LogOut, ShieldAlert, Heart } from 'lucide-react';
import { suggestEvents } from './services/geminiService';

const App: React.FC = () => {
  // Localization State
  const [language, setLanguage] = useState<Language>('pt');

  // Translation Helper
  const t = (key: string) => {
    const keys = key.split('.');
    let value = TRANSLATIONS[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  // Date-fns locale mapping
  const localeMap = {
    pt: ptBR,
    jp: ja, // Fixed: key must be 'jp' to match Language type
    en: enUS,
    es: es
  };

  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(USERS);
  
  // App State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModeratorPanelOpen, setIsModeratorPanelOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(DEFAULT_CONTACT_INFO);
  const [isSuggesting, setIsSuggesting] = useState(false);

  // Initialize with dummy events
  useEffect(() => {
    const today = new Date();
    setEvents([
      {
        id: '1',
        title: 'Reunião de Planejamento',
        description: 'Definição de metas para o Q4 com toda a equipe administrativa.',
        date: today,
        type: 'notice',
        authorId: 'u1',
        createdAt: new Date(),
      },
      {
        id: '2',
        title: 'Manutenção do Servidor',
        description: 'Os sistemas ficarão indisponíveis das 22h às 02h.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
        type: 'urgent',
        authorId: 'u3',
        createdAt: new Date(),
      }
    ]);
  }, []);

  const handleLogin = (inputValue: string, type: 'email' | 'phone') => {
    
    // Helper to increment login count
    const incrementLogin = (u: User) => {
        const updatedUser = { ...u, loginCount: (u.loginCount || 0) + 1 };
        setUsers(prev => prev.map(user => user.id === u.id ? updatedUser : user));
        return updatedUser;
    };

    // 1. Phone Login (Viewer - Immediate Access)
    if (type === 'phone') {
      const existingUser = users.find(u => u.phone === inputValue);
      
      if (existingUser) {
        if (existingUser.status === 'blocked') {
          alert("Acesso bloqueado pelo administrador.");
          return;
        }
        setCurrentUser(incrementLogin(existingUser));
      } else {
        // Create new viewer user immediately approved
        const newUser: User = {
          id: `u${Date.now()}`,
          name: `Visitante ${inputValue.slice(-4)}`,
          phone: inputValue,
          avatarUrl: `https://picsum.photos/seed/${inputValue}/100/100`,
          role: 'viewer',
          status: 'approved', // Immediate approval for phone
          isGCMember: false,
          loginCount: 1
        };
        setUsers([...users, newUser]);
        setCurrentUser(newUser);
      }
      return;
    }

    // 2. Email Login (Admin/Editor - Requires Approval)
    const existingUser = users.find(u => u.email === inputValue);

    if (existingUser) {
      if (existingUser.status === 'approved') {
        setCurrentUser(incrementLogin(existingUser));
      } else if (existingUser.status === 'blocked') {
        alert("Acesso bloqueado. Contate o administrador.");
      } else {
        alert("Sua conta aguarda aprovação de um moderador.");
      }
    } else {
      // Create new pending user
      const newUser: User = {
        id: `u${Date.now()}`,
        name: inputValue.split('@')[0], 
        email: inputValue,
        avatarUrl: `https://picsum.photos/seed/${inputValue}/100/100`,
        role: 'editor', // Requesting editor access usually implies this path
        status: 'pending',
        isGCMember: false,
        loginCount: 0
      };
      setUsers([...users, newUser]);
      
      console.log(`[Simulação] Enviando e-mail de notificação para pr.mukai@gmail.com sobre novo usuário: ${inputValue}`);
      alert(`Solicitação de acesso enviada com sucesso!\n\nUma notificação por e-mail foi enviada para o moderador (pr.mukai@gmail.com).\n\nAguarde a aprovação.`);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsModeratorPanelOpen(false);
  };

  const handleApproveUser = (userId: string, role: UserRole) => {
    // When approving, we also clear any requestedRole
    setUsers(users.map(u => u.id === userId ? { ...u, status: 'approved', role, requestedRole: undefined } : u));
  };

  const handleRejectUser = (userId: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: 'blocked' } : u));
  };

  const handleUpdateProfile = (updatedUser: User) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    setCurrentUser(updatedUser);
  };

  const handleRequestRole = (requestedRole: UserRole) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, requestedRole };
    setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
    setCurrentUser(updatedUser);
    alert('Sua solicitação para se tornar Moderador foi enviada para análise do Pr. Mukai.');
  };

  const handleSendPrayer = (content: string, isAnonymous: boolean, contactData?: { allowed: boolean, method?: ContactMethod, info?: string }) => {
    if (!currentUser) return;
    
    const newRequest: PrayerRequest = {
      id: `prayer-${Date.now()}`,
      content,
      authorId: currentUser.id,
      isAnonymous,
      createdAt: new Date(),
      contactAllowed: contactData?.allowed,
      contactMethod: contactData?.method,
      contactInfo: contactData?.info
    };
    
    setPrayerRequests([newRequest, ...prayerRequests]);
    
    // Simulate notification to admin
    console.log(`[ADMIN NOTIFICATION] Novo pedido de oração recebido de ${isAnonymous ? 'Anônimo' : currentUser.name}`);
    alert('Seu pedido de oração foi enviado com sucesso.\n\nO administrador foi notificado.');
  };

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (title: string, description: string, type: EventType) => {
    if (selectedDate && currentUser) {
      const newEvent: CalendarEvent = {
        id: Math.random().toString(36).substr(2, 9),
        title,
        description,
        date: selectedDate,
        type,
        authorId: currentUser.id,
        createdAt: new Date(),
      };
      setEvents([...events, newEvent]);
    }
  };

  const handleSuggestEvents = async () => {
      setIsSuggesting(true);
      const monthName = format(currentDate, 'MMMM yyyy', { locale: localeMap[language] });
      const suggestions = await suggestEvents(monthName);
      
      if (suggestions.length > 0) {
          const newEvents: CalendarEvent[] = suggestions.map((s, idx) => ({
              id: Math.random().toString(36).substr(2, 9),
              title: s.title,
              description: s.description,
              date: new Date(currentDate.getFullYear(), currentDate.getMonth(), idx + 10),
              type: 'news',
              authorId: 'u5',
              createdAt: new Date()
          }));
          setEvents(prev => [...prev, ...newEvents]);
      }
      setIsSuggesting(false);
  };

  const handleUpdateContactInfo = (newInfo: ContactInfo) => {
    setContactInfo(newInfo);
  };

  const handleContactEdit = () => {
    if (isSuperAdmin) {
      setIsContactModalOpen(true);
      return;
    }

    if (isAdmin) {
      const pwd = window.prompt(t('contact.promptPass'));
      if (pwd === "eunaosoudaqui1") {
        setIsContactModalOpen(true);
      } else {
        alert(t('contact.errorPass'));
      }
    }
  };

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} t={t} language={language} setLanguage={setLanguage} />;
  }

  const pendingCount = users.filter(u => u.status === 'pending' || u.requestedRole === 'admin').length;
  const newPrayersCount = prayerRequests.length;
  const isAdmin = currentUser.role === 'admin';
  const isSuperAdmin = currentUser.email === 'pr.mukai@gmail.com';
  const canEdit = currentUser.role === 'admin' || currentUser.role === 'editor';

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col text-gray-100 font-sans">
      
      {/* Top Navigation Bar */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
           <div className="flex items-end gap-3 pb-1">
             {/* Logo Kairós */}
             <Logo className="h-10 w-auto text-yellow-500 mb-1" />
             <h1 className="text-5xl font-script text-gray-100 leading-none hidden sm:block" style={{ transform: 'translateY(4px)' }}>{t('app.title')}</h1>
             <span className="text-xl font-medium text-gray-500 mb-1 ml-1 border-l-2 border-gray-700 pl-3 leading-tight hidden md:inline-block">{t('app.subtitle')}</span>
           </div>

           {/* User Control */}
           <div className="flex items-center gap-4">
              
               {/* Language Selector */}
               <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1 border border-gray-700">
                  <button onClick={() => setLanguage('pt')} className={`p-1.5 rounded ${language === 'pt' ? 'bg-gray-700' : 'opacity-50 hover:opacity-100'}`} title="Português">🇧🇷</button>
                  <button onClick={() => setLanguage('en')} className={`p-1.5 rounded ${language === 'en' ? 'bg-gray-700' : 'opacity-50 hover:opacity-100'}`} title="English">🇺🇸</button>
                  <button onClick={() => setLanguage('jp')} className={`p-1.5 rounded ${language === 'jp' ? 'bg-gray-700' : 'opacity-50 hover:opacity-100'}`} title="日本語">🇯🇵</button>
                  <button onClick={() => setLanguage('es')} className={`p-1.5 rounded ${language === 'es' ? 'bg-gray-700' : 'opacity-50 hover:opacity-100'}`} title="Español">🇪🇸</button>
               </div>

              {/* Prayer Button (For everyone) */}
              <button 
                onClick={() => setIsPrayerModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-full shadow-lg transition-all transform hover:scale-105 font-bold text-sm border border-pink-500/50"
                title={t('app.prayerButton')}
              >
                <Heart size={18} fill="currentColor" />
                <span className="hidden sm:inline">{t('app.prayerButton')}</span>
              </button>

              {isAdmin && (
                <button 
                  onClick={() => setIsModeratorPanelOpen(true)}
                  className="relative p-2 text-gray-400 hover:text-yellow-500 transition-colors rounded-full hover:bg-gray-800"
                  title="Painel do Moderador"
                >
                  <ShieldAlert size={20} />
                  {(pendingCount > 0 || newPrayersCount > 0) && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-gray-900 animate-pulse"></span>
                  )}
                </button>
              )}

              <div className="flex items-center gap-3 bg-gray-800 py-1.5 pl-3 pr-2 rounded-full border border-gray-700">
                  <div 
                    className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setIsProfileModalOpen(true)}
                    title="Editar Perfil"
                  >
                    <Avatar 
                      src={currentUser.avatarUrl}
                      alt={currentUser.name}
                      size="sm"
                    />
                    <div className="text-right hidden sm:block">
                      <p className="text-xs font-bold text-gray-200 max-w-[100px] truncate">{currentUser.name}</p>
                      <p className="text-[10px] text-gray-500 capitalize">{t(`app.profile.${currentUser.role}`)}</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="ml-2 p-1 text-gray-500 hover:text-red-400 transition-colors rounded-full hover:bg-gray-700"
                    title={t('app.logout')}
                  >
                    <LogOut size={16} />
                  </button>
              </div>
           </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:h-[calc(100vh-10rem)] h-auto">
          
          {/* Main Calendar Section */}
          <div className="flex-1 flex flex-col min-h-[500px] lg:min-h-0">
             
             {/* Calendar Controls */}
             <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl font-bold text-gray-100 capitalize">
                    {format(currentDate, language === 'jp' ? 'yyyy年 MMMM' : 'MMMM yyyy', { locale: localeMap[language] })}
                  </h2>
                  <div className="flex bg-gray-800 rounded-lg border border-gray-700 shadow-sm overflow-hidden">
                    <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-700 text-gray-400 rounded-l-lg border-r border-gray-700">
                       <ChevronLeft size={20} />
                    </button>
                    <button onClick={handleNextMonth} className="p-2 hover:bg-gray-700 text-gray-400 rounded-r-lg">
                       <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
                
                {canEdit && (
                  <Button 
                      variant="secondary" 
                      icon={<span className="text-lg">✨</span>}
                      onClick={handleSuggestEvents}
                      isLoading={isSuggesting}
                      className="!bg-gray-800 !text-gray-200 !border-gray-700 hover:!bg-gray-700"
                  >
                      {t('calendar.aiSuggest')}
                  </Button>
                )}
             </div>

             <div className="flex-1 min-h-0">
               <CalendarGrid 
                 currentDate={currentDate} 
                 events={events} 
                 users={users}
                 onDateClick={handleDateClick}
                 userRole={currentUser.role}
                 t={t}
                 locale={localeMap[language]}
               />
             </div>
          </div>

          {/* Sidebar News Feed */}
          <div className="w-full lg:w-96 flex-shrink-0 lg:h-full h-auto flex flex-col gap-4">
             {/* Daily Verse Component */}
             <DailyVerse language={language} />
             
             <div className="flex-1 min-h-0">
                <NewsList events={events} users={users} t={t} locale={localeMap[language]} />
             </div>

             {/* Contact Info Card */}
             <ContactCard 
               contactInfo={contactInfo}
               onEdit={handleContactEdit}
               canEdit={isAdmin}
               t={t}
             />
          </div>

        </div>
      </main>

      <EventModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        currentUser={currentUser}
        onSave={handleSaveEvent}
        events={events}
        t={t}
        locale={localeMap[language]}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentUser={currentUser}
        onSave={handleUpdateProfile}
        onRequestRole={handleRequestRole}
        t={t}
      />

      <PrayerModal 
        isOpen={isPrayerModalOpen}
        onClose={() => setIsPrayerModalOpen(false)}
        currentUser={currentUser}
        onSend={handleSendPrayer}
        t={t}
      />

      <ContactSettingsModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        contactInfo={contactInfo}
        onSave={handleUpdateContactInfo}
        t={t}
      />

      {isAdmin && (
        <ModeratorPanel 
          isOpen={isModeratorPanelOpen}
          onClose={() => setIsModeratorPanelOpen(false)}
          users={users}
          currentUser={currentUser}
          prayerRequests={prayerRequests}
          onApprove={handleApproveUser}
          onReject={handleRejectUser}
          t={t}
          locale={localeMap[language]}
        />
      )}
    </div>
  );
};

export default App;
