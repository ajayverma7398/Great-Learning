'use client';

import {
  Box,
  HStack,
  VStack,
  Text,
  Avatar,
  Pressable,
  useColorModeValue,
  Flex,
  Popover,
} from 'native-base';
import { ActivityType } from '@activity-platform/shared';
import { useState } from 'react';

interface TopNavBarProps {
  selectedType: ActivityType | 'all';
  onTypeChange: (type: ActivityType | 'all') => void;
}

export function TopNavBar({ selectedType, onTypeChange }: TopNavBarProps) {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const navBgColor = useColorModeValue('white', 'gray.800');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const activityTypeOptions: { label: string; value: ActivityType | 'all'; icon: string }[] = [
    { label: 'Online Class', value: 'online-class', icon: '📚' },
    { label: 'Assignment', value: 'assignment', icon: '📝' },
    { label: 'Quiz', value: 'quiz', icon: '📋' },
    { label: 'Discussion', value: 'discussion', icon: '💬' },
  ];

  return (
    <Box
      bg={navBgColor}
      borderBottomWidth={1}
      borderBottomColor={borderColor}
      shadow={2}
      position="sticky"
      top={0}
      zIndex={1000}
      safeAreaTop
    >
      <Box maxW="100%" px={{ base: 4, md: 6, lg: 8 }}>
        <Flex direction="row" alignItems="center" justifyContent="space-between" py={3} position="relative">
          <HStack space={2} alignItems="center">
            <Text fontSize="2xl">🎓</Text>
            <Text fontSize="xl" fontWeight="bold" color={textColor}>
              Great Learning
            </Text>
          </HStack>
          
          <HStack 
            space={2} 
            alignItems="center" 
            position="absolute"
            left="50%"
            style={{ transform: 'translateX(-50%)' }}
            overflowX="auto"
          >
            {activityTypeOptions.map((option) => {
              const isSelected = selectedType === option.value;
              return (
                <Pressable
                  key={option.value}
                  onPress={() => onTypeChange(option.value)}
                  px={{ base: 3, md: 4 }}
                  py={2}
                  borderRadius="md"
                  _hover={{ opacity: 0.7 }}
                  flexShrink={0}
                >
                  <Text
                    fontSize={{ base: 'xs', md: 'sm' }}
                    fontWeight={isSelected ? 'semibold' : 'normal'}
                    color={isSelected ? 'primary.600' : textColor}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </HStack>

          <HStack space={3} alignItems="center">
            <Popover
              isOpen={showUserMenu}
              onClose={() => setShowUserMenu(false)}
              trigger={(triggerProps) => {
                return (
                  <Pressable
                    {...triggerProps}
                    onPress={() => setShowUserMenu(true)}
                  >
                    <HStack space={2} alignItems="center">
                      <Avatar
                        bg="primary.500"
                        size="sm"
                        source={{
                          uri: 'https://i.pravatar.cc/150?img=12',
                        }}
                      >
                        JD
                      </Avatar>
                      <Text fontSize="sm" fontWeight="medium" color={textColor} display={{ base: 'none', md: 'flex' }}>
                        John Doe
                      </Text>
                      <Text fontSize="xs" color={useColorModeValue('gray.500', 'gray.400')}>
                        ▼
                      </Text>
                    </HStack>
                  </Pressable>
                );
              }}
            >
              <Popover.Content w="150px">
                <Popover.Body>
                  <VStack space={2}>
                    <Pressable onPress={() => setShowUserMenu(false)}>
                      <Text py={2}>Profile</Text>
                    </Pressable>
                    <Pressable onPress={() => setShowUserMenu(false)}>
                      <Text py={2}>Settings</Text>
                    </Pressable>
                    <Pressable onPress={() => setShowUserMenu(false)}>
                      <Text py={2}>Logout</Text>
                    </Pressable>
                  </VStack>
                </Popover.Body>
              </Popover.Content>
            </Popover>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
}

