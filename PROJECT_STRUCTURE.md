# Project Structure

```
activity-listing-platform/
├── web/                          # Next.js Web Application
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # Root layout with providers
│   │   ├── page.tsx             # Home page
│   │   ├── providers.tsx        # NativeBase provider (client component)
│   │   └── globals.css          # Global styles
│   ├── components/              # Web-specific components
│   │   ├── ActivityListing.tsx  # Main listing component with filters
│   │   └── ActivityCard.tsx     # Individual activity card
│   ├── __tests__/               # Web tests
│   ├── theme.ts                 # NativeBase theme configuration
│   ├── next.config.js          # Next.js configuration
│   ├── tsconfig.json            # TypeScript config
│   ├── jest.config.js          # Jest test config
│   └── package.json            # Web dependencies
│
├── mobile/                       # Expo/React Native Mobile Application
│   ├── app/                     # Expo Router
│   │   ├── _layout.tsx          # Root layout
│   │   └── index.tsx           # Home screen
│   ├── components/              # Mobile-specific components
│   │   ├── ActivityListing.tsx  # Main listing component
│   │   └── ActivityCard.tsx     # Individual activity card
│   ├── __tests__/               # Mobile tests
│   ├── assets/                  # App icons and splash screens
│   ├── theme.ts                 # NativeBase theme configuration
│   ├── app.json                 # Expo configuration
│   ├── babel.config.js          # Babel configuration
│   ├── metro.config.js          # Metro bundler config
│   ├── tsconfig.json            # TypeScript config
│   ├── jest.config.js          # Jest test config
│   └── package.json             # Mobile dependencies
│
├── shared/                       # Shared Code (Web & Mobile)
│   ├── src/
│   │   ├── types/               # TypeScript type definitions
│   │   │   └── activity.ts     # Activity types and interfaces
│   │   ├── utils/               # Utility functions
│   │   │   └── activityUtils.ts # Activity helper functions
│   │   ├── data/                # Mock data
│   │   │   └── mockActivities.ts # Sample activity data
│   │   ├── __tests__/           # Shared tests
│   │   └── index.ts            # Public API exports
│   ├── tsconfig.json            # TypeScript config
│   ├── jest.config.js          # Jest test config
│   └── package.json             # Shared dependencies
│
├── package.json                  # Root package.json (workspaces)
├── README.md                    # Main documentation
├── SETUP.md                     # Detailed setup instructions
├── QUICKSTART.md                # Quick start guide
└── .gitignore                   # Git ignore rules
```

## Key Files Explained

### Web Application
- **`web/app/page.tsx`**: Main page component with header and activity listing
- **`web/components/ActivityListing.tsx`**: Filterable and sortable activity list
- **`web/components/ActivityCard.tsx`**: Individual activity display with all details

### Mobile Application
- **`mobile/app/index.tsx`**: Main screen entry point
- **`mobile/components/ActivityListing.tsx`**: Mobile-optimized activity listing
- **`mobile/components/ActivityCard.tsx`**: Mobile-optimized activity card

### Shared Code
- **`shared/src/types/activity.ts`**: Type definitions for activities
- **`shared/src/utils/activityUtils.ts`**: Reusable utility functions
- **`shared/src/data/mockActivities.ts`**: Mock data for development

## Code Sharing Strategy

1. **Types**: All TypeScript interfaces are in `shared/src/types/`
2. **Utilities**: Business logic functions in `shared/src/utils/`
3. **Data**: Mock data in `shared/src/data/`
4. **Components**: Platform-specific implementations that share the same interface
5. **Theme**: Separate theme files but with same configuration structure

## Platform Differences

- **Navigation**: Web uses Next.js routing, Mobile uses Expo Router
- **Styling**: Both use NativeBase, but some responsive adjustments may differ
- **Interaction**: Web uses onClick, Mobile uses onPress
- **Alerts**: Web uses `alert()`, Mobile uses `Alert.alert()`

