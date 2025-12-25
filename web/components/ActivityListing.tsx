'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Select,
  Button,
  useColorModeValue,
} from 'native-base';
import {
  Activity,
  ActivityFilters,
  ActivityType,
  ActivityStatus,
  mockActivities,
  filterActivities,
  sortActivities,
} from '@activity-platform/shared';
import { ActivityCard } from './ActivityCard';

interface ActivityListingProps {
  filters: ActivityFilters;
  onFiltersChange: (filters: ActivityFilters) => void;
  sortOption: 'date-asc' | 'date-desc' | 'title-asc' | 'title-desc';
  onSortChange: (sort: 'date-asc' | 'date-desc' | 'title-asc' | 'title-desc') => void;
  onActivityCountsChange?: (counts: {
    all: number;
    upcoming: number;
    'in-progress': number;
    completed: number;
    overdue: number;
  }) => void;
}

export function ActivityListing({
  filters,
  onFiltersChange,
  sortOption,
  onSortChange,
  onActivityCountsChange,
}: ActivityListingProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const inputBg = useColorModeValue('white', 'gray.700');
  const emptyStateTextColor = useColorModeValue('gray.600', 'gray.400');
  const paginationTextColor = useColorModeValue('gray.600', 'gray.400');

  const filteredAndSortedActivities = useMemo(() => {
    let filtered = filterActivities(mockActivities, filters);
    return sortActivities(filtered, sortOption);
  }, [filters, sortOption]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortOption]);

  const totalPages = Math.ceil(filteredAndSortedActivities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedActivities = filteredAndSortedActivities.slice(startIndex, endIndex);

  const activityCounts = useMemo(() => {
    const counts = {
      all: mockActivities.length,
      upcoming: 0,
      'in-progress': 0,
      completed: 0,
      overdue: 0,
    };

    mockActivities.forEach((activity) => {
      if (activity.status === 'upcoming') counts.upcoming++;
      else if (activity.status === 'in-progress') counts['in-progress']++;
      else if (activity.status === 'completed') counts.completed++;
      else if (activity.status === 'overdue') counts.overdue++;
    });

    return counts;
  }, []);

  useEffect(() => {
    if (onActivityCountsChange) {
      onActivityCountsChange(activityCounts);
    }
  }, [activityCounts, onActivityCountsChange]);

  const handleFilterChange = (key: keyof ActivityFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      type: 'all',
      status: 'all',
      searchQuery: '',
    });
  };

  return (
    <VStack flex={1} space={4}>
      <Box
        bg={bgColor}
        p={4}
        borderRadius="xl"
        borderWidth={1}
        borderColor={borderColor}
        shadow={2}
        mb={4}
      >
        <VStack space={3}>
          <HStack space={3} flexWrap="wrap" alignItems="center">
            <Box flex={1} minW="250px">
              <Input
                placeholder="🔍 Search activities..."
                value={filters.searchQuery || ''}
                onChangeText={(text) => handleFilterChange('searchQuery', text)}
                bg={inputBg}
                size="md"
                borderRadius="lg"
                borderColor={useColorModeValue('primary.200', 'primary.700')}
                _focus={{
                  borderColor: 'primary.500',
                  bg: inputBg,
                }}
              />
            </Box>
            
            <Box minW="200px">
              <Select
                selectedValue={sortOption}
                onValueChange={(value: any) => onSortChange(value)}
                bg={inputBg}
                placeholder="Sort By"
                borderRadius="lg"
                borderColor={useColorModeValue('primary.200', 'primary.700')}
              >
                <Select.Item label="Date (Oldest First)" value="date-asc" />
                <Select.Item label="Date (Newest First)" value="date-desc" />
                <Select.Item label="Title (A-Z)" value="title-asc" />
                <Select.Item label="Title (Z-A)" value="title-desc" />
              </Select>
            </Box>
            
            <Button
              colorScheme="rose"
              variant="outline"
              onPress={clearFilters}
              minW="120px"
              borderRadius="lg"
            >
              Clear Filters
            </Button>
          </HStack>

          {/* Results Count */}
          <Box
            bg={useColorModeValue('primary.50', 'primary.900')}
            px={4}
            py={2}
            borderRadius="lg"
          >
            <Text fontSize="sm" fontWeight="medium" color={useColorModeValue('primary.700', 'primary.200')}>
              📊 Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedActivities.length)} of {filteredAndSortedActivities.length} activities
            </Text>
          </Box>
        </VStack>
      </Box>

      <VStack space={3} flex={1}>
        {filteredAndSortedActivities.length === 0 ? (
          <Box
            bg={bgColor}
            p={8}
            borderRadius="lg"
            borderWidth={1}
            borderColor={borderColor}
            alignItems="center"
          >
            <Text fontSize="lg" color={emptyStateTextColor}>
              No activities found matching your filters.
            </Text>
          </Box>
        ) : (
          <>
            {paginatedActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </>
        )}
      </VStack>

      {filteredAndSortedActivities.length > itemsPerPage && (
        <Box
          bg={bgColor}
          p={4}
          borderRadius="xl"
          borderWidth={1}
          borderColor={borderColor}
          shadow={2}
          mt={4}
        >
          <HStack space={2} justifyContent="center" alignItems="center" flexWrap="wrap">
            <Button
              size="sm"
              variant="outline"
              colorScheme="primary"
              onPress={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              isDisabled={currentPage === 1}
              borderRadius="md"
            >
              Previous
            </Button>

            {/* Page Numbers */}
            <HStack space={1} alignItems="center">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <Button
                      key={page}
                      size="sm"
                      variant={currentPage === page ? 'solid' : 'outline'}
                      colorScheme="primary"
                      onPress={() => setCurrentPage(page)}
                      minW="40px"
                      borderRadius="md"
                    >
                      {page}
                    </Button>
                  );
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <Text key={page} color={paginationTextColor} px={2}>
                      ...
                    </Text>
                  );
                }
                return null;
              })}
            </HStack>

            <Button
              size="sm"
              variant="outline"
              colorScheme="primary"
              onPress={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              isDisabled={currentPage === totalPages}
              borderRadius="md"
            >
              Next
            </Button>
          </HStack>

          <Text
            fontSize="xs"
            color={paginationTextColor}
            textAlign="center"
            mt={2}
          >
            Page {currentPage} of {totalPages}
          </Text>
        </Box>
      )}
    </VStack>
  );
}

