# SharkEyeCV 🦈

SharkEyeCV is an educational mobile application designed to teach users about shark identification and marine conservation through interactive learning experiences and computer vision technology.

## Features

- Interactive learning modules about shark identification
- Computer vision-assisted shark recognition games
- Educational content about marine conservation
- Progressive learning path with multiple chapters
- Cross-platform support (iOS, Android, Web)

## Tech Stack

- [Expo](https://expo.dev) - React Native framework
- [React Navigation](https://reactnavigation.org/) - Navigation system
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based routing
- TypeScript - Type safety and developer experience
- Various Expo modules for native functionality

## Prerequisites

- Node.js (LTS version recommended)
- npm, yarn, or pnpm
- Expo CLI
- iOS Simulator (for iOS development) (WIP)
- Android Studio (for Android development) (WIP)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/SharkEyeCV.git
   cd SharkEyeCV
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. Choose your platform:
   - Press 'i' for iOS simulator
   - Press 'a' for Android emulator
   - Press 'w' for web browser

## Project Structure

```
SharkEyeCV/
├── app/                   # Main application screens
├── assets/               # Static assets (images, fonts)
├── components/           # Reusable React components
├── constants/            # App-wide constants
├── hooks/               # Custom React hooks
└── scripts/             # Utility scripts
```

## Development

- The app uses file-based routing through Expo Router
- Screens are located in the `app` directory
- Components are organized by feature in the `components` directory
- Custom hooks are in the `hooks` directory

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- Thanks to all contributors and especially Benioff Ocean Science Labratory
- Built with [Expo](https://expo.dev)

## Disclaimer

- At its current state, SharkEyeCV is only compatible on a 13 inch laptop