import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Checkbox } from "react-native-paper";
import { scbaFormData } from "./data"; // Import mock data

const LandingScreen = ({ navigation }) => {
  const [scbaForms, setScbaForms] = useState([]);
  const [completedForms, setCompletedForms] = useState({});

  const fetchScbaForms = async () => {
    try {
      const response = await axios.get(`${baseEndpoint}/forms`);
      if (response.status === 200) {
        setScbaForms(response.data);
      } else {
        Alert.alert("Error", "Failed to fetch SCBA forms.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    // replace with API data
    setScbaForms(scbaFormData);
  }, []);

  const handleFormSelection = (formId) => {
    navigation.navigate("InspectionForm", { formId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Landing Screen</Text>

      {/* FlatList to display the list of forms */}
      <FlatList
        data={scbaForms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.formItem}>
            <TouchableOpacity
              style={styles.formName}
              onPress={() => handleFormSelection(item.id)}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>

            {/* View to wrap the checkbox with a border */}
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={completedForms[item.id] ? "checked" : "unchecked"}
                disabled // Disable checkbox since it's auto-checked based on completion status
              />
            </View>
          </View>
        )}
      />
    </View>
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
  formItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  formName: {
    flex: 1,
  },
  checkboxContainer: {
    padding: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
});

export default LandingScreen;
