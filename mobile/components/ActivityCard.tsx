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
import { Alert } from 'react-native';

interface ActivityCardProps {
  activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');

  const statusColor = getActivityStatusColor(activity.status);
  const actionLabel = getActionButtonLabel(activity);

  const handleAction = () => {
    // In a real app, this would navigate to the activity detail page
    Alert.alert('Activity Action', `Opening ${activity.title}`);
  };

  return (
    <Box
      bg={bgColor}
      p={4}
      borderRadius="lg"
      borderWidth={1}
      borderColor={borderColor}
      shadow={1}
    >
      <VStack space={3}>
        {/* Header */}
        <VStack space={1}>
          <HStack space={2} align="center" flexWrap="wrap">
            <Text fontSize="lg" fontWeight="bold" color={textColor} flex={1}>
              {activity.title}
            </Text>
            <Badge colorScheme={statusColor} variant="subtle">
              {getActivityStatusLabel(activity.status)}
            </Badge>
          </HStack>
          <Text fontSize="sm" color={secondaryTextColor}>
            {getActivityTypeLabel(activity.type)}
          </Text>
        </VStack>

        <Divider />

        {/* Course Info */}
        <VStack space={1}>
          <HStack space={2}>
            <Text fontSize="sm" fontWeight="medium" color={textColor}>
              Course:
            </Text>
            <Text fontSize="sm" color={secondaryTextColor} flex={1}>
              {activity.courseName}
            </Text>
          </HStack>
          <HStack space={2}>
            <Text fontSize="sm" fontWeight="medium" color={textColor}>
              Program:
            </Text>
            <Text fontSize="sm" color={secondaryTextColor} flex={1}>
              {activity.programName}
            </Text>
          </HStack>
        </VStack>

        {/* Schedule Info */}
        <VStack space={2}>
          <HStack space={4} flexWrap="wrap">
            <VStack space={1} flex={1} minW="100px">
              <Text fontSize="xs" color={secondaryTextColor} fontWeight="medium">
                Scheduled Date
              </Text>
              <Text fontSize="sm" color={textColor}>
                {formatDate(activity.scheduledDate)}
              </Text>
            </VStack>
            {activity.scheduledTime && (
              <VStack space={1} flex={1} minW="100px">
                <Text fontSize="xs" color={secondaryTextColor} fontWeight="medium">
                  Time
                </Text>
                <Text fontSize="sm" color={textColor}>
                  {formatTime(activity.scheduledTime)}
                </Text>
              </VStack>
            )}
          </HStack>
          <HStack space={4} flexWrap="wrap">
            {activity.duration && (
              <VStack space={1} flex={1} minW="100px">
                <Text fontSize="xs" color={secondaryTextColor} fontWeight="medium">
                  Duration
                </Text>
                <Text fontSize="sm" color={textColor}>
                  {formatDuration(activity.duration)}
                </Text>
              </VStack>
            )}
            {activity.dueDate && (
              <VStack space={1} flex={1} minW="100px">
                <Text fontSize="xs" color={secondaryTextColor} fontWeight="medium">
                  Due Date
                </Text>
                <Text fontSize="sm" color={textColor}>
                  {formatDate(activity.dueDate)}
                </Text>
              </VStack>
            )}
          </HStack>
        </VStack>

        {/* Additional Info */}
        {(activity.instructor || activity.isLive !== undefined) && (
          <HStack space={4} flexWrap="wrap">
            {activity.instructor && (
              <VStack space={1} flex={1}>
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
                colorScheme={activity.isLive ? 'red' : 'blue'}
                variant="subtle"
                alignSelf="flex-start"
              >
                {activity.isLive ? '🔴 Live' : '📹 Recorded'}
              </Badge>
            )}
          </HStack>
        )}

        {/* Score Info (for assessments) */}
        {activity.maxScore && (
          <HStack space={2} flexWrap="wrap">
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

        {/* Progress Bar */}
        {activity.progress !== undefined && activity.progress < 100 && (
          <VStack space={1}>
            <HStack justify="space-between">
              <Text fontSize="xs" color={secondaryTextColor}>
                Progress
              </Text>
              <Text fontSize="xs" fontWeight="medium" color={textColor}>
                {activity.progress}%
              </Text>
            </HStack>
            <Progress
              value={activity.progress}
              colorScheme={statusColor}
              size="sm"
            />
          </VStack>
        )}

        {/* Description */}
        {activity.description && (
          <Box>
            <Text fontSize="sm" color={secondaryTextColor} numberOfLines={2}>
              {activity.description}
            </Text>
          </Box>
        )}

        <Divider />

        {/* Action Button */}
        <HStack justify="flex-end">
          <Button
            colorScheme={statusColor}
            onPress={handleAction}
            size="md"
            minW="120px"
          >
            {actionLabel}
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}

