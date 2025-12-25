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

interface LeftSidebarProps {
  selectedStatus: ActivityStatus | 'all';
  onStatusChange: (status: ActivityStatus | 'all') => void;
  activityCounts?: {
    all: number;
    upcoming: number;
    'in-progress': number;
    completed: number;
    overdue: number;
  };
}

export function LeftSidebar({ selectedStatus, onStatusChange, activityCounts }: LeftSidebarProps) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const selectedBg = useColorModeValue('primary.50', 'primary.900');
  const selectedTextColor = useColorModeValue('primary.600', 'primary.300');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  const statusOptions: { 
    label: string; 
    value: ActivityStatus | 'all';
    icon: string;
    colorScheme: string;
  }[] = [
    { label: 'All Activities', value: 'all', icon: '📋', colorScheme: 'gray' },
    { label: 'Upcoming', value: 'upcoming', icon: '📅', colorScheme: 'primary' },
    { label: 'In Progress', value: 'in-progress', icon: '🔄', colorScheme: 'orange' },
    { label: 'Completed', value: 'completed', icon: '✅', colorScheme: 'emerald' },
    { label: 'Overdue', value: 'overdue', icon: '⚠️', colorScheme: 'rose' },
  ];

  return (
    <Box
      bg={bgColor}
      borderRightWidth={1}
      borderRightColor={borderColor}
      minW="240px"
      h="calc(100vh - 64px)"
      position="sticky"
      top="64px"
      overflowY="auto"
    >
      <VStack space={1} p={4}>
        <Text fontSize="sm" fontWeight="bold" color={useColorModeValue('gray.600', 'gray.400')} mb={2} px={2}>
          FILTER BY STATUS
        </Text>
        <Divider mb={2} />
        
        {statusOptions.map((option) => {
          const isSelected = selectedStatus === option.value;
          const count = activityCounts?.[option.value as keyof typeof activityCounts] || 0;
          
          return (
            <Pressable
              key={option.value}
              onPress={() => onStatusChange(option.value)}
              _hover={{ bg: hoverBg }}
            >
              <Box
                bg={isSelected ? selectedBg : 'transparent'}
                px={3}
                py={2.5}
                borderRadius="md"
                borderLeftWidth={isSelected ? 3 : 0}
                borderLeftColor={isSelected ? `${option.colorScheme}.500` : 'transparent'}
              >
                <HStack space={3} alignItems="center" justifyContent="space-between">
                  <HStack space={3} alignItems="center" flex={1}>
                    <Text fontSize="lg">{option.icon}</Text>
                    <Text
                      fontSize="sm"
                      fontWeight={isSelected ? 'semibold' : 'normal'}
                      color={isSelected ? selectedTextColor : textColor}
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

