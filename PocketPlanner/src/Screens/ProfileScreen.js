import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { listUsers } from '../graphql/queries';
import { useState } from "react";
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import styled from "styled-components";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUsers = async () => {
        try {
          const userData = await API.graphql(
            graphqlOperation(
              listUsers
            )
          )
          setUser(userData.data.listUsers.items[0]); // assuming that you want to display the first user from the list
        } catch (e) {
          console.log(e);
        }
      }
      fetchUsers();
      console.log(user);
    }, [])

  );

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={{ uri: `https://${user.image.bucket}.s3.${user.image.region}.amazonaws.com/public/${user.image.key}` }}
          style={ styles.userImg }
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProfileScreen', { user })}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={handleSignOut}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      <ComponentContainer>
          <LogoImage
            source={require("../../assets/Logo_PocketPlanner.jpg")}
          />
        </ComponentContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  userInfo: {
    alignItems: 'center'
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#000',
    marginTop: 20,
    marginBottom: 10
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 50,
    marginBottom: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#B0C4DE',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: '48%',
  },
  signOutButton: {
    backgroundColor: '#FF4500',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: '48%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});
const ComponentContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 450px;
`;
const LogoImage = styled.Image`
  width: 325px;
  height: 325px;
`;