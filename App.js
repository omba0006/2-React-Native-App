
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  StyleSheet,
  StatusBar,
  Platform,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import axios from "axios";
import UserAvatar from "react-native-user-avatar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons"; 

const App = () => {
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchUsers(10);
  }, []);

  const fetchUsers = async (count) => {
    try {
      const response = await axios.get(
        `https://random-data-api.com/api/v2/users?size=${count}`
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchOneUser = async () => {
    try {
      const response = await axios.get(
        `https://random-data-api.com/api/v2/users?size=1`
      );
      setUsers([response.data[0], ...users]);
    } catch (error) {
      console.error("Error fetching one user:", error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchUsers(10).finally(() => setRefreshing(false));
  };

  const renderItem = ({ item }) => {
    const isIOS = Platform.OS === "ios";
    return (
      <View style={styles.commentItem}>
        {}
        {!isIOS && <UserAvatar size={50} name={item.first_name} src={item.avatar} />}
        <View style={styles.nameContainer}>
          <Text style={styles.firstName}>{item.first_name}</Text>
          <Text style={styles.lastName}>{item.last_name}</Text>
        </View>
        {isIOS && <UserAvatar size={50} name={item.first_name} src={item.avatar} />}
      </View>
    );
  };

  const keyExtractor = (item) => item.id.toString();

  return (
    <SafeAreaProvider>
      <Text style={styles.text}>Welcome to the Home Page!</Text>
      <SafeAreaView style={{ flex: 1 }} edges={["right", "bottom", "left"]}>
        <StatusBar barStyle="light-content" />

        {}
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
        {}
        <TouchableOpacity style={styles.fab} onPress={fetchOneUser}>
          <Icon name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
   userItem: {
     padding: 10,
     alignItems: "center",
     justifyContent: "space-between",
     borderBottomWidth: 1,
     borderColor: "#ccc",
  },
  row: {
    flexDirection: "row",
  },
  rowReverse: {
   flexDirection: "row-reverse",
  },
  userInfo: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
  },
  avatar: {
   // padding: 20,
    marginLeft: 10,
  },
});

export default App;
