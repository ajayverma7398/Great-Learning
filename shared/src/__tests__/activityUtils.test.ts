import {
  getActivityTypeLabel,
  getActivityStatusLabel,
  getActivityStatusColor,
  getActionButtonLabel,
  formatDate,
  formatTime,
  formatDuration,
  filterActivities,
} from '../utils/activityUtils';
import { Activity, ActivityType, ActivityStatus } from '../types/activity';

describe('activityUtils', () => {
  describe('getActivityTypeLabel', () => {
    it('returns correct label for online-class', () => {
      expect(getActivityTypeLabel('online-class')).toBe('Online Class');
    });

    it('returns correct label for assignment', () => {
      expect(getActivityTypeLabel('assignment')).toBe('Assignment');
    });

    it('returns correct label for quiz', () => {
      expect(getActivityTypeLabel('quiz')).toBe('Quiz');
    });

    it('returns correct label for discussion', () => {
      expect(getActivityTypeLabel('discussion')).toBe('Discussion');
    });
  });

  describe('getActivityStatusLabel', () => {
    it('returns correct label for each status', () => {
      expect(getActivityStatusLabel('upcoming')).toBe('Upcoming');
      expect(getActivityStatusLabel('in-progress')).toBe('In Progress');
      expect(getActivityStatusLabel('completed')).toBe('Completed');
      expect(getActivityStatusLabel('overdue')).toBe('Overdue');
    });
  });

  describe('getActivityStatusColor', () => {
    it('returns correct color for each status', () => {
      expect(getActivityStatusColor('upcoming')).toBe('blue');
      expect(getActivityStatusColor('in-progress')).toBe('orange');
      expect(getActivityStatusColor('completed')).toBe('green');
      expect(getActivityStatusColor('overdue')).toBe('red');
    });
  });

  describe('getActionButtonLabel', () => {
    it('returns "Start" for upcoming activities', () => {
      const activity: Activity = {
        id: '1',
        title: 'Test',
        type: 'assignment',
        courseName: 'Test',
        programName: 'Test',
        scheduledDate: '2024-01-15',
        status: 'upcoming',
      };
      expect(getActionButtonLabel(activity)).toBe('Start');
    });

    it('returns "Continue" for in-progress activities', () => {
      const activity: Activity = {
        id: '1',
        title: 'Test',
        type: 'assignment',
        courseName: 'Test',
        programName: 'Test',
        scheduledDate: '2024-01-15',
        status: 'in-progress',
      };
      expect(getActionButtonLabel(activity)).toBe('Continue');
    });

    it('returns "Review" for completed activities', () => {
      const activity: Activity = {
        id: '1',
        title: 'Test',
        type: 'assignment',
        courseName: 'Test',
        programName: 'Test',
        scheduledDate: '2024-01-15',
        status: 'completed',
      };
      expect(getActionButtonLabel(activity)).toBe('Review');
    });
  });

  describe('formatDate', () => {
    it('formats date correctly', () => {
      const formatted = formatDate('2024-01-15');
      expect(formatted).toContain('2024');
      expect(formatted).toContain('Jan');
    });
  });

  describe('formatTime', () => {
    it('formats 24-hour time to 12-hour format', () => {
      expect(formatTime('14:30')).toBe('2:30 PM');
      expect(formatTime('09:15')).toBe('9:15 AM');
    });
  });

  describe('formatDuration', () => {
    it('formats duration in minutes', () => {
      expect(formatDuration(30)).toBe('30 min');
      expect(formatDuration(90)).toBe('1h 30m');
      expect(formatDuration(120)).toBe('2h');
    });
  });

  describe('filterActivities', () => {
    const activities: Activity[] = [
      {
        id: '1',
        title: 'Online Class',
        type: 'online-class',
        courseName: 'Course 1',
        programName: 'Program 1',
        scheduledDate: '2024-01-15',
        status: 'upcoming',
      },
      {
        id: '2',
        title: 'Assignment',
        type: 'assignment',
        courseName: 'Course 2',
        programName: 'Program 2',
        scheduledDate: '2024-01-16',
        status: 'in-progress',
      },
    ];

    it('filters by type', () => {
      const filtered = filterActivities(activities, { type: 'online-class' });
      expect(filtered).toHaveLength(1);
      expect(filtered[0].type).toBe('online-class');
    });

    it('filters by status', () => {
      const filtered = filterActivities(activities, { status: 'in-progress' });
      expect(filtered).toHaveLength(1);
      expect(filtered[0].status).toBe('in-progress');
    });

    it('filters by search query', () => {
      const filtered = filterActivities(activities, { searchQuery: 'Online' });
      expect(filtered).toHaveLength(1);
      expect(filtered[0].title).toBe('Online Class');
    });
  });
});

