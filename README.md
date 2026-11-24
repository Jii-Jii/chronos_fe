# Chronos Frontend

Frontend for **Chrono**, a mobile app that combines a calendar with booking and an AI assistant built with React Native and plan to use Expo for development and test environment.

## Tech stack

| Part | Choice |
|---|---|
| Cross-platform | React Native |
| Language | TypeScript |
| Screen Navigation | React Navigation |
| Calendar | React Native Calendar |
| Local event reminders | Expo Notifications |
| Design & Prototype | Figma |
| Backend API communication | Fetch API |

## Core Features

- **Hotel Booking:** Login & Registration, Forgot password & password recovery, Form validation, Authentication error messages, Loading indicators, User session management & logout
- **Calendar Interface:** Daily, weekly & full calendar views, View upcoming events, Add new, Edit and delete events, Display comfirmed restaurant bookings, Show scheduling conflict warnings, Automatic calendar synchronization for confirmed restaurant bookings
- **Restaurant Booking:** Search & browse restaurants, Filter by date, time, party size, and prices, View restaurant details and available time slots, Confirm restaurant reservations, Display booking status and confirmation details, Automatically add confirmed reservations to the calendar.
- **AI Assistance:** Interactive AI chat interface, Schedule inquiries & planning assistance, Calendar event creation, Restaurant search & booking assistance, User confirmation before executing actions

## Limitations

The current version of Chronos focuses on authentication, calendar and schedule management, AI assistance, and restaurant booking.

Restaurant bookings will use mock data to simulate reservation availability and confirmation during the initial development phase.

Hotel and flight booking functionalities are not included in the current development scope due to limitations in accessing real-time third-party booking APIs.

- **Hotel Booking:** Requires real-time hotel availability, room pricing, and reservation APIs.
- **Flight Booking:** Requires real-time flight schedules, ticket pricing, seat availability, and airline reservation APIs.
- **Restaurant Booking:** Uses mock data instead of live restaurant reservation services.

Hotel and flight booking may be integrated in future versions when suitable API access becomes available.

## Getting started

1. Clone the repository and run `npm install`.
2. After install, run the development server: `npx expo start`.
3. Once the development server is running, you can:
- Scan the QR code using Expo Go on your mobile device.
- Press a to open the Android emulator.
- Press i to open the iOS simulator (macOS only).
- Press w to open the web preview, if configured.
  
## Learn More

To learn more about the technologies used in this project, refer to the following resources:

- [React Native Documentation](https://reactnative.dev/docs/getting-started) – Learn about React Native features and APIs
- [React Navigation Documentation](https://reactnavigation.org/docs/getting-started/) – Learn about application navigation.
- [React Documentation](https://react.dev/) – Learn about React components, hooks, and state management.

## Authors

`Nang Lao Morn`, `Hsu Lei Hnin`





