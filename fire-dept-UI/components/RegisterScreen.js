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
import { baseEndpoint } from "../config/config";

const RegisterScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${baseEndpoint}/register`, data);

      if (response.status === 201) {
        Alert.alert("Success", "Registration successful.");
        navigation.navigate("Login");
      } else {
        Alert.alert("Registration failed", "Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register</Text>

      {/* Name field */}
      <Controller
        control={control}
        name="name"
        rules={{ required: true }}
        defaultValue=""
        render={({ field }) => (
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={field.onChange}
            value={field.value}
          />
        )}
      />
      {errors.name && <Text style={styles.errorText}>Name is required.</Text>}

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

      {/* Confirm Password field */}
      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          required: true,
          validate: (value) => value === control.getValues("password"),
        }}
        defaultValue=""
        render={({ field }) => (
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            onChangeText={field.onChange}
            value={field.value}
          />
        )}
      />
      {errors.confirmPassword && (
        <Text style={styles.errorText}>Passwords do not match.</Text>
      )}

      {/* Submit button */}
      <Button title="Register" onPress={handleSubmit(onSubmit)} />
      {/* Back to Login */}
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
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

export default RegisterScreen;
