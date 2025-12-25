'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  useColorModeValue,
} from 'native-base';
import { ActivityListing } from '../components/ActivityListing';
import { TopNavBar } from '../components/TopNavBar';
import { CourseSidebar } from '../components/CourseSidebar';
import { ActivityFilters, ActivityType, ActivityStatus } from '@activity-platform/shared';

export default function Home() {
  const [filters, setFilters] = useState<ActivityFilters>({
    type: 'all',
    status: 'all',
    searchQuery: '',
  });
  const [sortOption, setSortOption] = useState<'date-asc' | 'date-desc' | 'title-asc' | 'title-desc'>('date-asc');
  const [activityCounts, setActivityCounts] = useState<{
    all: number;
    upcoming: number;
    'in-progress': number;
    completed: number;
    overdue: number;
  }>({
    all: 0,
    upcoming: 0,
    'in-progress': 0,
    completed: 0,
    overdue: 0,
  });

  const bgColor = useColorModeValue('gray.50', 'gray.900');

  const handleTypeChange = (type: ActivityType | 'all') => {
    setFilters((prev) => ({ ...prev, type }));
  };

  const [selectedSidebarOption, setSelectedSidebarOption] = useState<ActivityStatus | 'all' | 'incomplete' | 'due'>('all');

  useEffect(() => {
    if (filters.status === 'upcoming' && selectedSidebarOption !== 'upcoming' && selectedSidebarOption !== 'due') {
      setSelectedSidebarOption('upcoming');
    } else if (filters.status === 'all' && selectedSidebarOption !== 'all') {
      setSelectedSidebarOption('all');
    } else if (filters.status === 'completed' && selectedSidebarOption !== 'completed') {
      setSelectedSidebarOption('completed');
    } else if (filters.status === 'overdue' && selectedSidebarOption !== 'overdue') {
      setSelectedSidebarOption('overdue');
    } else if (filters.status === 'incomplete' as any && selectedSidebarOption !== 'incomplete') {
      setSelectedSidebarOption('incomplete');
    }
  }, [filters.status, selectedSidebarOption]);

  const handleStatusChange = (status: ActivityStatus | 'all' | 'incomplete' | 'due') => {
    setSelectedSidebarOption(status);
    if (status === 'incomplete') {
      setFilters((prev) => ({ ...prev, status: 'incomplete' as any }));
    } else if (status === 'due') {
      setFilters((prev) => ({ ...prev, status: 'upcoming' }));
    } else {
      setFilters((prev) => ({ ...prev, status: status as ActivityStatus | 'all' }));
    }
  };

  return (
    <Box minH="100vh" bg={bgColor}>
      <TopNavBar
        selectedType={filters.type || 'all'}
        onTypeChange={handleTypeChange}
      />

      <Flex direction="row" align="flex-start" w="100%">
        <CourseSidebar
          selectedStatus={selectedSidebarOption}
          onStatusChange={handleStatusChange}
          activityCounts={activityCounts}
        />

        <Box
          flex={1}
          pl={6}
          pr="10%"
          py={6}
          w="100%"
        >
          <ActivityListing
            filters={filters}
            onFiltersChange={setFilters}
            sortOption={sortOption}
            onSortChange={setSortOption}
            onActivityCountsChange={setActivityCounts}
          />
        </Box>
      </Flex>
    </Box>
  );
}

