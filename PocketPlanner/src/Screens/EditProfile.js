import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { updateUser } from '../graphql/mutations';

import * as ImagePicker from 'expo-image-picker';

export default function EditProfileScreen({ navigation, route }) {

  const user = route.params.user;

  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [imageUri, setImageUri] = useState(user.imageUri);

  useEffect(() => {
    navigation.setOptions({ headerTitle: 'Edit Profile' });
  }, []);
  
  const handleSelectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      console.log(result);
      if (!result.canceled) {
        setImageUri(result.uri);
      }
    } catch (e) {
      console.log('Error selecting image', e);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const updatedUser = await API.graphql(
        graphqlOperation(updateUser, {
          input: {
            id: user.id,
            name: name,
            bio: bio,
            imageUri: imageUri
          }
        })
      );
      console.log('User profile updated:', updatedUser);
      navigation.navigate('bottomTabs');
    } catch (e) {
      console.log('Error updating user profile', e);
    }
  }

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={handleSelectImage} style={styles.profilePictureContainer}>
        {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.profilePicture} />
        ) : (
            <View style={styles.addProfilePictureContainer}>
                <Text style={styles.addProfilePictureText}>Add Profile Picture</Text>
            </View>
        )}
        </TouchableOpacity>

      <Text style={styles.label}>Username</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Text style={styles.label}>Bio</Text>
      <TextInput
        value={bio}
        onChangeText={setBio}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
    alignItems: 'center'
  },
  profilePictureContainer: {
    borderRadius: 100,
    overflow: 'hidden',
  },
  profilePicture: {
    width: 200,
    height: 200,
  },
  addProfilePictureContainer: {
    width: 200,
    height: 200,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addProfilePictureText: {
    fontWeight: 'bold',
    color: '#000',
  },  
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%'
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 20
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
