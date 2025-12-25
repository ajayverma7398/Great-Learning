import { StatusBar } from 'expo-status-bar';
import { ActivityListing } from '../components/ActivityListing';
import { Box, useColorModeValue } from 'native-base';

export default function Home() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box flex={1} bg={bgColor} safeAreaTop>
      <StatusBar style="auto" />
      <ActivityListing />
    </Box>
  );
}

