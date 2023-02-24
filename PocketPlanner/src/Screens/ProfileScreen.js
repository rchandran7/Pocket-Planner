import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { listUsers }  from '../graphql/queries';
import {useEffect, useState} from "react";
import { API, graphqlOperation } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen({ navigation }) {

  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await API.graphql(
          graphqlOperation(
            listUsers
          )
        )
        setUser(userData.data.listUsers.items);
        console.log(user);
      } catch (e) {
        console.log(e);
      }
    }
    fetchUsers();
  }, [])

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView 
      contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}} 
      showsHorizontalScrollIndicator={false}>

        <Image source={{ uri: 'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png' }} style ={styles.userImg}/>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderBottomColor: '#000',
  },
});