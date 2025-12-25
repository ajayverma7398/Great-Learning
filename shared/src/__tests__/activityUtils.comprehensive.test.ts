import {
  getActivityTypeLabel,
  getActivityStatusLabel,
  getActivityStatusColor,
  getActionButtonLabel,
  formatDate,
  formatTime,
  formatDuration,
  filterActivities,
  sortActivities,
} from '../utils/activityUtils';
import { Activity, ActivityType, ActivityStatus, ActivityFilters } from '../types/activity';

describe('activityUtils - Comprehensive Tests', () => {
  describe('getActivityTypeLabel', () => {
    it('returns correct labels for all activity types', () => {
      expect(getActivityTypeLabel('online-class')).toBe('Online Class');
      expect(getActivityTypeLabel('assignment')).toBe('Assignment');
      expect(getActivityTypeLabel('quiz')).toBe('Quiz');
      expect(getActivityTypeLabel('discussion')).toBe('Discussion');
    });
  });

  describe('getActivityStatusLabel', () => {
    it('returns correct labels for all statuses', () => {
      expect(getActivityStatusLabel('upcoming')).toBe('Upcoming');
      expect(getActivityStatusLabel('in-progress')).toBe('In Progress');
      expect(getActivityStatusLabel('completed')).toBe('Completed');
      expect(getActivityStatusLabel('overdue')).toBe('Overdue');
    });
  });

  describe('getActivityStatusColor', () => {
    it('returns correct colors for all statuses', () => {
      expect(getActivityStatusColor('upcoming')).toBe('blue');
      expect(getActivityStatusColor('in-progress')).toBe('orange');
      expect(getActivityStatusColor('completed')).toBe('green');
      expect(getActivityStatusColor('overdue')).toBe('red');
    });
  });

  describe('getActionButtonLabel', () => {
    it('returns "Start" for upcoming non-live activities', () => {
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

    it('returns "Join Now" for upcoming live online classes', () => {
      const activity: Activity = {
        id: '1',
        title: 'Test',
        type: 'online-class',
        courseName: 'Test',
        programName: 'Test',
        scheduledDate: '2024-01-15',
        status: 'upcoming',
        isLive: true,
      };
      expect(getActionButtonLabel(activity)).toBe('Join Now');
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

    it('returns "Start" for overdue activities', () => {
      const activity: Activity = {
        id: '1',
        title: 'Test',
        type: 'assignment',
        courseName: 'Test',
        programName: 'Test',
        scheduledDate: '2024-01-15',
        status: 'overdue',
      };
      expect(getActionButtonLabel(activity)).toBe('Start');
    });
  });

  describe('formatDate', () => {
    it('formats date correctly with weekday, month, day, year', () => {
      const formatted = formatDate('2024-01-15');
      expect(formatted).toMatch(/Jan/);
      expect(formatted).toMatch(/15/);
      expect(formatted).toMatch(/2024/);
    });

    it('handles different dates correctly', () => {
      const formatted = formatDate('2024-12-25');
      expect(formatted).toMatch(/Dec/);
      expect(formatted).toMatch(/25/);
    });
  });

  describe('formatTime', () => {
    it('converts 24-hour to 12-hour format - AM', () => {
      expect(formatTime('09:15')).toBe('9:15 AM');
      expect(formatTime('00:30')).toBe('12:30 AM');
      expect(formatTime('11:59')).toBe('11:59 AM');
    });

    it('converts 24-hour to 12-hour format - PM', () => {
      expect(formatTime('14:30')).toBe('2:30 PM');
      expect(formatTime('12:00')).toBe('12:00 PM');
      expect(formatTime('23:45')).toBe('11:45 PM');
    });

    it('returns empty string for undefined time', () => {
      expect(formatTime(undefined)).toBe('');
    });
  });

  describe('formatDuration', () => {
    it('formats minutes less than 60', () => {
      expect(formatDuration(30)).toBe('30 min');
      expect(formatDuration(45)).toBe('45 min');
      expect(formatDuration(0)).toBe('0 min');
    });

    it('formats hours with minutes', () => {
      expect(formatDuration(90)).toBe('1h 30m');
      expect(formatDuration(150)).toBe('2h 30m');
    });

    it('formats hours without minutes', () => {
      expect(formatDuration(60)).toBe('1h');
      expect(formatDuration(120)).toBe('2h');
      expect(formatDuration(180)).toBe('3h');
    });

    it('returns empty string for undefined duration', () => {
      expect(formatDuration(undefined)).toBe('');
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
      {
        id: '3',
        title: 'Quiz',
        type: 'quiz',
        courseName: 'Course 1',
        programName: 'Program 1',
        scheduledDate: '2024-01-17',
        status: 'completed',
      },
      {
        id: '4',
        title: 'Discussion',
        type: 'discussion',
        courseName: 'Course 3',
        programName: 'Program 3',
        scheduledDate: '2024-01-18',
        status: 'overdue',
      },
    ];

    it('returns all activities when no filters applied', () => {
      const filtered = filterActivities(activities, {});
      expect(filtered).toHaveLength(4);
    });

    it('filters by type - online-class', () => {
      const filtered = filterActivities(activities, { type: 'online-class' });
      expect(filtered).toHaveLength(1);
      expect(filtered[0].type).toBe('online-class');
    });

    it('filters by type - assignment', () => {
      const filtered = filterActivities(activities, { type: 'assignment' });
      expect(filtered).toHaveLength(1);
      expect(filtered[0].type).toBe('assignment');
    });

    it('filters by type - quiz', () => {
      const filtered = filterActivities(activities, { type: 'quiz' });
      expect(filtered).toHaveLength(1);
      expect(filtered[0].type).toBe('quiz');
    });

    it('filters by type - discussion', () => {
      const filtered = filterActivities(activities, { type: 'discussion' });
      expect(filtered).toHaveLength(1);
      expect(filtered[0].type).toBe('discussion');
    });

    it('returns all when type is "all"', () => {
      const filtered = filterActivities(activities, { type: 'all' });
      expect(filtered).toHaveLength(4);
    });

    it('filters by status - upcoming', () => {
      const filtered = filterActivities(activities, { status: 'upcoming' });
      expect(filtered).toHaveLength(1);
      expect(filtered[0].status).toBe('upcoming');
    });

    it('filters by status - in-progress', () => {
      const filtered = filterActivities(activities, { status: 'in-progress' });
      expect(filtered).toHaveLength(1);
      expect(filtered[0].status).toBe('in-progress');
    });

    it('filters by status - completed', () => {
      const filtered = filterActivities(activities, { status: 'completed' });
      expect(filtered).toHaveLength(1);
      expect(filtered[0].status).toBe('completed');
    });

    it('filters by status - overdue', () => {
      const filtered = filterActivities(activities, { status: 'overdue' });
      expect(filtered).toHaveLength(1);
      expect(filtered[0].status).toBe('overdue');
    });

    it('filters by incomplete status (in-progress + overdue)', () => {
      const filtered = filterActivities(activities, { status: 'incomplete' as any });
      expect(filtered).toHaveLength(2);
      expect(filtered.some(a => a.status === 'in-progress')).toBe(true);
      expect(filtered.some(a => a.status === 'overdue')).toBe(true);
    });

    it('filters by search query - title match', () => {
      const filtered = filterActivities(activities, { searchQuery: 'Online' });
      expect(filtered).toHaveLength(1);
      expect(filtered[0].title).toBe('Online Class');
    });

    it('filters by search query - course name match', () => {
      const filtered = filterActivities(activities, { searchQuery: 'Course 1' });
      expect(filtered).toHaveLength(2);
    });

    it('filters by search query - program name match', () => {
      const filtered = filterActivities(activities, { searchQuery: 'Program 1' });
      expect(filtered).toHaveLength(2);
    });

    it('filters by search query - case insensitive', () => {
      const filtered = filterActivities(activities, { searchQuery: 'online' });
      expect(filtered).toHaveLength(1);
    });

    it('filters by date range - start date', () => {
      const filtered = filterActivities(activities, {
        dateRange: { start: '2024-01-16' },
      });
      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach(activity => {
        expect(new Date(activity.scheduledDate).getTime()).toBeGreaterThanOrEqual(
          new Date('2024-01-16').getTime()
        );
      });
    });

    it('filters by date range - end date', () => {
      const filtered = filterActivities(activities, {
        dateRange: { end: '2024-01-16' },
      });
      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach(activity => {
        expect(new Date(activity.scheduledDate).getTime()).toBeLessThanOrEqual(
          new Date('2024-01-16').getTime()
        );
      });
    });

    it('filters by date range - start and end', () => {
      const filtered = filterActivities(activities, {
        dateRange: { start: '2024-01-16', end: '2024-01-17' },
      });
      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach(activity => {
        const date = new Date(activity.scheduledDate).getTime();
        expect(date).toBeGreaterThanOrEqual(new Date('2024-01-16').getTime());
        expect(date).toBeLessThanOrEqual(new Date('2024-01-17').getTime());
      });
    });

    it('combines multiple filters', () => {
      const filtered = filterActivities(activities, {
        type: 'online-class',
        status: 'upcoming',
        searchQuery: 'Online',
      });
      expect(filtered).toHaveLength(1);
      expect(filtered[0].type).toBe('online-class');
      expect(filtered[0].status).toBe('upcoming');
    });
  });

  describe('sortActivities', () => {
    const activities: Activity[] = [
      {
        id: '1',
        title: 'Zebra Activity',
        type: 'assignment',
        courseName: 'Course 1',
        programName: 'Program 1',
        scheduledDate: '2024-01-20',
        status: 'upcoming',
      },
      {
        id: '2',
        title: 'Alpha Activity',
        type: 'assignment',
        courseName: 'Course 1',
        programName: 'Program 1',
        scheduledDate: '2024-01-15',
        status: 'upcoming',
      },
      {
        id: '3',
        title: 'Beta Activity',
        type: 'assignment',
        courseName: 'Course 1',
        programName: 'Program 1',
        scheduledDate: '2024-01-18',
        status: 'upcoming',
      },
    ];

    it('sorts by date ascending', () => {
      const sorted = sortActivities(activities, 'date-asc');
      expect(sorted[0].scheduledDate).toBe('2024-01-15');
      expect(sorted[1].scheduledDate).toBe('2024-01-18');
      expect(sorted[2].scheduledDate).toBe('2024-01-20');
    });

    it('sorts by date descending', () => {
      const sorted = sortActivities(activities, 'date-desc');
      expect(sorted[0].scheduledDate).toBe('2024-01-20');
      expect(sorted[1].scheduledDate).toBe('2024-01-18');
      expect(sorted[2].scheduledDate).toBe('2024-01-15');
    });

    it('sorts by title ascending', () => {
      const sorted = sortActivities(activities, 'title-asc');
      expect(sorted[0].title).toBe('Alpha Activity');
      expect(sorted[1].title).toBe('Beta Activity');
      expect(sorted[2].title).toBe('Zebra Activity');
    });

    it('sorts by title descending', () => {
      const sorted = sortActivities(activities, 'title-desc');
      expect(sorted[0].title).toBe('Zebra Activity');
      expect(sorted[1].title).toBe('Beta Activity');
      expect(sorted[2].title).toBe('Alpha Activity');
    });

    it('does not mutate original array', () => {
      const original = [...activities];
      sortActivities(activities, 'date-asc');
      expect(activities).toEqual(original);
    });
  });
});

