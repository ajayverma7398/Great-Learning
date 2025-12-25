'use client';

import {
  Box,
  VStack,
  HStack,
  Text,
  Pressable,
  useColorModeValue,
  Divider,
  Badge,
} from 'native-base';
import { ActivityStatus } from '@activity-platform/shared';

type CourseFilterStatus = ActivityStatus | 'all' | 'incomplete' | 'due';

interface CourseSidebarProps {
  selectedStatus: CourseFilterStatus;
  onStatusChange: (status: CourseFilterStatus) => void;
  activityCounts?: {
    all: number;
    upcoming: number;
    'in-progress': number;
    completed: number;
    overdue: number;
  };
}

export function CourseSidebar({ selectedStatus, onStatusChange, activityCounts }: CourseSidebarProps) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const selectedBg = useColorModeValue('primary.50', 'primary.900');
  const selectedTextColor = useColorModeValue('primary.600', 'primary.300');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  const courseStatusOptions: { 
    label: string; 
    value: CourseFilterStatus;
    icon: string;
    colorScheme: string;
  }[] = [
    { label: 'All Courses', value: 'all', icon: '🎨', colorScheme: 'blue' },
    { label: 'Completed Courses', value: 'completed', icon: '✅', colorScheme: 'emerald' },
    { label: 'Incomplete Courses', value: 'incomplete', icon: '🔵', colorScheme: 'blue' },
    { label: 'Due', value: 'due', icon: '📅', colorScheme: 'primary' },
    { label: 'Overdue', value: 'overdue', icon: '⚠️', colorScheme: 'yellow' },
    { label: 'Upcoming', value: 'upcoming', icon: '⏰', colorScheme: 'red' },
  ];

  const getCount = (value: CourseFilterStatus) => {
    if (value === 'all') return activityCounts?.all || 0;
    if (value === 'incomplete') {
      return (activityCounts?.['in-progress'] || 0) + (activityCounts?.overdue || 0);
    }
    if (value === 'due') {
      return activityCounts?.upcoming || 0;
    }
    return activityCounts?.[value as ActivityStatus] || 0;
  };

  return (
    <Box
      bg={bgColor}
      borderRightWidth={1}
      borderRightColor={borderColor}
      w="240px"
      minW="240px"
      maxW="240px"
      h="calc(100vh - 64px)"
      position="sticky"
      top="64px"
      overflowY="auto"
      flexShrink={0}
    >
      <VStack space={1} p={4}>
        <Text fontSize="sm" fontWeight="bold" color={useColorModeValue('gray.600', 'gray.400')} mb={2} px={2}>
          COURSES
        </Text>
        <Divider mb={2} />
        
        {courseStatusOptions.map((option) => {
          const isSelected = selectedStatus === option.value;
          const count = getCount(option.value);
          
          return (
            <Pressable
              key={option.value}
              onPress={() => onStatusChange(option.value)}
              _hover={{ bg: hoverBg }}
            >
              <Box
                bg={isSelected ? useColorModeValue('blue.50', 'blue.900') : 'transparent'}
                px={3}
                py={2.5}
                borderRadius="md"
                borderLeftWidth={isSelected ? 3 : 0}
                borderLeftColor={isSelected ? 'blue.500' : 'transparent'}
              >
                <HStack space={3} alignItems="center" justifyContent="space-between">
                  <HStack space={3} alignItems="center" flex={1}>
                    <Text fontSize="lg">{option.icon}</Text>
                    <Text
                      fontSize="sm"
                      fontWeight={isSelected ? 'semibold' : 'normal'}
                      color={isSelected ? 'blue.600' : textColor}
                      flex={1}
                    >
                      {option.label}
                    </Text>
                  </HStack>
                  {count > 0 && (
                    <Badge
                      colorScheme={option.colorScheme}
                      variant="subtle"
                      borderRadius="full"
                      px={2}
                      py={0.5}
                    >
                      {count}
                    </Badge>
                  )}
                </HStack>
              </Box>
            </Pressable>
          );
        })}
      </VStack>
    </Box>
  );
}

