import { Activity, ActivityFilters, ActivityType, ActivityStatus } from '../types/activity';

export const getActivityTypeLabel = (type: ActivityType): string => {
  const labels: Record<ActivityType, string> = {
    'online-class': 'Online Class',
    'assignment': 'Assignment',
    'quiz': 'Quiz',
    'discussion': 'Discussion',
  };
  return labels[type];
};

export const getActivityStatusLabel = (status: ActivityStatus): string => {
  const labels: Record<ActivityStatus, string> = {
    'upcoming': 'Upcoming',
    'in-progress': 'In Progress',
    'completed': 'Completed',
    'overdue': 'Overdue',
  };
  return labels[status];
};

export const getActivityStatusColor = (status: ActivityStatus): string => {
  const colors: Record<ActivityStatus, string> = {
    'upcoming': 'blue',
    'in-progress': 'orange',
    'completed': 'green',
    'overdue': 'red',
  };
  return colors[status];
};

export const getActionButtonLabel = (activity: Activity): string => {
  switch (activity.status) {
    case 'upcoming':
      return activity.type === 'online-class' && activity.isLive ? 'Join Now' : 'Start';
    case 'in-progress':
      return 'Continue';
    case 'completed':
      return 'Review';
    case 'overdue':
      return 'Start';
    default:
      return 'View';
  }
};

export const filterActivities = (
  activities: Activity[],
  filters: ActivityFilters
): Activity[] => {
  return activities.filter((activity) => {
    // Filter by type
    if (filters.type && filters.type !== 'all' && activity.type !== filters.type) {
      return false;
    }

    // Filter by status
    if (filters.status && filters.status !== 'all') {
      // Handle 'incomplete' status (in-progress + overdue)
      if (filters.status === 'incomplete' as any) {
        if (activity.status !== 'in-progress' && activity.status !== 'overdue') {
          return false;
        }
      } else if (activity.status !== filters.status) {
        return false;
      }
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesTitle = activity.title.toLowerCase().includes(query);
      const matchesCourse = activity.courseName.toLowerCase().includes(query);
      const matchesProgram = activity.programName.toLowerCase().includes(query);
      if (!matchesTitle && !matchesCourse && !matchesProgram) {
        return false;
      }
    }

    // Filter by date range
    if (filters.dateRange) {
      const activityDate = new Date(activity.scheduledDate);
      if (filters.dateRange.start) {
        const startDate = new Date(filters.dateRange.start);
        if (activityDate < startDate) return false;
      }
      if (filters.dateRange.end) {
        const endDate = new Date(filters.dateRange.end);
        if (activityDate > endDate) return false;
      }
    }

    return true;
  });
};

export const sortActivities = (
  activities: Activity[],
  sortOption: 'date-asc' | 'date-desc' | 'title-asc' | 'title-desc'
): Activity[] => {
  const sorted = [...activities];
  
  switch (sortOption) {
    case 'date-asc':
      return sorted.sort((a, b) => 
        new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime()
      );
    case 'date-desc':
      return sorted.sort((a, b) => 
        new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime()
      );
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'title-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return sorted;
  }
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (timeString?: string): string => {
  if (!timeString) return '';
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

export const formatDuration = (minutes?: number): string => {
  if (!minutes) return '';
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

