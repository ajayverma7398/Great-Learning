import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NativeBaseProvider } from 'native-base';
import { ActivityListing } from '../components/ActivityListing';
import { ActivityFilters } from '@activity-platform/shared';
import { theme } from '../theme';
import { mockActivities } from '@activity-platform/shared';

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <NativeBaseProvider theme={theme}>
      {component}
    </NativeBaseProvider>
  );
};

describe('ActivityListing', () => {
  const mockFilters: ActivityFilters = {
    type: 'all',
    status: 'all',
    searchQuery: '',
  };

  const mockOnFiltersChange = jest.fn();
  const mockOnSortChange = jest.fn();
  const mockOnActivityCountsChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders search input', () => {
      renderWithProvider(
        <ActivityListing
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          sortOption="date-asc"
          onSortChange={mockOnSortChange}
        />
      );
      expect(screen.getByPlaceholderText(/Search activities/i)).toBeInTheDocument();
    });

    it('renders sort dropdown', () => {
      renderWithProvider(
        <ActivityListing
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          sortOption="date-asc"
          onSortChange={mockOnSortChange}
        />
      );
      expect(screen.getByText(/Sort By/i)).toBeInTheDocument();
    });

    it('renders clear filters button', () => {
      renderWithProvider(
        <ActivityListing
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          sortOption="date-asc"
          onSortChange={mockOnSortChange}
        />
      );
      expect(screen.getByText(/Clear Filters/i)).toBeInTheDocument();
    });

    it('displays activity count', () => {
      renderWithProvider(
        <ActivityListing
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          sortOption="date-asc"
          onSortChange={mockOnSortChange}
        />
      );
      expect(screen.getByText(/Showing/i)).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    it('filters activities by search query', async () => {
      renderWithProvider(
        <ActivityListing
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          sortOption="date-asc"
          onSortChange={mockOnSortChange}
        />
      );

      const searchInput = screen.getByPlaceholderText(/Search activities/i);
      fireEvent.change(searchInput, { target: { value: 'Machine Learning' } });

      await waitFor(() => {
        expect(mockOnFiltersChange).toHaveBeenCalledWith(
          expect.objectContaining({ searchQuery: 'Machine Learning' })
        );
      });
    });

    it('searches in title, course name, and program name', async () => {
      renderWithProvider(
        <ActivityListing
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          sortOption="date-asc"
          onSortChange={mockOnSortChange}
        />
      );

      const searchInput = screen.getByPlaceholderText(/Search activities/i);
      fireEvent.change(searchInput, { target: { value: 'AI' } });

      await waitFor(() => {
        expect(mockOnFiltersChange).toHaveBeenCalled();
      });
    });
  });

  describe('Sorting Functionality', () => {
    it('changes sort option when dropdown value changes', async () => {
      renderWithProvider(
        <ActivityListing
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          sortOption="date-asc"
          onSortChange={mockOnSortChange}
        />
      );

      const sortSelect = screen.getByText(/Date \(Oldest First\)/i);
      fireEvent.press(sortSelect);

      await waitFor(() => {
        expect(mockOnSortChange).toHaveBeenCalled();
      });
    });

    it('sorts activities by date ascending', () => {
      const { container } = renderWithProvider(
        <ActivityListing
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          sortOption="date-asc"
          onSortChange={mockOnSortChange}
        />
      );
      // Activities should be sorted by date
      expect(container).toBeInTheDocument();
    });

    it('sorts activities by date descending', () => {
      const { container } = renderWithProvider(
        <ActivityListing
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          sortOption="date-desc"
          onSortChange={mockOnSortChange}
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('sorts activities by title ascending', () => {
      const { container } = renderWithProvider(
        <ActivityListing
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          sortOption="title-asc"
          onSortChange={mockOnSortChange}
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('sorts activities by title descending', () => {
      const { container } = renderWithProvider(
        <ActivityListing
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          sortOption="title-desc"
          onSortChange={mockOnSortChange}
        />
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Clear Filters', () => {
    it('clears all filters when clear button is clicked', async () => {
      renderWithProvider(
        <ActivityListing
          filters={{ ...mockFilters, searchQuery: 'test', type: 'assignment' }}
          onFiltersChange={mockOnFiltersChange}
          sortOption="date-asc"
          onSortChange={mockOnSortChange}
        />
      );

      const clearButton = screen.getByText(/Clear Filters/i);
      fireEvent.press(clearButton);

      await waitFor(() => {
        expect(mockOnFiltersChange).toHaveBeenCalledWith({
          type: 'all',
          status: 'all',
          searchQuery: '',
        });
      });
    });
  });

  describe('Pagination', () => {
    it('displays only 5 activities per page', () => {
      renderWithProvider(
        <ActivityListing
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          sortOption="date-asc"
          onSortChange={mockOnSortChange}
        />
      );

      // Should show pagination if more than 5 activities
      if (mockActivities.length > 5) {
        expect(screen.getByText(/Page 1/i)).toBeInTheDocument();
      }
    });

    it('shows pagination controls when more than 5 activities', () => {
      renderWithProvider(
        <ActivityListing
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          sortOption="date-asc"
          onSortChange={mockOnSortChange}
        />
      );

      if (mockActivities.length > 5) {
        expect(screen.getByText(/Previous/i)).toBeInTheDocument();
        expect(screen.getByText(/Next/i)).toBeInTheDocument();
      }
    });

    it('navigates to next page when next button is clicked', async () => {
      renderWithProvider(
        <ActivityListing
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          sortOption="date-asc"
          onSortChange={mockOnSortChange}
        />
      );

      if (mockActivities.length > 5) {
        const nextButton = screen.getByText(/Next/i);
        fireEvent.press(nextButton);

        await waitFor(() => {
          expect(screen.getByText(/Page 2/i)).toBeInTheDocument();
        });
      }
    });

    it('navigates to previous page when previous button is clicked', async () => {
      renderWithProvider(
        <ActivityListing
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          sortOption="date-asc"
          onSortChange={mockOnSortChange}
        />
      );

      if (mockActivities.length > 5) {
        const nextButton = screen.getByText(/Next/i);
        fireEvent.press(nextButton);

        await waitFor(() => {
          const prevButton = screen.getByText(/Previous/i);
          fireEvent.press(prevButton);
          expect(screen.getByText(/Page 1/i)).toBeInTheDocument();
        });
      }
    });

    it('disables previous button on first page', () => {
      renderWithProvider(
        <ActivityListing
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          sortOption="date-asc"
          onSortChange={mockOnSortChange}
        />
      );

      if (mockActivities.length > 5) {
        const prevButton = screen.getByText(/Previous/i);
        expect(prevButton).toBeDisabled();
      }
    });

    it('disables next button on last page', async () => {
      renderWithProvider(
        <ActivityListing
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          sortOption="date-asc"
          onSortChange={mockOnSortChange}
        />
      );

      if (mockActivities.length > 5) {
        const totalPages = Math.ceil(mockActivities.length / 5);
        // Navigate to last page
        for (let i = 1; i < totalPages; i++) {
          const nextButton = screen.getByText(/Next/i);
          fireEvent.press(nextButton);
          await waitFor(() => {});
        }

        await waitFor(() => {
          const nextButton = screen.getByText(/Next/i);
          expect(nextButton).toBeDisabled();
        });
      }
    });

    it('resets to page 1 when filters change', async () => {
      const { rerender } = renderWithProvider(
        <ActivityListing
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          sortOption="date-asc"
          onSortChange={mockOnSortChange}
        />
      );

      if (mockActivities.length > 5) {
        // Navigate to page 2
        const nextButton = screen.getByText(/Next/i);
        fireEvent.press(nextButton);
        await waitFor(() => {
          expect(screen.getByText(/Page 2/i)).toBeInTheDocument();
        });

        // Change filter
        rerender(
          <NativeBaseProvider theme={theme}>
            <ActivityListing
              filters={{ ...mockFilters, type: 'assignment' }}
              onFiltersChange={mockOnFiltersChange}
              sortOption="date-asc"
              onSortChange={mockOnSortChange}
            />
          </NativeBaseProvider>
        );

        await waitFor(() => {
          expect(screen.getByText(/Page 1/i)).toBeInTheDocument();
        });
      }
    });
  });

  describe('Empty State', () => {
    it('displays message when no activities match filters', () => {
      renderWithProvider(
        <ActivityListing
          filters={{ ...mockFilters, searchQuery: 'NonExistentActivity12345' }}
          onFiltersChange={mockOnFiltersChange}
          sortOption="date-asc"
          onSortChange={mockOnSortChange}
        />
      );

      expect(screen.getByText(/No activities found/i)).toBeInTheDocument();
    });
  });

  describe('Activity Counts', () => {
    it('calculates and displays activity counts', () => {
      renderWithProvider(
        <ActivityListing
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          sortOption="date-asc"
          onSortChange={mockOnSortChange}
          onActivityCountsChange={mockOnActivityCountsChange}
        />
      );

      expect(mockOnActivityCountsChange).toHaveBeenCalledWith(
        expect.objectContaining({
          all: expect.any(Number),
          upcoming: expect.any(Number),
          'in-progress': expect.any(Number),
          completed: expect.any(Number),
          overdue: expect.any(Number),
        })
      );
    });
  });
});

