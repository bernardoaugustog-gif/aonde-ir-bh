import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { iniciarBanco } from '../database/banco';
import { StatusBar } from 'expo-status-bar';


export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="aondeirbh.db" onInit={iniciarBanco}>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SQLiteProvider>
  );
}