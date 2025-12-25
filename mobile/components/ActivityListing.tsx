import { useState, useMemo } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Select,
  Button,
  useColorModeValue,
  ScrollView,
  Divider,
  Heading,
  Flex,
  IconButton,
  useColorMode,
} from 'native-base';
import {
  ActivityFilters,
  ActivityType,
  ActivityStatus,
  mockActivities,
  filterActivities,
  sortActivities,
} from '@activity-platform/shared';
import { ActivityCard } from './ActivityCard';

export function ActivityListing() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [filters, setFilters] = useState<ActivityFilters>({
    type: 'all',
    status: 'all',
    searchQuery: '',
  });
  const [sortOption, setSortOption] = useState<'date-asc' | 'date-desc' | 'title-asc' | 'title-desc'>('date-asc');

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const inputBg = useColorModeValue('white', 'gray.700');

  const filteredAndSortedActivities = useMemo(() => {
    let filtered = filterActivities(mockActivities, filters);
    return sortActivities(filtered, sortOption);
  }, [filters, sortOption]);

  const handleFilterChange = (key: keyof ActivityFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      type: 'all',
      status: 'all',
      searchQuery: '',
    });
  };

  const activityTypeOptions: { label: string; value: ActivityType | 'all' }[] = [
    { label: 'All Types', value: 'all' },
    { label: 'Online Class', value: 'online-class' },
    { label: 'Assignment', value: 'assignment' },
    { label: 'Quiz', value: 'quiz' },
    { label: 'Discussion', value: 'discussion' },
  ];

  const activityStatusOptions: { label: string; value: ActivityStatus | 'all' }[] = [
    { label: 'All Status', value: 'all' },
    { label: 'Upcoming', value: 'upcoming' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Completed', value: 'completed' },
    { label: 'Overdue', value: 'overdue' },
  ];

  return (
    <VStack flex={1} safeAreaTop>
      {/* Header */}
      <Box
        bg={bgColor}
        borderBottomWidth={1}
        borderBottomColor={borderColor}
        px={4}
        py={4}
      >
        <Flex direction="row" align="center" justify="space-between">
          <Heading size="xl" color={useColorModeValue('gray.800', 'white')}>
            My Activities
          </Heading>
          <IconButton
            icon={
              <Text fontSize="2xl">{colorMode === 'light' ? '🌙' : '☀️'}</Text>
            }
            onPress={toggleColorMode}
            variant="ghost"
          />
        </Flex>
      </Box>

      <ScrollView flex={1}>
        <VStack space={4} p={4}>
          {/* Filters Section */}
          <Box
            bg={bgColor}
            p={4}
            borderRadius="lg"
            borderWidth={1}
            borderColor={borderColor}
          >
            <VStack space={4}>
              <Heading size="md">Filters</Heading>
              
              {/* Search */}
              <Input
                placeholder="Search activities..."
                value={filters.searchQuery || ''}
                onChangeText={(text) => handleFilterChange('searchQuery', text)}
                bg={inputBg}
                size="md"
              />

              {/* Filters */}
              <VStack space={3}>
                <Select
                  selectedValue={filters.type || 'all'}
                  onValueChange={(value) => handleFilterChange('type', value)}
                  bg={inputBg}
                  placeholder="Activity Type"
                >
                  {activityTypeOptions.map((option) => (
                    <Select.Item
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </Select>

                <Select
                  selectedValue={filters.status || 'all'}
                  onValueChange={(value) => handleFilterChange('status', value)}
                  bg={inputBg}
                  placeholder="Status"
                >
                  {activityStatusOptions.map((option) => (
                    <Select.Item
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </Select>

                <Select
                  selectedValue={sortOption}
                  onValueChange={(value: any) => setSortOption(value)}
                  bg={inputBg}
                  placeholder="Sort By"
                >
                  <Select.Item label="Date (Oldest First)" value="date-asc" />
                  <Select.Item label="Date (Newest First)" value="date-desc" />
                  <Select.Item label="Title (A-Z)" value="title-asc" />
                  <Select.Item label="Title (Z-A)" value="title-desc" />
                </Select>

                <Button
                  variant="outline"
                  onPress={clearFilters}
                >
                  Clear Filters
                </Button>
              </VStack>

              {/* Results Count */}
              <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                Showing {filteredAndSortedActivities.length} of {mockActivities.length} activities
              </Text>
            </VStack>
          </Box>

          {/* Activities List */}
          <VStack space={3}>
            {filteredAndSortedActivities.length === 0 ? (
              <Box
                bg={bgColor}
                p={8}
                borderRadius="lg"
                borderWidth={1}
                borderColor={borderColor}
                alignItems="center"
              >
                <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
                  No activities found matching your filters.
                </Text>
              </Box>
            ) : (
              filteredAndSortedActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))
            )}
          </VStack>
        </VStack>
      </ScrollView>
    </VStack>
  );
}

