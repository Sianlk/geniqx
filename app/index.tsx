// app/index.tsx — Expo Router entry (root redirect)
// GeniQX | Quantum intelligence meets AI
import { Redirect } from 'expo-router';
import { useAuthStore } from '../src/store/authStore';

export default function Index() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return <Redirect href={isAuthenticated ? '/(tabs)/' : '/(auth)/login'} />;
}
