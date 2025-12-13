
import { User } from './types';

// Deterministic random images for "Fixed Images as Names" concept
export const USERS: User[] = [
  {
    id: 'u1',
    name: 'Pr. Mukai',
    email: 'pr.mukai@gmail.com',
    phone: '090-1111-2222',
    role: 'admin',
    status: 'approved',
    avatarUrl: 'https://picsum.photos/id/64/100/100',
    isGCMember: true,
    city: 'São Paulo',
    age: '45',
    loginCount: 120
  },
  {
    id: 'u2',
    name: 'RH',
    email: 'rh@kairos.com',
    phone: '090-2222-3333',
    role: 'editor',
    status: 'approved',
    avatarUrl: 'https://picsum.photos/id/65/100/100',
    isGCMember: true,
    city: 'Curitiba',
    age: '30',
    loginCount: 45
  },
  {
    id: 'u3',
    name: 'TI Support',
    email: 'ti@kairos.com',
    phone: '090-3333-4444',
    role: 'editor',
    status: 'approved',
    avatarUrl: 'https://picsum.photos/id/91/100/100',
    isGCMember: false,
    city: 'Remoto',
    age: '28',
    loginCount: 88
  },
  {
    id: 'u4',
    name: 'Estagiário',
    email: 'visitor@kairos.com',
    phone: '090-1234-5678',
    role: 'viewer',
    status: 'approved',
    avatarUrl: 'https://picsum.photos/id/101/100/100',
    isGCMember: false,
    city: 'Campinas',
    age: '20',
    loginCount: 12
  },
  {
    id: 'u5',
    name: 'Diretoria',
    email: 'boss@kairos.com',
    phone: '090-5555-6666',
    role: 'editor',
    status: 'approved',
    avatarUrl: 'https://picsum.photos/id/177/100/100',
    isGCMember: true,
    city: 'Brasília',
    age: '50',
    loginCount: 200
  },
  // Simulação de Pedido de Moderador
  {
    id: 'u_sim_1',
    name: 'Irmão Lucas (Teste)',
    email: 'lucas.teste@kairos.com',
    phone: '090-9999-0000',
    role: 'editor', // Atualmente é editor
    status: 'approved',
    avatarUrl: 'https://picsum.photos/id/338/100/100',
    isGCMember: true,
    city: 'Toyohashi',
    age: '32',
    loginCount: 15,
    requestedRole: 'admin' // SOLICITAÇÃO PENDENTE AQUI
  }
];

// Dark Mode Optimized Colors (Lighter text on darker, translucent backgrounds)
export const EVENT_COLORS = {
  notice: 'bg-blue-900/40 text-blue-200 border-blue-800',
  news: 'bg-green-900/40 text-green-200 border-green-800',
  reflection: 'bg-purple-900/40 text-purple-200 border-purple-800',
};

export const EVENT_LABELS = {
  notice: 'Avisos',
  news: 'Eventos',
  reflection: 'Reflexão',
};
