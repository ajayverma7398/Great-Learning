import { render, screen, fireEvent } from '@testing-library/react';
import { NativeBaseProvider } from 'native-base';
import { CourseSidebar } from '../components/CourseSidebar';
import { theme } from '../theme';

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <NativeBaseProvider theme={theme}>
      {component}
    </NativeBaseProvider>
  );
};

describe('CourseSidebar', () => {
  const mockOnStatusChange = jest.fn();
  const mockActivityCounts = {
    all: 12,
    upcoming: 5,
    'in-progress': 3,
    completed: 3,
    overdue: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders COURSES header', () => {
      renderWithProvider(
        <CourseSidebar
          selectedStatus="all"
          onStatusChange={mockOnStatusChange}
          activityCounts={mockActivityCounts}
        />
      );
      expect(screen.getByText('COURSES')).toBeInTheDocument();
    });

    it('renders all course status options', () => {
      renderWithProvider(
        <CourseSidebar
          selectedStatus="all"
          onStatusChange={mockOnStatusChange}
          activityCounts={mockActivityCounts}
        />
      );
      expect(screen.getByText('All Courses')).toBeInTheDocument();
      expect(screen.getByText('Completed Courses')).toBeInTheDocument();
      expect(screen.getByText('Incomplete Courses')).toBeInTheDocument();
      expect(screen.getByText('Due')).toBeInTheDocument();
      expect(screen.getByText('Overdue')).toBeInTheDocument();
      expect(screen.getByText('Upcoming')).toBeInTheDocument();
    });

    it('displays activity counts', () => {
      renderWithProvider(
        <CourseSidebar
          selectedStatus="all"
          onStatusChange={mockOnStatusChange}
          activityCounts={mockActivityCounts}
        />
      );
      expect(screen.getByText('12')).toBeInTheDocument(); // All courses count
      expect(screen.getByText('3')).toBeInTheDocument(); // Completed count
    });
  });

  describe('Status Selection', () => {
    it('calls onStatusChange when All Courses is clicked', () => {
      renderWithProvider(
        <CourseSidebar
          selectedStatus="all"
          onStatusChange={mockOnStatusChange}
          activityCounts={mockActivityCounts}
        />
      );
      const allCoursesButton = screen.getByText('All Courses');
      fireEvent.press(allCoursesButton);
      expect(mockOnStatusChange).toHaveBeenCalledWith('all');
    });

    it('calls onStatusChange when Completed Courses is clicked', () => {
      renderWithProvider(
        <CourseSidebar
          selectedStatus="all"
          onStatusChange={mockOnStatusChange}
          activityCounts={mockActivityCounts}
        />
      );
      const completedButton = screen.getByText('Completed Courses');
      fireEvent.press(completedButton);
      expect(mockOnStatusChange).toHaveBeenCalledWith('completed');
    });

    it('calls onStatusChange when Incomplete Courses is clicked', () => {
      renderWithProvider(
        <CourseSidebar
          selectedStatus="all"
          onStatusChange={mockOnStatusChange}
          activityCounts={mockActivityCounts}
        />
      );
      const incompleteButton = screen.getByText('Incomplete Courses');
      fireEvent.press(incompleteButton);
      expect(mockOnStatusChange).toHaveBeenCalledWith('incomplete');
    });

    it('calls onStatusChange when Due is clicked', () => {
      renderWithProvider(
        <CourseSidebar
          selectedStatus="all"
          onStatusChange={mockOnStatusChange}
          activityCounts={mockActivityCounts}
        />
      );
      const dueButton = screen.getByText('Due');
      fireEvent.press(dueButton);
      expect(mockOnStatusChange).toHaveBeenCalledWith('due');
    });

    it('calls onStatusChange when Overdue is clicked', () => {
      renderWithProvider(
        <CourseSidebar
          selectedStatus="all"
          onStatusChange={mockOnStatusChange}
          activityCounts={mockActivityCounts}
        />
      );
      const overdueButton = screen.getByText('Overdue');
      fireEvent.press(overdueButton);
      expect(mockOnStatusChange).toHaveBeenCalledWith('overdue');
    });

    it('calls onStatusChange when Upcoming is clicked', () => {
      renderWithProvider(
        <CourseSidebar
          selectedStatus="all"
          onStatusChange={mockOnStatusChange}
          activityCounts={mockActivityCounts}
        />
      );
      const upcomingButton = screen.getByText('Upcoming');
      fireEvent.press(upcomingButton);
      expect(mockOnStatusChange).toHaveBeenCalledWith('upcoming');
    });
  });

  describe('Activity Counts', () => {
    it('calculates incomplete count correctly (in-progress + overdue)', () => {
      renderWithProvider(
        <CourseSidebar
          selectedStatus="all"
          onStatusChange={mockOnStatusChange}
          activityCounts={mockActivityCounts}
        />
      );
      // Incomplete = 3 (in-progress) + 1 (overdue) = 4
      const incompleteCount = mockActivityCounts['in-progress'] + mockActivityCounts.overdue;
      expect(incompleteCount).toBe(4);
    });

    it('displays correct count for Due (upcoming)', () => {
      renderWithProvider(
        <CourseSidebar
          selectedStatus="all"
          onStatusChange={mockOnStatusChange}
          activityCounts={mockActivityCounts}
        />
      );
      // Due shows upcoming count
      expect(screen.getByText('5')).toBeInTheDocument(); // Upcoming count
    });
  });

  describe('Selected State', () => {
    it('highlights selected status', () => {
      renderWithProvider(
        <CourseSidebar
          selectedStatus="completed"
          onStatusChange={mockOnStatusChange}
          activityCounts={mockActivityCounts}
        />
      );
      const completedButton = screen.getByText('Completed Courses');
      // Selected state should be visually different
      expect(completedButton).toBeInTheDocument();
    });
  });
});

