export type ActivityType = 'online-class' | 'assignment' | 'quiz' | 'discussion';

export type ActivityStatus = 'upcoming' | 'in-progress' | 'completed' | 'overdue';

export interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  courseName: string;
  programName: string;
  scheduledDate: string; // ISO date string
  scheduledTime?: string; // HH:mm format
  duration?: number; // in minutes
  status: ActivityStatus;
  progress?: number; // 0-100 for in-progress activities
  description?: string;
  instructor?: string;
  dueDate?: string; // ISO date string for assessments
  maxScore?: number; // for assessments
  score?: number; // for completed assessments
  isLive?: boolean; // for online classes
  recordingUrl?: string; // for recorded classes
  meetingLink?: string; // for live classes
}

export interface ActivityFilters {
  type?: ActivityType | 'all';
  status?: ActivityStatus | 'all';
  searchQuery?: string;
  dateRange?: {
    start?: string;
    end?: string;
  };
}

export type ActivitySortOption = 'date-asc' | 'date-desc' | 'title-asc' | 'title-desc';

