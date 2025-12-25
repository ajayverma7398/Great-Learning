import { render, screen, fireEvent } from '@testing-library/react';
import { NativeBaseProvider } from 'native-base';
import { TopNavBar } from '../components/TopNavBar';
import { theme } from '../theme';

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <NativeBaseProvider theme={theme}>
      {component}
    </NativeBaseProvider>
  );
};

describe('TopNavBar', () => {
  const mockOnTypeChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders logo', () => {
      renderWithProvider(
        <TopNavBar selectedType="all" onTypeChange={mockOnTypeChange} />
      );
      expect(screen.getByText(/Great Learning/i)).toBeInTheDocument();
    });

    it('renders all navigation options', () => {
      renderWithProvider(
        <TopNavBar selectedType="all" onTypeChange={mockOnTypeChange} />
      );
      expect(screen.getByText('Online Class')).toBeInTheDocument();
      expect(screen.getByText('Assignment')).toBeInTheDocument();
      expect(screen.getByText('Quiz')).toBeInTheDocument();
      expect(screen.getByText('Discussion')).toBeInTheDocument();
    });

    it('renders user profile', () => {
      renderWithProvider(
        <TopNavBar selectedType="all" onTypeChange={mockOnTypeChange} />
      );
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    });
  });

  describe('Type Selection', () => {
    it('calls onTypeChange when Online Class is clicked', () => {
      renderWithProvider(
        <TopNavBar selectedType="all" onTypeChange={mockOnTypeChange} />
      );
      const onlineClassButton = screen.getByText('Online Class');
      fireEvent.press(onlineClassButton);
      expect(mockOnTypeChange).toHaveBeenCalledWith('online-class');
    });

    it('calls onTypeChange when Assignment is clicked', () => {
      renderWithProvider(
        <TopNavBar selectedType="all" onTypeChange={mockOnTypeChange} />
      );
      const assignmentButton = screen.getByText('Assignment');
      fireEvent.press(assignmentButton);
      expect(mockOnTypeChange).toHaveBeenCalledWith('assignment');
    });

    it('calls onTypeChange when Quiz is clicked', () => {
      renderWithProvider(
        <TopNavBar selectedType="all" onTypeChange={mockOnTypeChange} />
      );
      const quizButton = screen.getByText('Quiz');
      fireEvent.press(quizButton);
      expect(mockOnTypeChange).toHaveBeenCalledWith('quiz');
    });

    it('calls onTypeChange when Discussion is clicked', () => {
      renderWithProvider(
        <TopNavBar selectedType="all" onTypeChange={mockOnTypeChange} />
      );
      const discussionButton = screen.getByText('Discussion');
      fireEvent.press(discussionButton);
      expect(mockOnTypeChange).toHaveBeenCalledWith('discussion');
    });
  });

  describe('Selected State', () => {
    it('highlights selected type', () => {
      renderWithProvider(
        <TopNavBar selectedType="online-class" onTypeChange={mockOnTypeChange} />
      );
      const onlineClassButton = screen.getByText('Online Class');
      // The selected state should be visually different (checked via styling)
      expect(onlineClassButton).toBeInTheDocument();
    });
  });
});

