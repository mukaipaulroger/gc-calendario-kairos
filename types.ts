
export type EventType = 'notice' | 'news' | 'reflection';

export type UserRole = 'admin' | 'editor' | 'viewer';
export type UserStatus = 'approved' | 'pending' | 'blocked';
export type Language = 'pt' | 'en' | 'jp' | 'es';

export interface User {
  id: string;
  name: string; // Used for display
  email?: string; // Optional for phone-only users
  phone?: string; // Optional for email-only users
  avatarUrl: string;
  role: UserRole;
  status: UserStatus;
  
  // Profile Fields
  isGCMember?: boolean;
  age?: string;
  city?: string;
  
  // Authorization Requests
  requestedRole?: UserRole; // If the user requested to be promoted (e.g. to admin)
  
  // Analytics
  loginCount?: number;
}

export type ContactMethod = 'sms' | 'short_mail' | 'email';

export interface PrayerRequest {
  id: string;
  content: string;
  authorId: string;
  isAnonymous: boolean;
  createdAt: Date;
  
  // Contact Info
  contactAllowed?: boolean;
  contactMethod?: ContactMethod;
  contactInfo?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: EventType;
  authorId: string;
  createdAt: Date;
}

export interface DayData {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}
