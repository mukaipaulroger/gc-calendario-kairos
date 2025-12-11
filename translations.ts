
import { Language } from './types';

export const TRANSLATIONS: Record<Language, any> = {
  pt: {
    app: {
      title: 'Kairós',
      subtitle: 'Calendário',
      prayerButton: 'Pedido de Oração',
      prayerButtonMobile: 'Oração',
      profile: {
        viewer: 'Visualizador',
        editor: 'Editor',
        admin: 'Admin'
      },
      logout: 'Sair'
    },
    contactBox: {
      title: 'Nossos Contatos',
      labelEmail: 'E-mail',
      labelPhone: 'Telefone',
      labelInsta: 'Instagram',
      labelAddress: 'Endereço',
      defaultAddress: 'Rua das Flores, 123 - São Paulo',
      btnEdit: 'Editar',
      btnSave: 'Salvar',
      btnCancel: 'Cancelar'
    },
    login: {
      headerSub: 'Calendário',
      tabViewer: 'Visualizador',
      tabAdmin: 'Administrativo',
      viewerTitle: 'Acesso Rápido',
      viewerDesc: 'Digite seu celular para visualizar o calendário.',
      adminTitle: 'Área Restrita',
      adminDesc: 'Login exclusivo para moderadores e editores.',
      registerTitle: 'Solicitar Cadastro',
      registerDesc: 'Preencha seus dados para solicitar acesso administrativo.',
      labelPhone: 'Celular',
      labelEmail: 'E-mail Corporativo',
      labelName: 'Nome Completo',
      labelContactPhone: 'Celular para Contato',
      btnAccess: 'Acessar Calendário',
      btnContinue: 'Continuar',
      btnRequest: 'Solicitar Acesso',
      footerViewer: 'O modo visualizador não requer senha ou aprovação prévia.',
      footerAdmin: 'Novos e-mails entrarão automaticamente na fila de aprovação.',
      placeholders: {
        phone: '090-1234-5678',
        email: 'seu.nome@empresa.com',
        name: 'Nome Completo',
        registerPhone: 'Seu Celular'
      }
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
      placeholderTitle: 'Ex: Pensamento do dia...',
      placeholderDesc: 'Escreva os detalhes...',
      enhanceAI: 'Melhorar com IA',
      enhancing: 'Melhorando...',
      reflectionHelp: 'Mensagens de encorajamento ou versículos.',
      btnClose: 'Fechar',
      btnPublish: 'Publicar',
      types: {
        notice: 'Avisos',
        news: 'Eventos',
        reflection: 'Reflexão'
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
      btnSend: 'Enviar Pedido',
      placeholders: {
        email: 'seu@email.com',
        phone: 'Ex: 090-1234-5678'
      }
    },
    profileModal: {
      title: 'Meu Perfil',
      changePhoto: 'Toque no ícone para gerar uma nova foto',
      labelName: 'Nome',
      labelEmail: 'E-mail',
      labelAge: 'Idade',
      labelCity: 'Cidade',
      labelGCMember: 'Membro do GC',
      descGCMember: 'Participa de um Grupo de Crescimento?',
      btnRequestAdmin: 'Solicitar Acesso de Moderador',
      statusPending: 'Solicitação de Moderador Pendiente',
      btnSave: 'Salvar Alterações',
      placeholders: {
        email: 'exemplo@email.com'
      }
    },
    newsList: {
      title: 'Últimas Atualizações',
      empty: 'Nenhuma notícia ainda.'
    },
    moderator: {
      title: 'Painel Administrativo',
      tabAccess: 'Moderation',
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
    },
    dailyVerse: {
      title: 'Versículo do Dia',
      loading: 'Buscando inspiração...'
    }
  },
  jp: {
    app: {
      title: 'カイロス',
      subtitle: 'カレンダー',
      prayerButton: 'お祈りリクエスト',
      prayerButtonMobile: '祈り',
      profile: {
        viewer: '閲覧者',
        editor: '編集者',
        admin: '管理者'
      },
      logout: 'ログアウト'
    },
    contactBox: {
      title: 'お問い合わせ',
      labelEmail: 'Eメール',
      labelPhone: '電話番号',
      labelInsta: 'Instagram',
      labelAddress: '住所',
      defaultAddress: '東京都港区...',
      btnEdit: '編集',
      btnSave: '保存',
      btnCancel: 'キャンセル'
    },
    login: {
      headerSub: 'カレンダー',
      tabViewer: '閲覧者 (電話)',
      tabAdmin: '管理者エリア',
      viewerTitle: 'クイックアクセス',
      viewerDesc: 'カレンダーを表示するには携帯電話番号を入力してください。',
      adminTitle: 'メンバーエリア',
      adminDesc: '管理者および編集者専用のログインです。',
      registerTitle: '登録リクエスト',
      registerDesc: '管理者アクセスをリクエストするには詳細を入力してください。',
      labelPhone: '携帯電話番号',
      labelEmail: 'メールアドレス',
      labelName: '氏名',
      labelContactPhone: '連絡先電話番号',
      btnAccess: 'カレンダーへ',
      btnContinue: '次へ',
      btnRequest: 'アクセスをリクエスト',
      footerViewer: '閲覧モードはパスワードや事前承認が不要です。',
      footerAdmin: '新しいメールアドレスは自動的に承認待ちになります。',
      placeholders: {
        phone: '090-1234-5678',
        email: 'name@company.com',
        name: '氏名',
        registerPhone: '携帯電話番号'
      }
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
      placeholderTitle: '例：今日の思い...',
      placeholderDesc: '詳細を入力してください...',
      enhanceAI: 'AIで改善',
      enhancing: '改善中...',
      reflectionHelp: '励ましのメッセージや聖句など。',
      btnClose: '閉じる',
      btnPublish: '公開する',
      types: {
        notice: 'お知らせ',
        news: 'イベント',
        reflection: '黙想'
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
      btnSend: '送信する',
      placeholders: {
        email: 'example@email.com',
        phone: '例: 090-1234-5678'
      }
    },
    profileModal: {
      title: 'プロフィール',
      changePhoto: 'アイコンをタップして新しい写真を生成',
      labelName: '名前',
      labelEmail: 'Eメール',
      labelAge: '年齢',
      labelCity: '都市',
      labelGCMember: 'GCメンバー',
      descGCMember: '成長グループに参加していますか？',
      btnRequestAdmin: '管理者権限をリクエスト',
      statusPending: '管理者承認待ち',
      btnSave: '変更を保存',
      placeholders: {
        email: 'example@email.com'
      }
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
    },
    dailyVerse: {
      title: '今日の聖句',
      loading: '聖句を準備中...'
    }
  },
  en: {
    app: {
      title: 'Kairós',
      subtitle: 'Calendar',
      prayerButton: 'Prayer Request',
      prayerButtonMobile: 'Pray',
      profile: {
        viewer: 'Viewer',
        editor: 'Editor',
        admin: 'Admin'
      },
      logout: 'Logout'
    },
    contactBox: {
      title: 'Contact Us',
      labelEmail: 'Email',
      labelPhone: 'Phone',
      labelInsta: 'Instagram',
      labelAddress: 'Address',
      defaultAddress: 'Main Street, 123 - City',
      btnEdit: 'Edit',
      btnSave: 'Save',
      btnCancel: 'Cancel'
    },
    login: {
      headerSub: 'Calendar',
      tabViewer: 'Viewer',
      tabAdmin: 'Admin Area',
      viewerTitle: 'Quick Access',
      viewerDesc: 'Enter your phone number to view the calendar.',
      adminTitle: 'Restricted Area',
      adminDesc: 'Login for moderators and editors only.',
      registerTitle: 'Registration Request',
      registerDesc: 'Fill in your details to request admin access.',
      labelPhone: 'Phone Number',
      labelEmail: 'Corporate Email',
      labelName: 'Full Name',
      labelContactPhone: 'Contact Phone',
      btnAccess: 'Access Calendar',
      btnContinue: 'Continue',
      btnRequest: 'Request Access',
      footerViewer: 'Viewer mode does not require password or prior approval.',
      footerAdmin: 'New emails will automatically enter the approval queue.',
      placeholders: {
        phone: '090-1234-5678',
        email: 'name@company.com',
        name: 'Full Name',
        registerPhone: 'Your Phone'
      }
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
      placeholderTitle: 'Ex: Thought of the day...',
      placeholderDesc: 'Write the details...',
      enhanceAI: 'Enhance with AI',
      enhancing: 'Enhancing...',
      reflectionHelp: 'Messages of encouragement or verses.',
      btnClose: 'Close',
      btnPublish: 'Publish',
      types: {
        notice: 'Notices',
        news: 'Events',
        reflection: 'Reflection'
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
      btnSend: 'Send Request',
      placeholders: {
        email: 'example@email.com',
        phone: 'Ex: 090-1234-5678'
      }
    },
    profileModal: {
      title: 'My Profile',
      changePhoto: 'Tap icon to generate new photo',
      labelName: 'Name',
      labelEmail: 'E-mail',
      labelAge: 'Age',
      labelCity: 'City',
      labelGCMember: 'GC Member',
      descGCMember: 'Part of a Growth Group?',
      btnRequestAdmin: 'Request Moderator Access',
      statusPending: 'Moderator Request Pending',
      btnSave: 'Save Changes',
      placeholders: {
        email: 'example@email.com'
      }
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
    },
    dailyVerse: {
      title: 'Verse of the Day',
      loading: 'Finding inspiration...'
    }
  },
  es: {
    app: {
      title: 'Kairós',
      subtitle: 'Calendario',
      prayerButton: 'Pedido de Oración',
      prayerButtonMobile: 'Orar',
      profile: {
        viewer: 'Visualizador',
        editor: 'Editor',
        admin: 'Admin'
      },
      logout: 'Salir'
    },
    contactBox: {
      title: 'Nuestros Contactos',
      labelEmail: 'E-mail',
      labelPhone: 'Teléfono',
      labelInsta: 'Instagram',
      labelAddress: 'Dirección',
      defaultAddress: 'Calle Principal, 123 - Ciudad',
      btnEdit: 'Editar',
      btnSave: 'Guardar',
      btnCancel: 'Cancelar'
    },
    login: {
      headerSub: 'Calendario',
      tabViewer: 'Visualizador',
      tabAdmin: 'Administrativo',
      viewerTitle: 'Acceso Rápido',
      viewerDesc: 'Ingrese su celular para ver el calendario.',
      adminTitle: 'Área Restringida',
      adminDesc: 'Login exclusivo para moderadores y editores.',
      registerTitle: 'Solicitud de Registro',
      registerDesc: 'Complete sus datos para solicitar acceso administrativo.',
      labelPhone: 'Celular',
      labelEmail: 'E-mail Corporativo',
      labelName: 'Nombre Completo',
      labelContactPhone: 'Celular de Contacto',
      btnAccess: 'Acceder al Calendario',
      btnContinue: 'Continuar',
      btnRequest: 'Solicitar Acceso',
      footerViewer: 'El modo visualizador no requiere contraseña ni aprobación.',
      footerAdmin: 'Nuevos correos entrarán automáticamente en cola de aprobación.',
      placeholders: {
        phone: '090-1234-5678',
        email: 'nombre@empresa.com',
        name: 'Nombre Completo',
        registerPhone: 'Su Celular'
      }
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
      placeholderTitle: 'Ej: Pensamiento del día...',
      placeholderDesc: 'Escriba los detalles...',
      enhanceAI: 'Mejorar con IA',
      enhancing: 'Mejorando...',
      reflectionHelp: 'Mensajes de aliento o versículos.',
      btnClose: 'Cerrar',
      btnPublish: 'Publicar',
      types: {
        notice: 'Avisos',
        news: 'Eventos',
        reflection: 'Reflexión'
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
      btnSend: 'Enviar Pedido',
      placeholders: {
        email: 'su@email.com',
        phone: 'Ej: 090-1234-5678'
      }
    },
    profileModal: {
      title: 'Mi Perfil',
      changePhoto: 'Toque el icono para generar nueva foto',
      labelName: 'Nombre',
      labelEmail: 'E-mail',
      labelAge: 'Edad',
      labelCity: 'Ciudad',
      labelGCMember: 'Miembro de GC',
      descGCMember: '¿Participa de un Grupo de Crecimiento?',
      btnRequestAdmin: 'Solicitar Acceso de Moderador',
      statusPending: 'Solicitud de Moderador Pendiente',
      btnSave: 'Guardar Cambios',
      placeholders: {
        email: 'ejemplo@email.com'
      }
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
    },
    dailyVerse: {
      title: 'Versículo del Día',
      loading: 'Buscando inspiración...'
    }
  }
};
