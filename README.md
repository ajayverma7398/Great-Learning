# Great Learning - Activity Listing Platform

A comprehensive, responsive Activity Listing Platform for an online learning management system. Built with Next.js (web) and React Native/Expo (mobile), featuring cross-platform code sharing, advanced filtering, pagination, and a modern UI.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Components](#components)
- [Testing](#testing)
- [API & Data](#api--data)
- [Routing & Navigation](#routing--navigation)
- [Styling & Design System](#styling--design-system)
- [Performance](#performance)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🎯 Overview

This platform provides a complete solution for managing and viewing learning activities including online classes, assignments, quizzes, and discussions. The application features:

- **12 Dummy Courses** with comprehensive details
- **Advanced Filtering** by type, status, and search
- **Pagination** (5 courses per page)
- **Course Details Pages** with full information
- **Responsive Design** for all screen sizes
- **Cross-Platform** support (Web & Mobile)
- **Comprehensive Test Coverage**

## ✨ Features

### Core Functionality

- ✅ **Activity Listing** - Scrollable list with 5 activities per page
- ✅ **Pagination** - Navigate through multiple pages of activities
- ✅ **Advanced Filtering**:
  - Filter by activity type (Online Class, Assignment, Quiz, Discussion)
  - Filter by status (All, Completed, Incomplete, Due, Overdue, Upcoming)
  - Search by title, course name, or program name
- ✅ **Sorting Options**:
  - Date (Oldest First / Newest First)
  - Title (A-Z / Z-A)
- ✅ **Course Details Page** - Full course information with navigation
- ✅ **Navigation**:
  - Top navigation bar with activity type filters
  - Left sidebar with course status filters
  - User profile dropdown
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Light/Dark Mode** - System-aware theme switching

### Activity Types

1. **Online Class** - Live or recorded learning sessions
   - Live session indicators
   - Meeting links for live classes
   - Recording URLs for recorded classes
   - Instructor information

2. **Assignment** - Course assignments
   - Due dates
   - Max scores
   - Progress tracking

3. **Quiz** - Assessment quizzes
   - Time limits
   - Max scores
   - User scores (when completed)

4. **Discussion** - Forum discussions
   - Due dates
   - Participation tracking

### Activity Statuses

- **Upcoming** - Scheduled activities
- **In Progress** - Activities currently being worked on
- **Completed** - Finished activities with scores
- **Overdue** - Past due date activities
- **Incomplete** - Combined in-progress and overdue

## 🛠️ Tech Stack

### Web Application
- **Next.js 14** - React framework with App Router
- **TypeScript 5.3.0** - Type safety
- **NativeBase 3.4.28** - Universal design system
- **React 18.2.0** - UI library
- **React Native Web 0.19.9** - React Native components for web

### Mobile Application
- **Expo ~50.0.0** - React Native framework
- **React Native 0.73.2** - Mobile framework
- **Expo Router ~3.4.0** - File-based routing
- **NativeBase 3.4.28** - Universal design system

### Shared Code
- **TypeScript 5.3.0** - Shared types and utilities
- **Jest 29.7.0** - Testing framework

### Development Tools
- **Jest** - Test runner
- **Testing Library** - Component testing
- **ESLint** - Code linting
- **TypeScript** - Type checking

## 🏗️ Architecture

### Monorepo Structure

The project uses NPM workspaces to manage multiple packages:

```
activity-listing-platform/
├── web/          # Next.js web application
├── mobile/       # Expo/React Native mobile application
└── shared/       # Shared code (types, utilities, data)
```

### Code Sharing Strategy

1. **Shared Types** (`shared/src/types/`) - TypeScript interfaces
2. **Shared Utilities** (`shared/src/utils/`) - Business logic functions
3. **Shared Data** (`shared/src/data/`) - Mock data
4. **Platform-Specific Components** - Same interface, different implementations

## 📁 Project Structure

```
.
├── web/                          # Next.js Web Application
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # Root layout with providers
│   │   ├── page.tsx             # Home page with sidebar and content
│   │   ├── course/[id]/         # Dynamic course details pages
│   │   │   └── page.tsx         # Course details page
│   │   ├── providers.tsx        # NativeBase provider
│   │   └── globals.css          # Global styles
│   ├── components/              # Web-specific components
│   │   ├── ActivityListing.tsx  # Main listing with filters & pagination
│   │   ├── ActivityCard.tsx     # Individual activity card
│   │   ├── CourseDetails.tsx    # Course details component
│   │   ├── TopNavBar.tsx        # Top navigation bar
│   │   ├── CourseSidebar.tsx    # Left sidebar with status filters
│   │   └── LeftSidebar.tsx      # Alternative sidebar (legacy)
│   ├── __tests__/               # Web component tests
│   │   ├── ActivityListing.test.tsx
│   │   ├── ActivityCard.test.tsx
│   │   ├── CourseDetails.test.tsx
│   │   ├── TopNavBar.test.tsx
│   │   └── CourseSidebar.test.tsx
│   ├── theme.ts                 # NativeBase theme configuration
│   ├── next.config.js           # Next.js configuration
│   ├── jest.config.js           # Jest test configuration
│   ├── jest.setup.js            # Jest setup file
│   └── package.json             # Web dependencies
│
├── mobile/                       # Expo/React Native Mobile Application
│   ├── app/                     # Expo Router
│   │   ├── _layout.tsx          # Root layout
│   │   └── index.tsx            # Home screen
│   ├── components/              # Mobile-specific components
│   │   ├── ActivityListing.tsx  # Mobile activity listing
│   │   └── ActivityCard.tsx     # Mobile activity card
│   ├── __tests__/               # Mobile tests
│   ├── assets/                  # App icons and splash screens
│   ├── theme.ts                 # NativeBase theme configuration
│   ├── app.json                 # Expo configuration
│   ├── babel.config.js          # Babel configuration
│   ├── metro.config.js          # Metro bundler config
│   └── package.json             # Mobile dependencies
│
├── shared/                       # Shared Code (Web & Mobile)
│   ├── src/
│   │   ├── types/               # TypeScript type definitions
│   │   │   └── activity.ts      # Activity types and interfaces
│   │   ├── utils/               # Utility functions
│   │   │   └── activityUtils.ts # Activity helper functions
│   │   ├── data/                # Mock data
│   │   │   └── mockActivities.ts # 12 sample activities
│   │   ├── __tests__/           # Shared utility tests
│   │   │   ├── activityUtils.test.ts
│   │   │   └── activityUtils.comprehensive.test.ts
│   │   └── index.ts             # Public API exports
│   ├── tsconfig.json            # TypeScript config
│   ├── jest.config.js           # Jest test config
│   └── package.json             # Shared dependencies
│
├── package.json                  # Root package.json (workspaces)
├── README.md                     # This file
├── SETUP.md                      # Detailed setup instructions
├── QUICKSTART.md                 # Quick start guide
├── PROJECT_STRUCTURE.md          # Project structure details
└── IMPLEMENTATION_SUMMARY.md     # Implementation summary
```

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** and npm
- For mobile development:
  - **iOS**: Xcode (Mac only)
  - **Android**: Android Studio with Android SDK

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "Great Learning"
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

**Note**: We use `--legacy-peer-deps` to handle peer dependency conflicts between React versions used by Next.js and Expo. This is safe and commonly used in monorepo setups.

This will install dependencies for all workspaces (web, mobile, shared).

### Running the Application

#### Web Application (localhost)

```bash
npm run dev:web
```

The application will be available at `http://localhost:3000`

**Features available:**
- Top navigation bar with activity type filters
- Left sidebar with course status filters
- Search and sort functionality
- Pagination (5 courses per page)
- Click any course to view details

#### Mobile Application

**Android:**
```bash
npm run dev:mobile
```
Press `a` to open on Android emulator, or scan QR code with Expo Go app.

**iOS:**
```bash
npm run dev:mobile
```
Press `i` to open on iOS simulator, or scan QR code with Expo Go app.

### Building for Production

#### Web
```bash
npm run build:web
npm run start:web
```

#### Mobile - Android
```bash
npm run build:mobile:android
```

#### Mobile - iOS
```bash
npm run build:mobile:ios
```

## 🧩 Components

### Web Components

#### `TopNavBar`
- **Location**: `web/components/TopNavBar.tsx`
- **Purpose**: Top navigation bar with activity type filters and user profile
- **Features**:
  - Logo display
  - Activity type navigation (Online Class, Assignment, Quiz, Discussion)
  - User profile with dropdown menu
  - Centered navigation items

#### `CourseSidebar`
- **Location**: `web/components/CourseSidebar.tsx`
- **Purpose**: Left sidebar for filtering courses by status
- **Features**:
  - All Courses
  - Completed Courses
  - Incomplete Courses
  - Due
  - Overdue
  - Upcoming
  - Activity count badges
  - Selected state highlighting

#### `ActivityListing`
- **Location**: `web/components/ActivityListing.tsx`
- **Purpose**: Main listing component with filters, sorting, and pagination
- **Features**:
  - Search functionality
  - Sort dropdown (Date/Title, Ascending/Descending)
  - Clear filters button
  - Pagination (5 items per page)
  - Results count display
  - Activity count calculation

#### `ActivityCard`
- **Location**: `web/components/ActivityCard.tsx`
- **Purpose**: Individual activity card display
- **Features**:
  - Activity title and type badge
  - Status badge with color coding
  - Course and program information
  - Schedule information (date, time, duration)
  - Due dates
  - Instructor information
  - Progress bars
  - Score information
  - Live/Recorded indicators
  - Action buttons (Start/Continue/Review/Join Now)
  - Clickable card navigation to details page

#### `CourseDetails`
- **Location**: `web/components/CourseDetails.tsx`
- **Purpose**: Detailed course information page
- **Features**:
  - Back button navigation
  - Complete course information
  - Schedule details
  - Additional information (instructor, live/recorded)
  - Assessment details (scores)
  - Progress display
  - Description
  - Action buttons

### Shared Components

#### Activity Types (`shared/src/types/activity.ts`)
- `ActivityType`: 'online-class' | 'assignment' | 'quiz' | 'discussion'
- `ActivityStatus`: 'upcoming' | 'in-progress' | 'completed' | 'overdue'
- `Activity`: Complete activity interface
- `ActivityFilters`: Filter options interface
- `ActivitySortOption`: Sort option types

#### Utility Functions (`shared/src/utils/activityUtils.ts`)
- `getActivityTypeLabel()` - Get human-readable type label
- `getActivityStatusLabel()` - Get human-readable status label
- `getActivityStatusColor()` - Get color scheme for status
- `getActionButtonLabel()` - Get appropriate button label
- `filterActivities()` - Filter activities by criteria
- `sortActivities()` - Sort activities by option
- `formatDate()` - Format date string
- `formatTime()` - Format time string (24h to 12h)
- `formatDuration()` - Format duration in minutes

## 🧪 Testing

### Test Coverage

The project includes comprehensive test coverage for:

- ✅ Component rendering
- ✅ User interactions
- ✅ Filtering functionality
- ✅ Sorting functionality
- ✅ Pagination
- ✅ Navigation
- ✅ Utility functions
- ✅ Edge cases

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test ActivityListing
npm test ActivityCard
npm test CourseDetails
```

### Test Files

#### Web Component Tests
- `web/__tests__/ActivityListing.test.tsx` - Listing component tests
- `web/__tests__/ActivityCard.test.tsx` - Card component tests
- `web/__tests__/CourseDetails.test.tsx` - Details page tests
- `web/__tests__/TopNavBar.test.tsx` - Navigation bar tests
- `web/__tests__/CourseSidebar.test.tsx` - Sidebar tests

#### Shared Utility Tests
- `shared/src/__tests__/activityUtils.test.ts` - Basic utility tests
- `shared/src/__tests__/activityUtils.comprehensive.test.ts` - Comprehensive utility tests

### Test Scenarios Covered

1. **Component Rendering**
   - All elements render correctly
   - Proper text content
   - Correct badges and indicators

2. **User Interactions**
   - Button clicks
   - Input changes
   - Navigation actions
   - Filter selections

3. **Functionality**
   - Filtering by type, status, search
   - Sorting by date and title
   - Pagination navigation
   - Activity count calculations

4. **Edge Cases**
   - Empty states
   - No results
   - Boundary conditions
   - Missing data handling

## 📊 API & Data

### Mock Data

The application includes **12 sample activities** in `shared/src/data/mockActivities.ts`:

- **4 Online Classes** (2 live, 2 recorded)
- **4 Assignments**
- **2 Quizzes**
- **2 Discussions**

### Activity Status Distribution

- **Upcoming**: 5 activities
- **In Progress**: 3 activities
- **Completed**: 3 activities
- **Overdue**: 1 activity

### Data Structure

```typescript
interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  courseName: string;
  programName: string;
  scheduledDate: string;
  scheduledTime?: string;
  duration?: number;
  status: ActivityStatus;
  progress?: number;
  description?: string;
  instructor?: string;
  dueDate?: string;
  maxScore?: number;
  score?: number;
  isLive?: boolean;
  recordingUrl?: string;
  meetingLink?: string;
}
```

## 🧭 Routing & Navigation

### Web Routing (Next.js App Router)

- **`/`** - Home page with activity listing
- **`/course/[id]`** - Course details page (dynamic route)

### Navigation Flow

1. **Home Page** → View all activities with filters
2. **Click Activity Card** → Navigate to course details
3. **Click Action Button** → Navigate to course details
4. **Back Button** → Return to home page

### Mobile Routing (Expo Router)

- **`/`** - Home screen with activity listing
- File-based routing structure

## 🎨 Styling & Design System

### NativeBase Theme

The project uses NativeBase for consistent styling across platforms:

- **Primary Colors**: Blue palette
- **Status Colors**:
  - Upcoming: Blue
  - In Progress: Orange
  - Completed: Green
  - Overdue: Red
- **Type Colors**:
  - Online Class: Purple
  - Assignment: Orange
  - Quiz: Primary (Blue)
  - Discussion: Emerald

### Responsive Design

- **Desktop**: Full layout with sidebar and content
- **Tablet**: Responsive layout adjustments
- **Mobile**: Stacked layout, hidden sidebar

### Dark Mode Support

- System-aware theme switching
- Manual toggle option
- Consistent color schemes

## ⚡ Performance

### Optimizations

- **React.useMemo** - Memoized filtering and sorting
- **React.useCallback** - Optimized event handlers
- **Pagination** - Only render 5 items per page
- **Code Splitting** - Next.js automatic code splitting
- **Lazy Loading** - Dynamic imports where applicable

### Bundle Size

- Web: Optimized with Next.js
- Mobile: Optimized with Expo
- Shared: Minimal dependencies

## 🚢 Deployment

### Web Deployment

1. Build the application:
```bash
npm run build:web
```

2. Start production server:
```bash
npm run start:web
```

3. Deploy to platforms like:
   - Vercel (recommended for Next.js)
   - Netlify
   - AWS Amplify
   - Any Node.js hosting

### Mobile Deployment

#### Android
```bash
npm run build:mobile:android
```

#### iOS
```bash
npm run build:mobile:ios
```

Deploy via:
- Google Play Store (Android)
- Apple App Store (iOS)
- Expo Application Services (EAS)

## 📝 Available Scripts

### Root Level
- `npm run dev:web` - Start web development server
- `npm run dev:mobile` - Start mobile development server
- `npm run build:web` - Build web for production
- `npm run build:mobile:android` - Build Android app
- `npm run build:mobile:ios` - Build iOS app
- `npm test` - Run all tests
- `npm run lint` - Lint all workspaces

### Web Specific
- `cd web && npm run dev` - Start Next.js dev server
- `cd web && npm run build` - Build Next.js app
- `cd web && npm run start` - Start production server
- `cd web && npm test` - Run web tests

### Mobile Specific
- `cd mobile && npm start` - Start Expo dev server
- `cd mobile && npm run android` - Run on Android
- `cd mobile && npm run ios` - Run on iOS
- `cd mobile && npm test` - Run mobile tests

## 🔧 Configuration

### Next.js Config (`web/next.config.js`)
- React Strict Mode enabled
- Transpilation for NativeBase packages
- Webpack aliases for React Native Web

### TypeScript Config
- Strict mode enabled
- Path aliases configured
- Shared type definitions

### Jest Config
- JSDOM environment for web
- React Native environment for mobile
- Module name mapping for shared code

## 🐛 Troubleshooting

### Common Issues

1. **Peer Dependency Warnings**
   - Solution: Use `--legacy-peer-deps` flag

2. **Port Already in Use**
   - Solution: Change port in `package.json` or kill process

3. **Module Not Found**
   - Solution: Run `npm install` in root directory

4. **TypeScript Errors**
   - Solution: Ensure all dependencies are installed

## 🚧 Future Enhancements

- [ ] API Integration - Replace mock data with real API
- [ ] Authentication - User login and authorization
- [ ] State Management - Redux/Zustand for global state
- [ ] Offline Support - Data caching and sync
- [ ] Push Notifications - Activity reminders
- [ ] Calendar View - Visual calendar for activities
- [ ] Bookmarks - Save favorite activities
- [ ] Analytics - User behavior tracking
- [ ] Infinite Scroll - Alternative to pagination
- [ ] Advanced Filters - Date range picker
- [ ] Export Data - CSV/PDF export
- [ ] Accessibility - Enhanced ARIA labels
- [ ] Performance - Further optimizations
- [ ] Testing - Increase coverage to 90%+

## 📄 License

MIT

## 👥 Contributing

This is a project submission. For questions or issues, please refer to the repository.

## 📚 Additional Documentation

- **SETUP.md** - Detailed setup instructions
- **QUICKSTART.md** - Quick start guide
- **PROJECT_STRUCTURE.md** - Project structure details
- **IMPLEMENTATION_SUMMARY.md** - Implementation summary

## 🎓 Key Features Summary

✅ **12 Dummy Courses** with full details  
✅ **Pagination** - 5 courses per page  
✅ **Advanced Filtering** - Type, status, search  
✅ **Sorting** - Date and title sorting  
✅ **Course Details Pages** - Full information display  
✅ **Navigation** - Top nav bar and left sidebar  
✅ **Responsive Design** - Works on all devices  
✅ **Comprehensive Testing** - Full test coverage  
✅ **Cross-Platform** - Web and mobile support  
✅ **Type Safety** - Full TypeScript implementation  

---

**Built with ❤️ using Next.js, React Native, and NativeBase**
