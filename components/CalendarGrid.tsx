
import React from 'react';
import { format, endOfMonth, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import startOfMonth from 'date-fns/startOfMonth';
import startOfWeek from 'date-fns/startOfWeek';
import { CalendarEvent, User, UserRole } from '../types';
import { EVENT_COLORS } from '../constants';
import { Plus, Eye } from 'lucide-react';
import Avatar from './Avatar';

interface CalendarGridProps {
  currentDate: Date;
  events: CalendarEvent[];
  users: User[];
  onDateClick: (date: Date) => void;
  userRole: UserRole;
  t: (key: string) => string;
  locale: any;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ currentDate, events, users, onDateClick, userRole, t, locale }) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  
  // Force start on Sunday (0)
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const weekDayLabels = t('calendar.weekDays') as unknown as string[];
  
  const weekDays = [
    { label: weekDayLabels[0], color: 'bg-red-900/80 text-white border-red-800' },
    { label: weekDayLabels[1], color: 'bg-yellow-600/80 text-white border-yellow-600' },
    { label: weekDayLabels[2], color: 'bg-teal-700/80 text-white border-teal-700' },
    { label: weekDayLabels[3], color: 'bg-blue-700/80 text-white border-blue-700' },
    { label: weekDayLabels[4], color: 'bg-orange-700/80 text-white border-orange-700' },
    { label: weekDayLabels[5], color: 'bg-lime-700/80 text-white border-lime-700' },
    { label: weekDayLabels[6], color: 'bg-purple-800/80 text-white border-purple-800' },
  ];

  const getEventsForDay = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const getUserById = (id: string) => users.find(u => u.id === id);

  const canEdit = userRole === 'admin' || userRole === 'editor';

  return (
    <div className="bg-transparent rounded-none overflow-hidden h-full flex flex-col">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7">
        {weekDays.map((day) => (
          <div key={day.label} className={`${day.color} py-2 text-center text-sm font-bold shadow-sm border-b`}>
            {day.label}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 auto-rows-fr bg-gray-700 gap-[1px] flex-1 p-[1px] border border-gray-700">
        {days.map((day, dayIdx) => {
          const dayEvents = getEventsForDay(day);
          const isCurrentMonthDay = isSameMonth(day, monthStart);
          const isTodayDay = isToday(day);

          return (
            <div
              key={day.toString()}
              onClick={() => onDateClick(day)}
              className={`min-h-[100px] relative group transition-colors flex flex-col shadow-sm cursor-pointer hover:bg-gray-750 hover:ring-1 hover:ring-gray-500 hover:z-10
                ${isCurrentMonthDay ? 'bg-gray-800' : 'bg-gray-900/50'}
              `}
            >
              {/* Date Number */}
              <div className="p-2 flex justify-end">
                 <span className={`text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full
                   ${isTodayDay ? 'bg-red-600 text-white' : 'text-gray-400'}
                 `}>
                  {format(day, 'd')}
                </span>
              </div>

              {/* Events List */}
              <div className="flex-1 px-1 pb-1 space-y-1 overflow-y-auto overflow-x-hidden">
                {dayEvents.map((event) => {
                  const author = getUserById(event.authorId);
                  return (
                    <div 
                      key={event.id}
                      className={`text-[10px] p-1 rounded border flex items-center gap-1 ${EVENT_COLORS[event.type]} opacity-90 hover:opacity-100`}
                    >
                      {author && (
                        <div className="flex-shrink-0">
                          <Avatar src={author.avatarUrl} alt={author.name} size="sm" className="w-4 h-4 border-none" />
                        </div>
                      )}
                      <span className="truncate font-medium">{event.title}</span>
                    </div>
                  );
                })}
              </div>

               {/* Hover Indicator */}
               {canEdit ? (
                 <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-gray-700 p-1 rounded-full text-gray-300 hover:bg-gray-600">
                       <Plus size={14} />
                    </div>
                 </div>
               ) : (
                 <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-gray-700/50 p-1 rounded-full text-gray-400">
                       <Eye size={12} />
                    </div>
                 </div>
               )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
