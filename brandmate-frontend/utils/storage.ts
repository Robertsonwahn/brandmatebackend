import { Platform } from 'react-native';

// Cross-platform storage utility
class Storage {
  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
    } else {
      // For mobile, we'll use a simple approach for now
      // In a real app, you'd use SecureStore here
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(key, value);
      }
    }
  }

  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    } else {
      // For mobile, we'll use a simple approach for now
      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem(key);
      }
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
    } else {
      // For mobile, we'll use a simple approach for now
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(key);
      }
    }
  }
}

export const storage = new Storage();