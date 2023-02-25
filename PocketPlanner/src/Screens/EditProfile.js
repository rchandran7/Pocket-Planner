import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { API, graphqlOperation, Storage, Auth } from 'aws-amplify';
import { updateUser } from '../graphql/mutations';

import * as ImagePicker from 'expo-image-picker';

export default function EditProfileScreen({ navigation, route }) {

  const user = route.params.user;

  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [useImage, setImage] = useState(user.image);
  console.log(useImage);
  useEffect(() => {
    navigation.setOptions({ headerTitle: 'Edit Profile' });
  }, []);
  
  const handleSelectImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access camera roll is required!');
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
  
      if (!result.cancelled) {
        // Upload the image to S3
        const user = await Auth.currentAuthenticatedUser();
        const extension = result.uri.split('.').pop();
        const key = `${user.attributes.sub}-profile-image.${extension}`;
        const contentType = `image/${extension}`;
        console.log(extension);
        const response = await fetch(result.uri);
        const blob = await response.blob();
  
        const s3Response = await Storage.put(key, blob, { contentType });
  
        // Update the image state with the S3 object
        setImage({
          bucket: useImage.bucket,
          region: useImage.region,
          key: s3Response.key,
          localUri: result.uri
        });

        console.log(s3Response.key);
        console.log(useImage.key);
      }
    } catch (e) {
      console.log('Error selecting image', e);
    }
  };
  
  
  
  

  const handleSaveProfile = async () => {
    try {
      console.log(useImage);
      const updatedUser = await API.graphql(
        graphqlOperation(updateUser, {
          input: {
            id: user.id,
            name: name,
            bio: bio,
            image: {
              bucket: useImage.bucket,
              key: useImage.key,
              region: useImage.region
            }
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
        {useImage?.localUri ? (
        <Image source={{ uri: useImage.localUri }} style={styles.profilePicture} />
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
