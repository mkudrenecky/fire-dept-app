import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

const LoginScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${baseEndpoint}/login`, data);

      if (response.status === 200) {
        Alert.alert("Success", "Login successful.");
      } else {
        Alert.alert("Login failed", "Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Email field */}
      <Controller
        control={control}
        name="email"
        rules={{ required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
        defaultValue=""
        render={({ field }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={field.onChange}
            value={field.value}
          />
        )}
      />
      {errors.email && (
        <Text style={styles.errorText}>Valid email is required.</Text>
      )}

      {/* Password field */}
      <Controller
        control={control}
        name="password"
        rules={{ required: true, minLength: 6 }}
        defaultValue=""
        render={({ field }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={field.onChange}
            value={field.value}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>
          Password must be at least 6 characters long.
        </Text>
      )}

      {/* Login button */}
      <Button title="Login" onPress={handleSubmit(onSubmit)} />

      {/* Register button */}
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
      {/* Skip Button */}
      <Button title="Skip" onPress={() => navigation.navigate("Landing")} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default LoginScreen;
