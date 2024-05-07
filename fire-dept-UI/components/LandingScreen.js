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
import { baseEndpoint } from "../config/config";

const LandingScreen = ({ navigation }) => {
  const [scbaForms, setScbaForms] = useState([]);
  const [completedForms, setCompletedForms] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchScbaForms = async () => {
    try {
      const response = await axios.get(`${baseEndpoint}/scba_forms`);
      if (response.status === 200) {
        console.log("API Response:", response.data);
        setScbaForms(response.data.data);
      } else {
        console.log("Failed to fetch SCBA forms");
        Alert.alert("Error", "Failed to fetch SCBA forms.");
      }
    } catch (error) {
      console.error("Error fetching SCBA forms:", error);
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // replace with API data
    fetchScbaForms();
  }, []);

  useEffect(() => {
    console.log("Updated scbaForms state:", scbaForms);
  }, [scbaForms]);

  const handleFormSelection = (formId) => {
    navigation.navigate("InspectionForm", { formId });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

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
              <Text>SCBA {item.unit_number}</Text>
            </TouchableOpacity>

            {/* View to wrap the checkbox with a border */}
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={item.complete ? "checked" : "unchecked"}
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
