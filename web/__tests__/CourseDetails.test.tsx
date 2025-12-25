import { render, screen, fireEvent } from '@testing-library/react';
import { NativeBaseProvider } from 'native-base';
import { CourseDetails } from '../components/CourseDetails';
import { Activity } from '@activity-platform/shared';
import { theme } from '../theme';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockBack = jest.fn();
const mockPush = jest.fn();

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <NativeBaseProvider theme={theme}>
      {component}
    </NativeBaseProvider>
  );
};

describe('CourseDetails', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
      push: mockPush,
    });
    jest.clearAllMocks();
    window.open = jest.fn();
  });

  const mockActivity: Activity = {
    id: '1',
    title: 'Introduction to Machine Learning',
    type: 'online-class',
    courseName: 'Machine Learning Fundamentals',
    programName: 'AI & Machine Learning',
    scheduledDate: '2024-01-15',
    scheduledTime: '10:00',
    duration: 90,
    status: 'upcoming',
    description: 'Learn the basics of machine learning algorithms and applications.',
    instructor: 'Dr. Sarah Johnson',
    isLive: false,
  };

  describe('Rendering', () => {
    it('renders course title', () => {
      renderWithProvider(<CourseDetails activity={mockActivity} />);
      expect(screen.getByText('Introduction to Machine Learning')).toBeInTheDocument();
    });

    it('renders course type badge', () => {
      renderWithProvider(<CourseDetails activity={mockActivity} />);
      expect(screen.getByText('Online Class')).toBeInTheDocument();
    });

    it('renders status badge', () => {
      renderWithProvider(<CourseDetails activity={mockActivity} />);
      expect(screen.getByText('Upcoming')).toBeInTheDocument();
    });

    it('renders course name', () => {
      renderWithProvider(<CourseDetails activity={mockActivity} />);
      expect(screen.getByText(/Machine Learning Fundamentals/i)).toBeInTheDocument();
    });

    it('renders program name', () => {
      renderWithProvider(<CourseDetails activity={mockActivity} />);
      expect(screen.getByText(/AI & Machine Learning/i)).toBeInTheDocument();
    });

    it('renders scheduled date', () => {
      renderWithProvider(<CourseDetails activity={mockActivity} />);
      expect(screen.getByText(/Jan 15, 2024/i)).toBeInTheDocument();
    });

    it('renders scheduled time', () => {
      renderWithProvider(<CourseDetails activity={mockActivity} />);
      expect(screen.getByText(/10:00 AM/i)).toBeInTheDocument();
    });

    it('renders duration', () => {
      renderWithProvider(<CourseDetails activity={mockActivity} />);
      expect(screen.getByText(/1h 30m/i)).toBeInTheDocument();
    });

    it('renders description', () => {
      renderWithProvider(<CourseDetails activity={mockActivity} />);
      expect(screen.getByText(/Learn the basics of machine learning/i)).toBeInTheDocument();
    });

    it('renders instructor name', () => {
      renderWithProvider(<CourseDetails activity={mockActivity} />);
      expect(screen.getByText(/Dr. Sarah Johnson/i)).toBeInTheDocument();
    });
  });

  describe('Back Navigation', () => {
    it('renders back button', () => {
      renderWithProvider(<CourseDetails activity={mockActivity} />);
      expect(screen.getByLabelText(/Go back/i)).toBeInTheDocument();
    });

    it('navigates back when back button is clicked', () => {
      renderWithProvider(<CourseDetails activity={mockActivity} />);
      const backButton = screen.getByLabelText(/Go back/i);
      fireEvent.press(backButton);
      expect(mockBack).toHaveBeenCalled();
    });

    it('renders back button in action section', () => {
      renderWithProvider(<CourseDetails activity={mockActivity} />);
      expect(screen.getByText('Back')).toBeInTheDocument();
    });

    it('navigates back when back button in actions is clicked', () => {
      renderWithProvider(<CourseDetails activity={mockActivity} />);
      const backButton = screen.getByText('Back');
      fireEvent.press(backButton);
      expect(mockBack).toHaveBeenCalled();
    });
  });

  describe('Action Buttons', () => {
    it('displays Start button for upcoming activities', () => {
      renderWithProvider(<CourseDetails activity={mockActivity} />);
      expect(screen.getByText('Start')).toBeInTheDocument();
    });

    it('displays Continue button for in-progress activities', () => {
      const inProgress: Activity = {
        ...mockActivity,
        status: 'in-progress',
        progress: 50,
      };
      renderWithProvider(<CourseDetails activity={inProgress} />);
      expect(screen.getByText('Continue')).toBeInTheDocument();
    });

    it('displays Review button for completed activities', () => {
      const completed: Activity = {
        ...mockActivity,
        status: 'completed',
        progress: 100,
      };
      renderWithProvider(<CourseDetails activity={completed} />);
      expect(screen.getByText('Review')).toBeInTheDocument();
    });

    it('displays Join Now for live upcoming classes', () => {
      const liveClass: Activity = {
        ...mockActivity,
        type: 'online-class',
        isLive: true,
        meetingLink: 'https://meet.example.com',
      };
      renderWithProvider(<CourseDetails activity={liveClass} />);
      expect(screen.getByText('Join Now')).toBeInTheDocument();
    });
  });

  describe('Live Session Actions', () => {
    it('opens meeting link for live classes', () => {
      const liveClass: Activity = {
        ...mockActivity,
        type: 'online-class',
        status: 'upcoming',
        isLive: true,
        meetingLink: 'https://meet.example.com/class',
      };
      renderWithProvider(<CourseDetails activity={liveClass} />);
      const joinButton = screen.getByText('Join Now');
      fireEvent.press(joinButton);
      expect(window.open).toHaveBeenCalledWith('https://meet.example.com/class', '_blank');
    });

    it('opens recording URL for completed recorded classes', () => {
      const recordedClass: Activity = {
        ...mockActivity,
        type: 'online-class',
        status: 'completed',
        isLive: false,
        recordingUrl: 'https://example.com/recording',
      };
      renderWithProvider(<CourseDetails activity={recordedClass} />);
      const reviewButton = screen.getByText('Review');
      fireEvent.press(reviewButton);
      expect(window.open).toHaveBeenCalledWith('https://example.com/recording', '_blank');
    });
  });

  describe('Progress Display', () => {
    it('displays progress bar for in-progress activities', () => {
      const inProgress: Activity = {
        ...mockActivity,
        status: 'in-progress',
        progress: 65,
      };
      renderWithProvider(<CourseDetails activity={inProgress} />);
      expect(screen.getByText(/65%/i)).toBeInTheDocument();
    });

    it('does not display progress for completed activities', () => {
      const completed: Activity = {
        ...mockActivity,
        status: 'completed',
        progress: 100,
      };
      renderWithProvider(<CourseDetails activity={completed} />);
      // Progress section should not be visible for 100% completed
    });
  });

  describe('Score Information', () => {
    it('displays max score for assessments', () => {
      const quiz: Activity = {
        ...mockActivity,
        type: 'quiz',
        maxScore: 100,
      };
      renderWithProvider(<CourseDetails activity={quiz} />);
      expect(screen.getByText(/100 points/i)).toBeInTheDocument();
    });

    it('displays user score and percentage', () => {
      const quiz: Activity = {
        ...mockActivity,
        type: 'quiz',
        status: 'completed',
        maxScore: 100,
        score: 85,
      };
      renderWithProvider(<CourseDetails activity={quiz} />);
      expect(screen.getByText(/85 points/i)).toBeInTheDocument();
      expect(screen.getByText(/85%/i)).toBeInTheDocument();
    });
  });

  describe('Due Date', () => {
    it('displays due date when available', () => {
      const assignment: Activity = {
        ...mockActivity,
        type: 'assignment',
        dueDate: '2024-01-25',
      };
      renderWithProvider(<CourseDetails activity={assignment} />);
      expect(screen.getByText(/Jan 25, 2024/i)).toBeInTheDocument();
    });
  });

  describe('Live/Recorded Indicator', () => {
    it('displays live session badge', () => {
      const liveClass: Activity = {
        ...mockActivity,
        type: 'online-class',
        isLive: true,
      };
      renderWithProvider(<CourseDetails activity={liveClass} />);
      expect(screen.getByText(/Live Session/i)).toBeInTheDocument();
    });

    it('displays recorded session badge', () => {
      const recordedClass: Activity = {
        ...mockActivity,
        type: 'online-class',
        isLive: false,
      };
      renderWithProvider(<CourseDetails activity={recordedClass} />);
      expect(screen.getByText(/Recorded Session/i)).toBeInTheDocument();
    });
  });
});

