'use client';

import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Badge,
  Progress,
  useColorModeValue,
  Divider,
  Flex,
  Pressable,
} from 'native-base';
import {
  Activity,
  getActivityTypeLabel,
  getActivityStatusLabel,
  getActivityStatusColor,
  getActionButtonLabel,
  formatDate,
  formatTime,
  formatDuration,
} from '@activity-platform/shared';
import { useRouter } from 'next/navigation';

interface ActivityCardProps {
  activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const router = useRouter();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');

  const getStatusColorScheme = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'primary';
      case 'in-progress':
        return 'orange';
      case 'completed':
        return 'emerald';
      case 'overdue':
        return 'rose';
      default:
        return 'primary';
    }
  };

  const statusColorScheme = getStatusColorScheme(activity.status);
  const actionLabel = getActionButtonLabel(activity);
  const progressBgColor = useColorModeValue(`${statusColorScheme}.100`, `${statusColorScheme}.900`);

  const handleCardClick = () => {
    router.push(`/course/${activity.id}`);
  };

  const handleAction = (e: any) => {
    e.stopPropagation();
    router.push(`/course/${activity.id}`);
  };

  return (
    <Pressable onPress={handleCardClick} _hover={{ opacity: 0.95 }} _pressed={{ opacity: 0.9 }}>
      <Box
        bg={bgColor}
        p={5}
        borderRadius="xl"
        borderWidth={2}
        borderColor={useColorModeValue(`${statusColorScheme}.100`, `${statusColorScheme}.800`)}
        shadow={3}
      >
      <VStack space={3}>
        <Flex direction="row" align="flex-start" justify="space-between" wrap="wrap">
          <VStack flex={1} minW="200px" space={1}>
            <HStack space={2} alignItems="center" flexWrap="wrap">
              <Text fontSize="xl" fontWeight="bold" color={textColor} flex={1}>
                {activity.title}
              </Text>
              <Badge 
                colorScheme={statusColorScheme} 
                variant="solid"
                px={3}
                py={1}
                borderRadius="full"
              >
                {getActivityStatusLabel(activity.status)}
              </Badge>
            </HStack>
            <Badge
              colorScheme={
                activity.type === 'online-class' ? 'purple' :
                activity.type === 'assignment' ? 'orange' :
                activity.type === 'quiz' ? 'primary' : 'emerald'
              }
              variant="subtle"
              alignSelf="flex-start"
              px={2}
              py={0.5}
            >
              {getActivityTypeLabel(activity.type)}
            </Badge>
          </VStack>
        </Flex>

        <Divider />

        <VStack space={1}>
          <HStack space={2}>
            <Text fontSize="sm" fontWeight="medium" color={textColor}>
              Course:
            </Text>
            <Text fontSize="sm" color={secondaryTextColor}>
              {activity.courseName}
            </Text>
          </HStack>
          <HStack space={2}>
            <Text fontSize="sm" fontWeight="medium" color={textColor}>
              Program:
            </Text>
            <Text fontSize="sm" color={secondaryTextColor}>
              {activity.programName}
            </Text>
          </HStack>
        </VStack>

        <HStack space={4} flexWrap="wrap">
          <VStack space={1}>
            <Text fontSize="xs" color={secondaryTextColor} fontWeight="medium">
              Scheduled Date
            </Text>
            <Text fontSize="sm" color={textColor}>
              {formatDate(activity.scheduledDate)}
            </Text>
          </VStack>
          {activity.scheduledTime && (
            <VStack space={1}>
              <Text fontSize="xs" color={secondaryTextColor} fontWeight="medium">
                Time
              </Text>
              <Text fontSize="sm" color={textColor}>
                {formatTime(activity.scheduledTime)}
              </Text>
            </VStack>
          )}
          {activity.duration && (
            <VStack space={1}>
              <Text fontSize="xs" color={secondaryTextColor} fontWeight="medium">
                Duration
              </Text>
              <Text fontSize="sm" color={textColor}>
                {formatDuration(activity.duration)}
              </Text>
            </VStack>
          )}
          {activity.dueDate && (
            <VStack space={1}>
              <Text fontSize="xs" color={secondaryTextColor} fontWeight="medium">
                Due Date
              </Text>
              <Text fontSize="sm" color={textColor}>
                {formatDate(activity.dueDate)}
              </Text>
            </VStack>
          )}
        </HStack>

        {(activity.instructor || activity.isLive !== undefined) && (
          <HStack space={4} flexWrap="wrap">
            {activity.instructor && (
              <VStack space={1}>
                <Text fontSize="xs" color={secondaryTextColor} fontWeight="medium">
                  Instructor
                </Text>
                <Text fontSize="sm" color={textColor}>
                  {activity.instructor}
                </Text>
              </VStack>
            )}
            {activity.isLive !== undefined && (
              <Badge
                colorScheme={activity.isLive ? 'rose' : 'primary'}
                variant="solid"
                px={3}
                py={1}
                borderRadius="full"
              >
                {activity.isLive ? '🔴 Live' : '📹 Recorded'}
              </Badge>
            )}
          </HStack>
        )}

        {activity.maxScore && (
          <HStack space={2}>
            <Text fontSize="sm" color={secondaryTextColor}>
              Max Score:
            </Text>
            <Text fontSize="sm" fontWeight="medium" color={textColor}>
              {activity.maxScore} points
            </Text>
            {activity.score !== undefined && (
              <>
                <Text fontSize="sm" color={secondaryTextColor}>
                  | Your Score:
                </Text>
                <Text fontSize="sm" fontWeight="bold" color={textColor}>
                  {activity.score} points
                </Text>
              </>
            )}
          </HStack>
        )}

        {activity.progress !== undefined && activity.progress < 100 && (
          <VStack space={1}>
            <HStack justifyContent="space-between">
              <Text fontSize="xs" color={secondaryTextColor}>
                Progress
              </Text>
              <Text fontSize="xs" fontWeight="medium" color={textColor}>
                {activity.progress}%
              </Text>
            </HStack>
            <Progress
              value={activity.progress}
              colorScheme={statusColorScheme}
              size="md"
              borderRadius="full"
              bg={progressBgColor}
            />
          </VStack>
        )}

        {activity.description && (
          <Box>
            <Text fontSize="sm" color={secondaryTextColor} numberOfLines={2}>
              {activity.description}
            </Text>
          </Box>
        )}

        <Divider />

        <HStack justifyContent="flex-end">
          <Button
            colorScheme={statusColorScheme}
            onPress={handleAction}
            size="md"
            minW="140px"
            borderRadius="lg"
            _hover={{
              _text: { color: 'white' },
            }}
            _pressed={{
              opacity: 0.8,
            }}
          >
            {actionLabel}
          </Button>
        </HStack>
      </VStack>
    </Box>
    </Pressable>
  );
}

