'use client';

import { useParams } from 'next/navigation';
import { mockActivities } from '@activity-platform/shared';
import { CourseDetails } from '../../../components/CourseDetails';
import { Box, Text, VStack, useColorModeValue } from 'native-base';

export default function CourseDetailPage() {
  const params = useParams();
  const activityId = params?.id as string;
  const activity = mockActivities.find((a) => a.id === activityId);

  const bgColor = useColorModeValue('gray.50', 'gray.900');

  if (!activity) {
    return (
      <Box minH="100vh" bg={bgColor} p={6}>
        <VStack space={4} alignItems="center" justifyContent="center" minH="50vh">
          <Text fontSize="xl" fontWeight="bold" color={useColorModeValue('gray.600', 'gray.400')}>
            Course not found
          </Text>
          <Text fontSize="md" color={useColorModeValue('gray.500', 'gray.500')}>
            The course you're looking for doesn't exist.
          </Text>
        </VStack>
      </Box>
    );
  }

  return <CourseDetails activity={activity} />;
}

