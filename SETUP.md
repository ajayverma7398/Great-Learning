# Setup Instructions

## Prerequisites

1. **Node.js**: Install Node.js 18 or higher from [nodejs.org](https://nodejs.org/)
2. **npm or yarn**: Comes with Node.js
3. **For Mobile Development**:
   - **Android**: Install [Android Studio](https://developer.android.com/studio) and set up Android SDK
   - **iOS** (Mac only): Install [Xcode](https://developer.apple.com/xcode/) from App Store

## Installation Steps

### 1. Install Dependencies

From the root directory, run:

```bash
npm install --legacy-peer-deps
```

**Note**: We use `--legacy-peer-deps` to handle peer dependency conflicts between React versions. This is safe for this project.

This will install dependencies for all workspaces (web, mobile, shared).

### 2. Running the Web Application

Navigate to the web directory and start the development server:

```bash
npm run dev:web
```

Or from the root:

```bash
cd web
npm run dev
```

The application will be available at `http://localhost:3000`

### 3. Running the Mobile Application

#### Option A: Using Expo Go (Recommended for Testing)

1. Install Expo Go app on your phone:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Start the Expo development server:

```bash
npm run dev:mobile
```

Or from the root:

```bash
cd mobile
npm start
```

3. Scan the QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

#### Option B: Using Android Emulator

1. Start an Android emulator from Android Studio
2. Run:

```bash
npm run build:mobile:android
```

Or:

```bash
cd mobile
npm run android
```

#### Option C: Using iOS Simulator (Mac only)

1. Open iOS Simulator from Xcode
2. Run:

```bash
npm run build:mobile:ios
```

Or:

```bash
cd mobile
npm run ios
```

## Building for Production

### Web

```bash
npm run build:web
npm run start:web
```

### Mobile - Android APK

```bash
cd mobile
eas build --platform android
```

### Mobile - iOS

```bash
cd mobile
eas build --platform ios
```

Note: For production builds, you may need to set up [Expo Application Services (EAS)](https://expo.dev/eas).

## Troubleshooting

### Common Issues

1. **Port 3000 already in use**:
   - Change the port: `npm run dev:web -- -p 3001`

2. **Metro bundler issues**:
   - Clear cache: `cd mobile && npm start -- --reset-cache`

3. **NativeBase not working on web**:
   - Ensure `react-native-web` is installed
   - Check `next.config.js` for proper webpack configuration

4. **TypeScript errors**:
   - Run `npm install` in each workspace
   - Check that shared package is properly linked

5. **Mobile app not connecting**:
   - Ensure your phone and computer are on the same network
   - Try using tunnel mode: `npm start -- --tunnel`

## Development Tips

- Use `npm run lint` to check for code issues
- Use `npm test` to run tests
- The shared package is automatically linked via workspaces
- Hot reload is enabled by default for both web and mobile

