import { Language } from './types';

export const TRANSLATIONS: Record<Language, any> = {
  pt: {
    app: {
      title: 'Kairós',
      subtitle: 'Calendário',
      prayerButton: 'Pedido de Oração',
      profile: {
        viewer: 'Visualizador',
        editor: 'Editor',
        admin: 'Admin'
      },
      logout: 'Sair'
    },
    login: {
      headerSub: 'Calendário',
      tabViewer: 'Visualizador',
      tabAdmin: 'Membro / Admin',
      viewerTitle: 'Acesso Rápido',
      viewerDesc: 'Digite seu celular para visualizar o calendário.',
      adminTitle: 'Área Restrita',
      adminDesc: 'Login exclusivo para moderadores e editores.',
      labelPhone: 'Celular',
      labelEmail: 'E-mail Corporativo',
      btnAccess: 'Acessar Calendário',
      btnContinue: 'Continuar',
      footerViewer: 'O modo visualizador não requer senha ou aprovação prévia.',
      footerAdmin: 'Novos e-mails entrarão automaticamente na fila de aprovação.'
    },
    calendar: {
      weekDays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      emptyDay: 'Nenhum evento agendado para este dia.',
      details: 'Detalhes do Dia',
      aiSuggest: 'Sugestões IA',
      loading: 'Gerando...'
    },
    eventModal: {
      addTitle: 'Adicionar Novo Evento',
      fieldTitle: 'Título',
      fieldDesc: 'Mensagem',
      placeholderTitle: 'Ex: Reunião Geral...',
      placeholderDesc: 'Escreva os detalhes...',
      enhanceAI: 'Melhorar com IA',
      enhancing: 'Melhorando...',
      urgentHelp: 'Eventos marcados como importantes serão destacados.',
      btnClose: 'Fechar',
      btnPublish: 'Publicar',
      types: {
        notice: 'Avisos',
        news: 'Eventos',
        urgent: 'Importante'
      }
    },
    prayerModal: {
      title: 'Pedido de Oração',
      placeholder: 'Descreva seu pedido de oração aqui...',
      labelRequest: 'Seu Pedido',
      verse: '"Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus." (Filipenses 4:6)',
      modeAnon: 'Modo Anônimo',
      modeName: 'Mostrar meu nome',
      descAnon: 'Seu nome não aparecerá na lista.',
      descName: 'Enviado como',
      contactTitle: 'Podemos entrar em contato?',
      contactDesc: 'Gostaria de receber uma resposta ou apoio.',
      formContact: 'Forma de Contato',
      labelEmail: 'Endereço de E-mail',
      labelPhone: 'Número do Telefone',
      btnSend: 'Enviar Pedido'
    },
    profileModal: {
      title: 'Meu Perfil',
      changePhoto: 'Toque no ícone para gerar uma nova foto',
      labelName: 'Nome',
      labelAge: 'Idade',
      labelCity: 'Cidade',
      labelGCMember: 'Membro do GC',
      descGCMember: 'Participa de um Grupo de Crescimento?',
      btnRequestAdmin: 'Solicitar Acesso de Moderador',
      statusPending: 'Solicitação de Moderador Pendente',
      btnSave: 'Salvar Alterações'
    },
    newsList: {
      title: 'Últimas Atualizações',
      empty: 'Nenhuma notícia ainda.'
    },
    moderator: {
      title: 'Painel Administrativo',
      tabAccess: 'Moderação',
      tabPrayers: 'Orações',
      tabStats: 'Estatísticas',
      sectionPromote: 'Solicitações de Promoção',
      sectionNew: 'Novos Cadastros',
      emptyNew: 'Nenhum novo cadastro pendente.',
      emptyPrayers: 'Caixa de oração vazia.',
      totalUsers: 'Total Usuários',
      totalLogins: 'Total Logins',
      tableUser: 'Usuário',
      tableRole: 'Role',
      tableLogins: 'Logins',
      btnApproveAdmin: 'Tornar Admin',
      btnKeep: 'Manter Atual'
    }
  },
  jp: {
    app: {
      title: 'カイロス',
      subtitle: 'カレンダー',
      prayerButton: 'お祈りリクエスト',
      profile: {
        viewer: '閲覧者',
        editor: '編集者',
        admin: '管理者'
      },
      logout: 'ログアウト'
    },
    login: {
      headerSub: 'カレンダー',
      tabViewer: '閲覧者 (電話)',
      tabAdmin: 'メンバー / 管理者',
      viewerTitle: 'クイックアクセス',
      viewerDesc: 'カレンダーを表示するには携帯電話番号を入力してください。',
      adminTitle: 'メンバーエリア',
      adminDesc: '管理者および編集者専用のログインです。',
      labelPhone: '携帯電話番号',
      labelEmail: 'メールアドレス',
      btnAccess: 'カレンダーへ',
      btnContinue: '次へ',
      footerViewer: '閲覧モードはパスワードや事前承認が不要です。',
      footerAdmin: '新しいメールアドレスは自動的に承認待ちになります。'
    },
    calendar: {
      weekDays: ['日', '月', '火', '水', '木', '金', '土'],
      emptyDay: '予定はありません。',
      details: '詳細',
      aiSuggest: 'AI提案',
      loading: '生成中...'
    },
    eventModal: {
      addTitle: '新しいイベントを追加',
      fieldTitle: 'タイトル',
      fieldDesc: 'メッセージ',
      placeholderTitle: '例：定例会議...',
      placeholderDesc: '詳細を入力してください...',
      enhanceAI: 'AIで改善',
      enhancing: '改善中...',
      urgentHelp: '重要としてマークされたイベントは強調表示されます。',
      btnClose: '閉じる',
      btnPublish: '公開する',
      types: {
        notice: 'お知らせ',
        news: 'イベント',
        urgent: '重要'
      }
    },
    prayerModal: {
      title: 'お祈りリクエスト',
      placeholder: 'お祈りの内容をここに記入してください...',
      labelRequest: 'リクエスト内容',
      verse: '「何も思い煩わないで、あらゆる場合に、感謝をもってささげる祈りと願いによって、あなたがたの願い事を神に知っていただきなさい。」(ピリピ 4:6)',
      modeAnon: '匿名モード',
      modeName: '名前を表示',
      descAnon: 'リストにあなたの名前は表示されません。',
      descName: '送信者：',
      contactTitle: '連絡してもよろしいですか？',
      contactDesc: '返信やサポートを受け取りたい場合。',
      formContact: '連絡方法',
      labelEmail: 'メールアドレス',
      labelPhone: '電話番号',
      btnSend: '送信する'
    },
    profileModal: {
      title: 'プロフィール',
      changePhoto: 'アイコンをタップして新しい写真を生成',
      labelName: '名前',
      labelAge: '年齢',
      labelCity: '都市',
      labelGCMember: 'GCメンバー',
      descGCMember: '成長グループに参加していますか？',
      btnRequestAdmin: '管理者権限をリクエスト',
      statusPending: '管理者承認待ち',
      btnSave: '変更を保存'
    },
    newsList: {
      title: '最新の更新',
      empty: 'ニュースはまだありません。'
    },
    moderator: {
      title: '管理パネル',
      tabAccess: '承認管理',
      tabPrayers: 'お祈り',
      tabStats: '統計',
      sectionPromote: '昇格リクエスト',
      sectionNew: '新規登録',
      emptyNew: '保留中の登録はありません。',
      emptyPrayers: 'リクエストはありません。',
      totalUsers: '総ユーザー数',
      totalLogins: '総ログイン数',
      tableUser: 'ユーザー',
      tableRole: '権限',
      tableLogins: 'ログイン回数',
      btnApproveAdmin: '管理者にする',
      btnKeep: '現状維持'
    }
  },
  en: {
    app: {
      title: 'Kairós',
      subtitle: 'Calendar',
      prayerButton: 'Prayer Request',
      profile: {
        viewer: 'Viewer',
        editor: 'Editor',
        admin: 'Admin'
      },
      logout: 'Logout'
    },
    login: {
      headerSub: 'Calendar',
      tabViewer: 'Viewer',
      tabAdmin: 'Member / Admin',
      viewerTitle: 'Quick Access',
      viewerDesc: 'Enter your phone number to view the calendar.',
      adminTitle: 'Restricted Area',
      adminDesc: 'Login for moderators and editors only.',
      labelPhone: 'Phone Number',
      labelEmail: 'Corporate Email',
      btnAccess: 'Access Calendar',
      btnContinue: 'Continue',
      footerViewer: 'Viewer mode does not require password or prior approval.',
      footerAdmin: 'New emails will automatically enter the approval queue.'
    },
    calendar: {
      weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      emptyDay: 'No events scheduled for this day.',
      details: 'Day Details',
      aiSuggest: 'AI Suggest',
      loading: 'Generating...'
    },
    eventModal: {
      addTitle: 'Add New Event',
      fieldTitle: 'Title',
      fieldDesc: 'Message',
      placeholderTitle: 'Ex: General Meeting...',
      placeholderDesc: 'Write the details...',
      enhanceAI: 'Enhance with AI',
      enhancing: 'Enhancing...',
      urgentHelp: 'Events marked as important will be highlighted.',
      btnClose: 'Close',
      btnPublish: 'Publish',
      types: {
        notice: 'Notices',
        news: 'Events',
        urgent: 'Important'
      }
    },
    prayerModal: {
      title: 'Prayer Request',
      placeholder: 'Describe your prayer request here...',
      labelRequest: 'Your Request',
      verse: '"Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God." (Philippians 4:6)',
      modeAnon: 'Anonymous Mode',
      modeName: 'Show my name',
      descAnon: 'Your name will not appear on the list.',
      descName: 'Sent as',
      contactTitle: 'Can we contact you?',
      contactDesc: 'Would you like to receive a response or support.',
      formContact: 'Contact Method',
      labelEmail: 'Email Address',
      labelPhone: 'Phone Number',
      btnSend: 'Send Request'
    },
    profileModal: {
      title: 'My Profile',
      changePhoto: 'Tap icon to generate new photo',
      labelName: 'Name',
      labelAge: 'Age',
      labelCity: 'City',
      labelGCMember: 'GC Member',
      descGCMember: 'Part of a Growth Group?',
      btnRequestAdmin: 'Request Moderator Access',
      statusPending: 'Moderator Request Pending',
      btnSave: 'Save Changes'
    },
    newsList: {
      title: 'Latest Updates',
      empty: 'No news yet.'
    },
    moderator: {
      title: 'Admin Panel',
      tabAccess: 'Moderation',
      tabPrayers: 'Prayers',
      tabStats: 'Stats',
      sectionPromote: 'Promotion Requests',
      sectionNew: 'New Registrations',
      emptyNew: 'No pending registrations.',
      emptyPrayers: 'Prayer box empty.',
      totalUsers: 'Total Users',
      totalLogins: 'Total Logins',
      tableUser: 'User',
      tableRole: 'Role',
      tableLogins: 'Logins',
      btnApproveAdmin: 'Make Admin',
      btnKeep: 'Keep Current'
    }
  },
  es: {
    app: {
      title: 'Kairós',
      subtitle: 'Calendario',
      prayerButton: 'Pedido de Oración',
      profile: {
        viewer: 'Visualizador',
        editor: 'Editor',
        admin: 'Admin'
      },
      logout: 'Salir'
    },
    login: {
      headerSub: 'Calendario',
      tabViewer: 'Visualizador',
      tabAdmin: 'Miembro / Admin',
      viewerTitle: 'Acceso Rápido',
      viewerDesc: 'Ingrese su celular para ver el calendario.',
      adminTitle: 'Área Restringida',
      adminDesc: 'Login exclusivo para moderadores y editores.',
      labelPhone: 'Celular',
      labelEmail: 'E-mail Corporativo',
      btnAccess: 'Acceder al Calendario',
      btnContinue: 'Continuar',
      footerViewer: 'El modo visualizador no requiere contraseña ni aprobación.',
      footerAdmin: 'Nuevos correos entrarán automáticamente en cola de aprobación.'
    },
    calendar: {
      weekDays: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
      emptyDay: 'Ningún evento programado para este día.',
      details: 'Detalles del Día',
      aiSuggest: 'Sugerencias IA',
      loading: 'Generando...'
    },
    eventModal: {
      addTitle: 'Añadir Nuevo Evento',
      fieldTitle: 'Título',
      fieldDesc: 'Mensaje',
      placeholderTitle: 'Ej: Reunión General...',
      placeholderDesc: 'Escriba los detalles...',
      enhanceAI: 'Mejorar con IA',
      enhancing: 'Mejorando...',
      urgentHelp: 'Eventos marcados como importantes serán destacados.',
      btnClose: 'Cerrar',
      btnPublish: 'Publicar',
      types: {
        notice: 'Avisos',
        news: 'Eventos',
        urgent: 'Importante'
      }
    },
    prayerModal: {
      title: 'Pedido de Oración',
      placeholder: 'Describa su pedido de oración aquí...',
      labelRequest: 'Su Pedido',
      verse: '"Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias." (Filipenses 4:6)',
      modeAnon: 'Modo Anónimo',
      modeName: 'Mostrar mi nombre',
      descAnon: 'Su nombre no aparecerá en la lista.',
      descName: 'Enviado como',
      contactTitle: '¿Podemos contactarlo?',
      contactDesc: 'Le gustaría recibir una respuesta o apoyo.',
      formContact: 'Forma de Contacto',
      labelEmail: 'Dirección de E-mail',
      labelPhone: 'Número de Teléfono',
      btnSend: 'Enviar Pedido'
    },
    profileModal: {
      title: 'Mi Perfil',
      changePhoto: 'Toque el icono para generar nueva foto',
      labelName: 'Nombre',
      labelAge: 'Edad',
      labelCity: 'Ciudad',
      labelGCMember: 'Miembro de GC',
      descGCMember: '¿Participa de un Grupo de Crecimiento?',
      btnRequestAdmin: 'Solicitar Acceso de Moderador',
      statusPending: 'Solicitud de Moderador Pendiente',
      btnSave: 'Guardar Cambios'
    },
    newsList: {
      title: 'Últimas Actualizaciones',
      empty: 'Ninguna noticia aún.'
    },
    moderator: {
      title: 'Panel Administrativo',
      tabAccess: 'Moderación',
      tabPrayers: 'Oraciones',
      tabStats: 'Estadísticas',
      sectionPromote: 'Solicitudes de Promoción',
      sectionNew: 'Nuevos Registros',
      emptyNew: 'Ningún nuevo registro pendiente.',
      emptyPrayers: 'Caja de oración vacía.',
      totalUsers: 'Total Usuarios',
      totalLogins: 'Total Logins',
      tableUser: 'Usuario',
      tableRole: 'Rol',
      tableLogins: 'Logins',
      btnApproveAdmin: 'Hacer Admin',
      btnKeep: 'Mantener Actual'
    }
  }
};