import React, {useEffect} from 'react';
import DefaultStack from './src/Routes/defaultStack'
import { Amplify, Auth, API, graphqlOperation, Storage} from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native';
import config from './src/aws-exports';
import {getUser} from './src/graphql/queries';
import {createUser} from './src/graphql/mutations';


Amplify.configure(config);

function App() {
  //TODO: Figure out image keys. S3 Bucket. and fix upload image.

  useEffect(() => {
    const syncUser = async () => {
      // get Auth user
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      // query the database using Auth user id (sub)
      const userData = await API.graphql(
        graphqlOperation(getUser, { id: authUser.attributes.sub })
      );

      if (userData.data.getUser) {
        console.log("User already exists in DB");
        console.log(userData)
        return;
      }
      const defaultImage = 'https://www.pngkit.com/png/full/126-1262807_instagram-default-profile-picture-png.png';
      const imageKey = `${authUser.attributes.sub}-image.jpg`;
      await Storage.put(imageKey, defaultImage, {
        contentType: 'image/jpeg' // the content type of the default image
      });

      // if there is no users in db, create one
      const newUser = {
        id: authUser.attributes.sub,
        name: authUser.attributes.name,
        image: {
          bucket: 'pocketplanner-storage-5f75b3c5191737-staging',
          region: 'us-east-2',
          key: imageKey

        },
        bio: "Hey, I am using PocketPlanner"
      };

      await API.graphql(
        graphqlOperation(createUser, { input: newUser })
      );
    };

    syncUser();
  }, []);
  

  return (
    <DefaultStack />
  );
};

const signUpConfig = {
  header: "My Customized Sign Up",
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Name",
      key: "name",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 2,
      type: "string",
    },
    {
      label: "Username",
      key: "preferred_username",
      required: true,
      displayOrder: 3,
      type: "string",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 4,
      type: "password",
    },
  ],
};

export default withAuthenticator(App, {signUpConfig}); 