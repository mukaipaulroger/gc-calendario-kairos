
import React, { useState, useEffect } from 'react';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR, ja, enUS, es } from 'date-fns/locale';
import { CalendarEvent, User, EventType, UserRole, PrayerRequest, ContactMethod, Language } from './types';
import { USERS } from './constants';
import { TRANSLATIONS } from './translations';
import CalendarGrid from './components/CalendarGrid';
import EventModal from './components/EventModal';
import NewsList from './components/NewsList';
import DailyVerse from './components/DailyVerse';
import Avatar from './components/Avatar';
import Button from './components/Button';
import LoginScreen from './components/LoginScreen';
import ModeratorPanel from './components/ModeratorPanel';
import ProfileModal from './components/ProfileModal';
import PrayerModal from './components/PrayerModal';
import ContactInfoBox from './components/ContactInfoBox';
import { ChevronLeft, ChevronRight, LogOut, ShieldAlert, Heart } from 'lucide-react';
import { suggestEvents } from './services/geminiService';
import Logo from './components/Logo';

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
    jp: ja,
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
  
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);

  // Initialize with dummy events
  useEffect(() => {
    const today = new Date();
    setEvents([
      {
        id: '1',
        title: 'Culto de Celebração',
        description: 'Culto da família com Santa Ceia.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + (7 - today.getDay())), // Next Sunday
        type: 'notice',
        authorId: 'u1',
        createdAt: new Date()
      },
      {
        id: '2',
        title: 'Reunião de Líderes',
        description: 'Alinhamento mensal no escritório.',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
        type: 'news',
        authorId: 'u2',
        createdAt: new Date()
      },
      {
        id: '3',
        title: 'Versículo da Semana',
        description: 'O Senhor é o meu pastor e nada me faltará.',
        date: today,
        type: 'reflection',
        authorId: 'u5',
        createdAt: new Date()
      }
    ]);
  }, []);

  const handleLogin = (identifier: string, type: 'email' | 'phone', extraData?: { name: string; phone: string }) => {
    // Normalização: remove tudo que não for dígito para comparação
    const normalize = (str: string) => str.replace(/\D/g, '');
    const cleanId = type === 'phone' ? normalize(identifier) : identifier;

    let user = users.find(u => {
       if (type === 'email') return u.email === identifier;
       if (type === 'phone') {
          return u.phone && normalize(u.phone) === cleanId;
       }
       return false;
    });

    // Fluxo de Cadastro de Admin (Quando extraData existe - Modal de Cadastro)
    if (!user && extraData) {
        const newUser: User = {
            id: `u_${Date.now()}`,
            name: extraData.name,
            email: type === 'email' ? identifier : undefined,
            phone: type === 'phone' ? identifier : extraData.phone,
            role: 'viewer', // Inicialmente viewer, aguardando aprovação para admin/editor
            status: 'pending',
            avatarUrl: `https://picsum.photos/seed/${identifier}/100/100`,
            loginCount: 0
        };
        setUsers([...users, newUser]);
        alert("Solicitação enviada! Aguarde aprovação de um moderador.");
        return;
    }

    // Fluxo de Visualizador (Acesso Rápido) - Registro Automático no "Banco de Dados"
    if (!user && type === 'phone') {
        // Cria um novo registro de usuário automaticamente
        const newRegisteredUser: User = {
            id: `u_auto_${Date.now()}`, // ID único
            name: `Usuário ${identifier.slice(-4)}`, // Nome padrão baseado no final do telefone
            phone: identifier,
            role: 'viewer',
            status: 'approved', // Auto-aprovado para acesso imediato
            avatarUrl: `https://picsum.photos/seed/${cleanId}/100/100`, // Avatar determinístico
            loginCount: 1,
            city: 'Novo Registro',
            isGCMember: false
        };

        // Adiciona ao estado (Simulando INSERT no Banco de Dados)
        const updatedUserList = [...users, newRegisteredUser];
        setUsers(updatedUserList);
        
        // Loga o usuário imediatamente
        setCurrentUser(newRegisteredUser);
        return;
    }

    // Login normal de usuário já existente
    if (user) {
        if (user.status === 'blocked') {
            alert("Acesso bloqueado. Contate o administrador.");
            return;
        }
        if (user.status === 'pending') {
             alert("Sua conta ainda está aguardando aprovação.");
             return;
        }
        
        // Atualiza contagem de login
        const updatedUser = { ...user, loginCount: (user.loginCount || 0) + 1 };
        setUsers(users.map(u => u.id === user!.id ? updatedUser : u));
        setCurrentUser(updatedUser);
    } else {
        alert("Usuário não encontrado. Se você é um administrador, use a opção de cadastro.");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsProfileModalOpen(false);
    setIsModeratorPanelOpen(false);
  };

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
        createdAt: new Date()
      };
      setEvents([...events, newEvent]);
    }
  };

  const handleUpdateProfile = (updatedUser: User) => {
      setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
      setCurrentUser(updatedUser);
  };

  const handleRequestRole = (role: UserRole) => {
      if (!currentUser) return;
      const updated = { ...currentUser, requestedRole: role };
      handleUpdateProfile(updated);
  };

  const handleApproveUser = (userId: string, role: UserRole) => {
      setUsers(users.map(u => u.id === userId ? { ...u, status: 'approved', role, requestedRole: undefined } : u));
  };

  const handleRejectUser = (userId: string) => {
      setUsers(users.filter(u => u.id !== userId));
  };

  const handleSendPrayer = (content: string, isAnonymous: boolean, contactData?: any) => {
      if (!currentUser) return;
      const newPrayer: PrayerRequest = {
          id: Math.random().toString(36).substr(2, 9),
          content,
          authorId: currentUser.id,
          isAnonymous,
          createdAt: new Date(),
          contactAllowed: contactData?.allowed,
          contactMethod: contactData?.method,
          contactInfo: contactData?.info
      };
      setPrayerRequests([newPrayer, ...prayerRequests]);
      alert("Pedido de oração enviado com sucesso!");
  };

  if (!currentUser) {
    return (
      <LoginScreen 
        onLogin={handleLogin} 
        t={t} 
        language={language} 
        setLanguage={setLanguage}
        users={users}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans transition-colors duration-500">
      
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-3 flex items-center justify-between sticky top-0 z-40 shadow-lg">
        <div className="flex items-center gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
             <Logo className="h-10 w-28" />
          </div>
          
          {/* Language Selector */}
          <div className="bg-gray-900/50 p-1 rounded-lg border border-gray-700 flex gap-1">
              {(['pt', 'en', 'es', 'jp'] as Language[]).map(lang => (
                 <button 
                   key={lang}
                   onClick={() => setLanguage(lang)}
                   className={`w-6 h-6 flex items-center justify-center rounded transition-all hover:scale-110 ${language === lang ? 'bg-gray-700 shadow-sm' : 'opacity-40 hover:opacity-100'}`}
                   title={lang}
                 >
                   {lang === 'pt' ? '🇧🇷' : lang === 'en' ? '🇺🇸' : lang === 'es' ? '🇪🇸' : '🇯🇵'}
                 </button>
              ))}
          </div>

        </div>

        <div className="flex items-center gap-2">
            
            {/* Prayer Request Button */}
            <Button 
               variant="primary" 
               onClick={() => setIsPrayerModalOpen(true)}
               className="!rounded-full px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 border-none shadow-lg shadow-pink-900/20 flex items-center"
            >
               <Heart className="fill-white" size={20} />
               <span className="ml-2 font-bold whitespace-nowrap hidden sm:inline">{t('app.prayerButton')}</span>
               <span className="ml-2 font-bold whitespace-nowrap sm:hidden">Oração</span>
            </Button>

            {/* Moderator Panel (If Admin/Editor) */}
            {(currentUser.role === 'admin' || currentUser.role === 'editor') && (
               <div className="relative">
                  <button 
                    onClick={() => setIsModeratorPanelOpen(true)}
                    className="p-2 text-gray-400 hover:text-white transition-colors relative"
                    title={t('moderator.title')}
                  >
                    <ShieldAlert size={24} />
                    {users.filter(u => u.status === 'pending').length > 0 && (
                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-gray-800"></span>
                    )}
                  </button>
               </div>
            )}

            {/* User Profile */}
            <div className="flex items-center gap-2 border-l border-gray-700 pl-2 ml-1">
              <Avatar 
                src={currentUser.avatarUrl} 
                alt={currentUser.name} 
                size="md" 
                onClick={() => setIsProfileModalOpen(true)}
                className="cursor-pointer ring-2 ring-gray-700 hover:ring-yellow-500 transition-all"
              />
              <button onClick={handleLogout} className="text-gray-500 hover:text-red-400 p-1">
                 <LogOut size={20} />
              </button>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Sidebar (Daily Verse & News & Contact) */}
        <aside className="w-full md:w-80 bg-gray-800/50 border-r border-gray-700 flex flex-col overflow-y-auto order-2 md:order-1 scrollbar-thin scrollbar-thumb-gray-600">
           <div className="p-4 flex-shrink-0 space-y-4">
             <DailyVerse language={language} t={t} />
             <ContactInfoBox isAdmin={currentUser.role === 'admin'} t={t} />
           </div>
           <div className="flex-1 p-4 pt-0">
             <NewsList events={events} users={users} t={t} locale={localeMap[language]} />
           </div>
        </aside>

        {/* Calendar Grid Area */}
        <main className="flex-1 flex flex-col bg-gray-900 relative overflow-hidden order-1 md:order-2">
            
            {/* Calendar Controls */}
            <div className="p-4 flex items-center justify-between">
               <h2 className="text-2xl font-bold text-gray-100 capitalize flex items-center gap-2">
                  {format(currentDate, localeMap[language].code === 'ja' ? 'yyyy年 MMMM' : 'MMMM yyyy', { locale: localeMap[language] })}
               </h2>
               
               <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1 border border-gray-700">
                  <button 
                    onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                    className="p-1.5 hover:bg-gray-700 rounded-md text-gray-400 hover:text-white"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => setCurrentDate(new Date())}
                    className="px-3 py-1.5 hover:bg-gray-700 rounded-md text-xs font-bold text-gray-300"
                  >
                    {t('calendar.details')}
                  </button>
                  <button 
                    onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                    className="p-1.5 hover:bg-gray-700 rounded-md text-gray-400 hover:text-white"
                  >
                    <ChevronRight size={20} />
                  </button>
               </div>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-auto p-4 pt-0">
               <div className="h-full rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
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
        </main>
      </div>

      {/* Modals */}
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

    </div>
  );
};

export default App;
