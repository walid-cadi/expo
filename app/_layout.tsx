import { Slot, Stack, useSegments } from "expo-router";
import "../global.css";
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
import * as SecureStore from "expo-secure-store";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  // if (!loaded) {
  //   return null;
  // }

  const tokenCache = {
    async getToken(key: string) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };

  // const InitialLayouts = () => {
  //   const {isLoaded,isSignedIn} = useAuth();
  //   const segments = useSegments();
  //   const router = useRoute();

  //   useEffect(() => {
  //     if (!isLoaded) return;

  //     const inTabsGroup = segments[0] === '(tabs)';

  //     console.log('isSignedIn', isSignedIn)
  //   }, [isSignedIn])

  //   return <Slot/>;
  // }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      </GestureHandlerRootView>
  )
}
