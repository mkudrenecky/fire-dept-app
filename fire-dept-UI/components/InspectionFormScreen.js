import React, { useEffect, useState } from "react";
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
import { Checkbox } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

const InspectionFormScreen = ({ navigation, route }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [userName, setUserName] = useState("Franny");

  const today = new Date();

  const { formId } = route.params;

  useEffect(() => {
    if (route.params && route.params.userName) {
      setUserName(route.params.userName);
    }
  }, [route.params]);

  const onSubmit = async (data) => {
    try {
      data.completed = true;
      const response = await axios.patch(
        `${baseEndpoint}/scba_forms/${formId}/`,
        data
      );

      if (response.status === 201) {
        Alert.alert("Success", "Form submitted successfully.");
        navigation.navigate("Landing");
      } else {
        Alert.alert("Submission failed", "Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>SCBA Inspection Form</Text>
      {/* Name field */}
      <Text style={styles.label}>Name</Text>
      <Controller
        control={control}
        name="name"
        defaultValue={userName}
        render={({ field }) => (
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={field.value}
            editable={false} // Disable editing as the name should be auto-filled
          />
        )}
      />
      {/* SCBA unit number field with default value from route.params */}
      <Text style={styles.label}>Unit Number</Text>
      <Controller
        control={control}
        name="scbaUnitNumber"
        defaultValue={formId}
        rules={{ required: true, pattern: /^[0-9]+$/ }} // Validation rules
        render={({ field }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="SCBA Unit Number"
              keyboardType="numeric"
              onChangeText={field.onChange}
              value={field.value}
              editable={false} // Disable editing as the SCBA unit number should be auto-filled
            />
            {errors.scbaUnitNumber && (
              <Text style={styles.errorText}>
                Please enter a valid SCBA unit number (numbers only).
              </Text>
            )}
          </View>
        )}
      />
      {/* Date field with date picker */}
      <Text style={styles.label}>Date</Text>
      <Controller
        control={control}
        name="date"
        defaultValue={today}
        render={({ field }) => (
          <View>
            <Text style={styles.input}>{field.value.toLocaleDateString()}</Text>
          </View>
        )}
      />
      {/* Checkboxes for inspection criteria */}
      {/* Man down siren working */}
      <Text style={styles.label}>Checklist:</Text>
      <Controller
        control={control}
        name="manDownSirenWorking"
        defaultValue={false}
        render={({ field }) => (
          <View style={styles.checkboxContainer}>
            <View style={styles.checkboxWrapper}>
              <Checkbox
                status={field.value ? "checked" : "unchecked"}
                onPress={() => field.onChange(!field.value)}
              />
            </View>
            <Text style={styles.checkboxLabel}>Man down siren working?</Text>
          </View>
        )}
      />
      {/* Do the lights work? */}
      <Controller
        control={control}
        name="lightsWorking"
        defaultValue={false}
        render={({ field }) => (
          <View style={styles.checkboxContainer}>
            <View style={styles.checkboxWrapper}>
              <Checkbox
                status={field.value ? "checked" : "unchecked"}
                onPress={() => field.onChange(!field.value)}
              />
            </View>
            <Text style={styles.checkboxLabel}>Do the lights work?</Text>
          </View>
        )}
      />
      {/* Is the bottle full? */}
      <Controller
        control={control}
        name="bottleFull"
        defaultValue={false}
        render={({ field }) => (
          <View style={styles.checkboxContainer}>
            <View style={styles.checkboxWrapper}>
              <Checkbox
                status={field.value ? "checked" : "unchecked"}
                onPress={() => field.onChange(!field.value)}
              />
            </View>
            <Text style={styles.checkboxLabel}>Is the bottle full?</Text>
          </View>
        )}
      />
      {/* Are the straps extended? */}
      <Controller
        control={control}
        name="strapsExtended"
        defaultValue={false}
        render={({ field }) => (
          <View style={styles.checkboxContainer}>
            <View style={styles.checkboxWrapper}>
              <Checkbox
                status={field.value ? "checked" : "unchecked"}
                onPress={() => field.onChange(!field.value)}
              />
            </View>
            <Text style={styles.checkboxLabel}>Are the straps extended?</Text>
          </View>
        )}
      />
      {/* Clean */}
      <Controller
        control={control}
        name="clean"
        defaultValue={false}
        render={({ field }) => (
          <View style={styles.checkboxContainer}>
            <View style={styles.checkboxWrapper}>
              <Checkbox
                status={field.value ? "checked" : "unchecked"}
                onPress={() => field.onChange(!field.value)}
              />
            </View>
            <Text style={styles.checkboxLabel}>Clean</Text>
          </View>
        )}
      />
      {/* Damage */}
      <Controller
        control={control}
        name="damage"
        defaultValue={false}
        render={({ field }) => (
          <View style={styles.checkboxContainer}>
            <View style={styles.checkboxWrapper}>
              <Checkbox
                status={field.value ? "checked" : "unchecked"}
                onPress={() => field.onChange(!field.value)}
              />
            </View>
            <Text style={styles.checkboxLabel}>Damage</Text>
          </View>
        )}
      />
      {/* Submit button */}
      <Button title="Submit Form" onPress={handleSubmit(onSubmit)} />
      <Button title="Back" onPress={() => navigation.navigate("Landing")} />
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 5,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  datePickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default InspectionFormScreen;
