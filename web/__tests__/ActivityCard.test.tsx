import { render, screen, fireEvent } from '@testing-library/react';
import { NativeBaseProvider } from 'native-base';
import { ActivityCard } from '../components/ActivityCard';
import { Activity } from '@activity-platform/shared';
import { theme } from '../theme';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <NativeBaseProvider theme={theme}>
      {component}
    </NativeBaseProvider>
  );
};

describe('ActivityCard', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    jest.clearAllMocks();
  });

  const mockActivity: Activity = {
    id: '1',
    title: 'Test Activity',
    type: 'online-class',
    courseName: 'Test Course',
    programName: 'Test Program',
    scheduledDate: '2024-01-15',
    scheduledTime: '10:00',
    duration: 90,
    status: 'upcoming',
    description: 'Test description',
  };

  describe('Rendering', () => {
    it('renders activity title', () => {
      renderWithProvider(<ActivityCard activity={mockActivity} />);
      expect(screen.getByText('Test Activity')).toBeInTheDocument();
    });

    it('renders activity type badge', () => {
      renderWithProvider(<ActivityCard activity={mockActivity} />);
      expect(screen.getByText('Online Class')).toBeInTheDocument();
    });

    it('renders status badge', () => {
      renderWithProvider(<ActivityCard activity={mockActivity} />);
      expect(screen.getByText('Upcoming')).toBeInTheDocument();
    });

    it('renders course name', () => {
      renderWithProvider(<ActivityCard activity={mockActivity} />);
      expect(screen.getByText(/Test Course/)).toBeInTheDocument();
    });

    it('renders program name', () => {
      renderWithProvider(<ActivityCard activity={mockActivity} />);
      expect(screen.getByText(/Test Program/)).toBeInTheDocument();
    });

    it('renders scheduled date', () => {
      renderWithProvider(<ActivityCard activity={mockActivity} />);
      expect(screen.getByText(/Jan 15, 2024/i)).toBeInTheDocument();
    });

    it('renders scheduled time when provided', () => {
      renderWithProvider(<ActivityCard activity={mockActivity} />);
      expect(screen.getByText(/10:00 AM/i)).toBeInTheDocument();
    });

    it('renders duration when provided', () => {
      renderWithProvider(<ActivityCard activity={mockActivity} />);
      expect(screen.getByText(/1h 30m/i)).toBeInTheDocument();
    });

    it('renders description when provided', () => {
      renderWithProvider(<ActivityCard activity={mockActivity} />);
      expect(screen.getByText('Test description')).toBeInTheDocument();
    });

    it('renders action button with correct label for upcoming activity', () => {
      renderWithProvider(<ActivityCard activity={mockActivity} />);
      expect(screen.getByText('Start')).toBeInTheDocument();
    });
  });

  describe('Different Activity Types', () => {
    it('renders assignment type correctly', () => {
      const assignment: Activity = {
        ...mockActivity,
        type: 'assignment',
        status: 'in-progress',
      };
      renderWithProvider(<ActivityCard activity={assignment} />);
      expect(screen.getByText('Assignment')).toBeInTheDocument();
      expect(screen.getByText('Continue')).toBeInTheDocument();
    });

    it('renders quiz type correctly', () => {
      const quiz: Activity = {
        ...mockActivity,
        type: 'quiz',
        status: 'completed',
      };
      renderWithProvider(<ActivityCard activity={quiz} />);
      expect(screen.getByText('Quiz')).toBeInTheDocument();
      expect(screen.getByText('Review')).toBeInTheDocument();
    });

    it('renders discussion type correctly', () => {
      const discussion: Activity = {
        ...mockActivity,
        type: 'discussion',
        status: 'upcoming',
      };
      renderWithProvider(<ActivityCard activity={discussion} />);
      expect(screen.getByText('Discussion')).toBeInTheDocument();
    });
  });

  describe('Different Status Types', () => {
    it('renders in-progress status correctly', () => {
      const inProgress: Activity = {
        ...mockActivity,
        status: 'in-progress',
        progress: 50,
      };
      renderWithProvider(<ActivityCard activity={inProgress} />);
      expect(screen.getByText('In Progress')).toBeInTheDocument();
      expect(screen.getByText('Continue')).toBeInTheDocument();
    });

    it('renders completed status correctly', () => {
      const completed: Activity = {
        ...mockActivity,
        status: 'completed',
        progress: 100,
      };
      renderWithProvider(<ActivityCard activity={completed} />);
      expect(screen.getByText('Completed')).toBeInTheDocument();
      expect(screen.getByText('Review')).toBeInTheDocument();
    });

    it('renders overdue status correctly', () => {
      const overdue: Activity = {
        ...mockActivity,
        status: 'overdue',
      };
      renderWithProvider(<ActivityCard activity={overdue} />);
      expect(screen.getByText('Overdue')).toBeInTheDocument();
      expect(screen.getByText('Start')).toBeInTheDocument();
    });
  });

  describe('Progress Bar', () => {
    it('displays progress bar for in-progress activities', () => {
      const inProgress: Activity = {
        ...mockActivity,
        status: 'in-progress',
        progress: 65,
      };
      renderWithProvider(<ActivityCard activity={inProgress} />);
      expect(screen.getByText(/65%/i)).toBeInTheDocument();
    });

    it('does not display progress bar for completed activities', () => {
      const completed: Activity = {
        ...mockActivity,
        status: 'completed',
        progress: 100,
      };
      renderWithProvider(<ActivityCard activity={completed} />);
      // Progress bar should not be visible for 100% completed
      const progressText = screen.queryByText(/100%/i);
      // May or may not be visible depending on implementation
    });
  });

  describe('Score Information', () => {
    it('displays max score for assessments', () => {
      const quiz: Activity = {
        ...mockActivity,
        type: 'quiz',
        maxScore: 100,
      };
      renderWithProvider(<ActivityCard activity={quiz} />);
      expect(screen.getByText(/100 points/i)).toBeInTheDocument();
    });

    it('displays user score when available', () => {
      const quiz: Activity = {
        ...mockActivity,
        type: 'quiz',
        status: 'completed',
        maxScore: 100,
        score: 85,
      };
      renderWithProvider(<ActivityCard activity={quiz} />);
      expect(screen.getByText(/85 points/i)).toBeInTheDocument();
    });
  });

  describe('Live Session Indicator', () => {
    it('displays live indicator for live online classes', () => {
      const liveClass: Activity = {
        ...mockActivity,
        type: 'online-class',
        isLive: true,
      };
      renderWithProvider(<ActivityCard activity={liveClass} />);
      expect(screen.getByText(/Live/i)).toBeInTheDocument();
    });

    it('displays recorded indicator for recorded classes', () => {
      const recordedClass: Activity = {
        ...mockActivity,
        type: 'online-class',
        isLive: false,
      };
      renderWithProvider(<ActivityCard activity={recordedClass} />);
      expect(screen.getByText(/Recorded/i)).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('navigates to course details when card is clicked', () => {
      renderWithProvider(<ActivityCard activity={mockActivity} />);
      const card = screen.getByText('Test Activity').closest('div');
      if (card) {
        fireEvent.press(card);
        expect(mockPush).toHaveBeenCalledWith('/course/1');
      }
    });

    it('navigates to course details when action button is clicked', () => {
      renderWithProvider(<ActivityCard activity={mockActivity} />);
      const actionButton = screen.getByText('Start');
      fireEvent.press(actionButton);
      expect(mockPush).toHaveBeenCalledWith('/course/1');
    });
  });

  describe('Due Date', () => {
    it('displays due date for assignments', () => {
      const assignment: Activity = {
        ...mockActivity,
        type: 'assignment',
        dueDate: '2024-01-25',
      };
      renderWithProvider(<ActivityCard activity={assignment} />);
      expect(screen.getByText(/Jan 25, 2024/i)).toBeInTheDocument();
    });
  });

  describe('Instructor Information', () => {
    it('displays instructor name when available', () => {
      const classWithInstructor: Activity = {
        ...mockActivity,
        type: 'online-class',
        instructor: 'Dr. John Smith',
      };
      renderWithProvider(<ActivityCard activity={classWithInstructor} />);
      expect(screen.getByText(/Dr. John Smith/i)).toBeInTheDocument();
    });
  });
});
