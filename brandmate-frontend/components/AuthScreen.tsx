import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthScreen: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const switchToRegister = () => setIsLoginMode(false);
  const switchToLogin = () => setIsLoginMode(true);

  return (
    <View style={styles.container}>
      {isLoginMode ? (
        <LoginForm onSwitchToRegister={switchToRegister} />
      ) : (
        <RegisterForm onSwitchToLogin={switchToLogin} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default AuthScreen;