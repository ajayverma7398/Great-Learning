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
  Heading,
  IconButton,
} from 'native-base';
import {
  Activity,
  getActivityTypeLabel,
  getActivityStatusLabel,
  formatDate,
  formatTime,
  formatDuration,
} from '@activity-platform/shared';
import { useRouter } from 'next/navigation';

interface CourseDetailsProps {
  activity: Activity;
}

export function CourseDetails({ activity }: CourseDetailsProps) {
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
  const progressBgColor = useColorModeValue(`${statusColorScheme}.100`, `${statusColorScheme}.900`);

  const handleBack = () => {
    router.back();
  };

  const handleAction = () => {
    if (activity.status === 'upcoming' && activity.type === 'online-class' && activity.isLive) {
      window.open(activity.meetingLink, '_blank');
    } else if (activity.status === 'completed' && activity.type === 'online-class' && activity.recordingUrl) {
      window.open(activity.recordingUrl, '_blank');
    } else {
      alert(`Starting ${activity.title}`);
    }
  };

  const getActionButtonLabel = () => {
    switch (activity.status) {
      case 'upcoming':
        return activity.type === 'online-class' && activity.isLive ? 'Join Now' : 'Start';
      case 'in-progress':
        return 'Continue';
      case 'completed':
        return 'Review';
      case 'overdue':
        return 'Start';
      default:
        return 'View';
    }
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')} px={6} pb={6}>
      <Box maxW="1200px" mx="auto">
        <HStack alignItems="center" mb={1} pt={2}>
          <IconButton
            icon={<Text fontSize="sm">←</Text>}
            onPress={handleBack}
            variant="ghost"
            size="xs"
            h="38px"
            w="38px"
            minH="38px"
            minW="38px"
            _pressed={{ bg: useColorModeValue('gray.100', 'gray.700') }}
            aria-label="Go back"
          />
        </HStack>

        <Box
          bg={bgColor}
          borderRadius="xl"
          borderWidth={1}
          borderColor={borderColor}
          shadow={4}
          p={6}
        >
          <VStack space={6}>
            <VStack space={3}>
              <HStack space={3} alignItems="center" flexWrap="wrap">
                <Badge
                  colorScheme={
                    activity.type === 'online-class' ? 'purple' :
                    activity.type === 'assignment' ? 'orange' :
                    activity.type === 'quiz' ? 'primary' : 'emerald'
                  }
                  variant="subtle"
                  px={3}
                  py={1}
                  borderRadius="md"
                >
                  {getActivityTypeLabel(activity.type)}
                </Badge>
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
              
              <Heading size="2xl" color={textColor}>
                {activity.title}
              </Heading>

              <VStack space={2}>
                <HStack space={2}>
                  <Text fontSize="md" fontWeight="medium" color={textColor}>
                    Course:
                  </Text>
                  <Text fontSize="md" color={secondaryTextColor}>
                    {activity.courseName}
                  </Text>
                </HStack>
                <HStack space={2}>
                  <Text fontSize="md" fontWeight="medium" color={textColor}>
                    Program:
                  </Text>
                  <Text fontSize="md" color={secondaryTextColor}>
                    {activity.programName}
                  </Text>
                </HStack>
              </VStack>
            </VStack>

            <Divider />

            <VStack space={4}>
              <Heading size="md" color={textColor}>
                Schedule Information
              </Heading>
              <HStack space={6} flexWrap="wrap">
                <VStack space={1}>
                  <Text fontSize="sm" color={secondaryTextColor} fontWeight="medium">
                    Scheduled Date
                  </Text>
                  <Text fontSize="md" color={textColor} fontWeight="semibold">
                    {formatDate(activity.scheduledDate)}
                  </Text>
                </VStack>
                {activity.scheduledTime && (
                  <VStack space={1}>
                    <Text fontSize="sm" color={secondaryTextColor} fontWeight="medium">
                      Time
                    </Text>
                    <Text fontSize="md" color={textColor} fontWeight="semibold">
                      {formatTime(activity.scheduledTime)}
                    </Text>
                  </VStack>
                )}
                {activity.duration && (
                  <VStack space={1}>
                    <Text fontSize="sm" color={secondaryTextColor} fontWeight="medium">
                      Duration
                    </Text>
                    <Text fontSize="md" color={textColor} fontWeight="semibold">
                      {formatDuration(activity.duration)}
                    </Text>
                  </VStack>
                )}
                {activity.dueDate && (
                  <VStack space={1}>
                    <Text fontSize="sm" color={secondaryTextColor} fontWeight="medium">
                      Due Date
                    </Text>
                    <Text fontSize="md" color={textColor} fontWeight="semibold">
                      {formatDate(activity.dueDate)}
                    </Text>
                  </VStack>
                )}
              </HStack>
            </VStack>

            {(activity.instructor || activity.isLive !== undefined) && (
              <>
                <Divider />
                <VStack space={4}>
                  <Heading size="md" color={textColor}>
                    Additional Information
                  </Heading>
                  <VStack space={3}>
                    {activity.instructor && (
                      <HStack space={2}>
                        <Text fontSize="md" fontWeight="medium" color={textColor}>
                          Instructor:
                        </Text>
                        <Text fontSize="md" color={secondaryTextColor}>
                          {activity.instructor}
                        </Text>
                      </HStack>
                    )}
                    {activity.isLive !== undefined && (
                      <Badge
                        colorScheme={activity.isLive ? 'rose' : 'primary'}
                        variant="solid"
                        alignSelf="flex-start"
                        px={3}
                        py={1}
                        borderRadius="full"
                      >
                        {activity.isLive ? '🔴 Live Session' : '📹 Recorded Session'}
                      </Badge>
                    )}
                  </VStack>
                </VStack>
              </>
            )}

            {activity.maxScore && (
              <>
                <Divider />
                <VStack space={4}>
                  <Heading size="md" color={textColor}>
                    Assessment Details
                  </Heading>
                  <VStack space={2}>
                    <HStack space={2}>
                      <Text fontSize="md" color={secondaryTextColor}>
                        Maximum Score:
                      </Text>
                      <Text fontSize="md" fontWeight="semibold" color={textColor}>
                        {activity.maxScore} points
                      </Text>
                    </HStack>
                    {activity.score !== undefined && (
                      <HStack space={2}>
                        <Text fontSize="md" color={secondaryTextColor}>
                          Your Score:
                        </Text>
                        <Text fontSize="md" fontWeight="bold" color="emerald.600">
                          {activity.score} points
                        </Text>
                        <Text fontSize="md" color={secondaryTextColor}>
                          ({Math.round((activity.score / activity.maxScore) * 100)}%)
                        </Text>
                      </HStack>
                    )}
                  </VStack>
                </VStack>
              </>
            )}

            {activity.progress !== undefined && activity.progress < 100 && (
              <>
                <Divider />
                <VStack space={2}>
                  <HStack justifyContent="space-between">
                    <Text fontSize="md" fontWeight="medium" color={textColor}>
                      Progress
                    </Text>
                    <Text fontSize="md" fontWeight="semibold" color={textColor}>
                      {activity.progress}%
                    </Text>
                  </HStack>
                  <Progress
                    value={activity.progress}
                    colorScheme={statusColorScheme}
                    size="lg"
                    borderRadius="full"
                    bg={progressBgColor}
                  />
                </VStack>
              </>
            )}

            {activity.description && (
              <>
                <Divider />
                <VStack space={2}>
                  <Heading size="md" color={textColor}>
                    Description
                  </Heading>
                  <Text fontSize="md" color={secondaryTextColor} lineHeight="lg">
                    {activity.description}
                  </Text>
                </VStack>
              </>
            )}

            <Divider />

            <HStack space={4} justifyContent="flex-end">
              <Button
                variant="outline"
                colorScheme="gray"
                onPress={handleBack}
                size="lg"
                px={8}
                borderRadius="lg"
              >
                Back
              </Button>
              <Button
                colorScheme={statusColorScheme}
                onPress={handleAction}
                size="lg"
                px={8}
                borderRadius="lg"
              >
                {getActionButtonLabel()}
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}

