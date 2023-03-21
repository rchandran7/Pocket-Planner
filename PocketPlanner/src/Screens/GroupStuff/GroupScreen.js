import React, { useState, useEffect, useContext } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createGroup, createUserGroup } from '../../graphql/mutations';
import { getGroup, userGroupsByUserId } from '../../graphql/queries';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GroupScreen() {
  
  const navigation = useNavigation();

  const handleGroupScreen = () => {
    navigation.navigate("CreateGroupScreen");
  }
  const handleJoinScreen = () => {
    navigation.navigate("JoinGroupScreen");
  }

  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState(null);
  const [userGroups, setUserGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useFocusEffect(
    React.useCallback(() => {
      fetchUserGroups();
    }, [])
  );
  
    const fetchUserGroups = async () => {

      try {
        
        const userInfo = await Auth.currentAuthenticatedUser();
        const userId = userInfo.attributes.sub;
        const result = await API.graphql(graphqlOperation(userGroupsByUserId, { userId }));
        const userGroupsData = result.data.userGroupsByUserId.items;
        setUserGroups(userGroupsData);
        const groupIds = userGroupsData.map(group => group.groupId);
        console.log(groupIds);
        const groups = [];
        for (const groupId of groupIds) {
          const group = await API.graphql(graphqlOperation(getGroup, { id: groupId }));
          groups.push(group.data.getGroup);
        }
        setGroups(groups);
        console.log(groups);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching user groups', error);
      }
    };
    const handleGroupDisplay = (id) => {
      console.log(id);
    }

    const renderGroup = ({ item }) => {
      return (
        <TouchableOpacity onPress={() => handleGroupDisplay(item.id)} style={styles.groupItem}>
          <Text style={styles.groupName}>{item.name}</Text>
          <Text style={styles.idText}>Group ID: {item.id}</Text>
        </TouchableOpacity>
      );
    };
    
  
    if (loading) {
      return <Text>Loading...</Text>;
    }
  
    return (
      <SafeAreaView style={styles.container}>
          <FlatList
          data={groups}
          renderItem={renderGroup}
          keyExtractor={item => item.id}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={<Text>No groups found</Text>}
          style={styles.groupListContainer}
          />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.joinButton} onPress={handleJoinScreen}>
            <Text style={styles.createText}>Join Group</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.createButton} onPress={handleGroupScreen}>
            <Text style={styles.createText}>Create Group</Text>
          </TouchableOpacity>
        </View>
        
      </SafeAreaView>
      
    );
  };


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  groupListContainer: {
    paddingVertical: 15,
    paddingHorizontal: 8,
  },
  groupItem: {
    backgroundColor: '#B0C4DE',
    justifyContent: 'space-between',
    marginVertical: 8,
    padding: 10,
    borderRadius: 10,
  },
  groupName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  keyText: {
    fontSize: 14,
  },
  idText: {
    fontSize: 10,
  },
  createText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  createButton: {
    backgroundColor: '#B0C4DE',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    width: '49%',
  },
  joinButton: {
    backgroundColor: '#B0C4DE',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    width: '49%',
  },
});