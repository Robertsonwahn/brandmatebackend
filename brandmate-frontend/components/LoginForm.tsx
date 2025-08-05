import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useAuth } from "@/contexts/AuthContext";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [loginData, setLoginData] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { login } = useAuth();

  const handleLogin = async () => {
    if (!loginData.trim() || !password.trim()) {
      setMessage("Please enter username/email and password.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const result = await login(loginData.trim(), password);

      if (result.success) {
        setMessage("Login successful!");
        Alert.alert("Success", "Welcome back!");
        // Clear form
        setLoginData("");
        setPassword("");
      } else {
        setMessage(result.message);
        Alert.alert("Login Failed", result.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("An unexpected error occurred.");
      Alert.alert("Error", "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>

        <TextInput
          style={styles.input}
          value={loginData}
          onChangeText={setLoginData}
          placeholder="Username or Email"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
        />

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
        />

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        {message ? (
          <Text
            style={[
              styles.message,
              message.includes("successful")
                ? styles.successMessage
                : styles.errorMessage,
            ]}
          >
            {message}
          </Text>
        ) : null}

        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Don't have an account? </Text>
          <TouchableOpacity onPress={onSwitchToRegister} disabled={isLoading}>
            <Text style={styles.switchLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  formContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
    color: "#666",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  message: {
    textAlign: "center",
    fontSize: 14,
    marginBottom: 15,
  },
  successMessage: {
    color: "#4CAF50",
  },
  errorMessage: {
    color: "#F44336",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  switchText: {
    color: "#666",
    fontSize: 14,
  },
  switchLink: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default LoginForm;
