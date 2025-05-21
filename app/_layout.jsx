import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useColorScheme } from "react-native"
import { Colors } from "../scr/constants/Colors"
import { PlantsProvider } from "../scr/contexts/PlantsContext"
import { UserProvider } from "../scr/contexts/UserContext"
import { logger } from '../scr/utils/logger'

export default function RootLayout() {
  logger.info('in file: ./app/_layout.jsx');
  logger.info('in function: RootLayout');

  const theme = useColorScheme(); // 'light' ou 'dark'
  const colorPalette = Colors[theme || 'light'];

  logger.info('Theme is: ', theme);
  logger.log('RootLayout screen rendered');
  logger.log('Wrapping with UserProvider and PlantsProvider');
  logger.log('Initializing Stack with auth, tabs and index screens');

  return (
    <UserProvider>
      <PlantsProvider>
        <StatusBar value="auto" />
        <Stack screenOptions={{
          headerStyle: { backgroundColor: colorPalette.background },
          headerTintColor: colorPalette.title,
        }}>
          {/* Groups */}
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          {/* Individual Screens */}
          <Stack.Screen name="index" options={{ headerShown: false, title: "Home" }} />

        </Stack>
      </PlantsProvider>
    </UserProvider>
  )
}
