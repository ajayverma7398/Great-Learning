import { render, screen } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';
import { ActivityCard } from '../components/ActivityCard';
import { Activity } from '@activity-platform/shared';
import { theme } from '../theme';

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

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <NativeBaseProvider theme={theme}>
      {component}
    </NativeBaseProvider>
  );
};

describe('ActivityCard', () => {
  it('renders activity title', () => {
    renderWithProvider(<ActivityCard activity={mockActivity} />);
    expect(screen.getByText('Test Activity')).toBeTruthy();
  });

  it('renders activity type', () => {
    renderWithProvider(<ActivityCard activity={mockActivity} />);
    expect(screen.getByText('Online Class')).toBeTruthy();
  });

  it('renders course name', () => {
    renderWithProvider(<ActivityCard activity={mockActivity} />);
    expect(screen.getByText(/Test Course/)).toBeTruthy();
  });
});

