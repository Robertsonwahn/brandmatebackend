import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { API_ENDPOINTS } from '@/config/api';
import { useAuth } from '@/contexts/AuthContext';

const NameForm = () => {
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { user, token, isAuthenticated } = useAuth();

  const handleSubmit = async () => {
    if (!fullName.trim()) {
      setMessage('Please enter a valid name.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      // Add authentication token if user is logged in
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(API_ENDPOINTS.names, {
        method: 'POST',
        headers,
        body: JSON.stringify({ fullName: fullName.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Name saved successfully!');
        setFullName(''); // Clear the input
        Alert.alert('Success', 'Name saved successfully!');
      } else {
        setMessage(data.message || 'Error saving the name.');
        Alert.alert('Error', data.message || 'Error saving the name.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Network error. Please try again.');
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isAuthenticated && user ? (
        <Text style={styles.greeting}>Hello, {user.username}! 👋</Text>
      ) : null}
      <Text style={styles.title}>Enter Your Full Name</Text>
      
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Enter Full Name"
        placeholderTextColor="#999"
        editable={!isLoading}
      />

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Submit</Text>
        )}
      </TouchableOpacity>

      {message ? (
        <Text style={[
          styles.message,
          message.includes('successfully') ? styles.successMessage : styles.errorMessage
        ]}>
          {message}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
  },
  successMessage: {
    color: '#4CAF50',
  },
  errorMessage: {
    color: '#F44336',
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 15,
  },
});

export default NameForm;