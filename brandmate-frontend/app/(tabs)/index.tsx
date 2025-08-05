import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import NameForm from '@/components/NameForm';
import AuthScreen from '@/components/AuthScreen';
import UserProfile from '@/components/UserProfile';
import { useAuth } from '@/contexts/AuthContext';

export default function HomeScreen() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading spinner while checking authentication status
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <ThemedText style={styles.loadingText}>Loading...</ThemedText>
      </View>
    );
  }

  // Show authentication screen if user is not logged in
  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  // Show main app content if user is authenticated
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>BrandMate</ThemedText>
        <ThemedText style={styles.subtitle}>Save Your Name</ThemedText>
        
        <UserProfile />
        <NameForm />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 16,
    opacity: 0.7,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});
