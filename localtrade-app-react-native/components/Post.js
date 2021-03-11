import React, { useEffect, useState, useContext } from 'react';
import { View, Image, Platform } from 'react-native';
import { Input, Button } from 'react-native-elements';
import APIservice from './services/APIService';
import { StyleSheet } from 'react-native';
import { UserContext } from '../Context/Context'
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import keys from './keys';
import { RNS3 } from 'react-native-aws3';

const Post = ({ navigation }) => {
  const { allPosts, setAllPosts, idOfUser } = useContext(UserContext)
  const [image, setImage] = useState(null);
  const [post, setPost] = useState(initialState)
  const initialState = {
    description: '',
    image_url: '',
    user_id: idOfUser,
    longitude: 0.0,
    latitude: 0.0
  }

  useEffect(() => {
    getLocation();
    askForPermission();
  }, [])

  const askForPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      saveImageToAWS3(result.uri);
    }
  };

  const saveImageToAWS3 = (image) => {
    const file = {
      uri: image,
      name: Math.random().toString(36),
      type: 'image/png'
    }
    const config = {
      keyPrefix: '',
      bucket: 'localtrade',
      region: 'us-west-1',
      accessKey: keys.AccessKey,
      secretKey: keys.SecretKey,
      successActionStatus: 201,
    }
    RNS3.put(file, config).then(res => {
      if (res.status !== 201) throw new Error('failed to upload image to s3')
      setPost({ ...post, image_url: file.name })
    })
  }

  const getLocation = async () => {
    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Access to location is needed to run the app');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setPost({
        ...post,
        longitude: longitude,
        latitude: latitude
      });
    } catch (error) {
      console.log(error)
    }
  }

  const addPost = async () => {
    const { description, image_url, user_id, longitude, latitude } = post;
    const submittedPost = { description, image_url, user_id, longitude, latitude };
    const res = await APIservice.newPost(submittedPost);
    if (res.error) {
      alert('could not submit');
      setPost(initialState);
    } else {
      setPost(res);
      (post) => { setAllPosts(allPosts.concat(post)) };
    }
  }

  return (
    <View style={styles.container}  >
      <Button title='Back' onPress={() => navigation.navigate('Dashboard')} />
      <Input
        placeholder='Describe your product'
        value={post.description}
        onChangeText={(description) => setPost({ ...post, description: description })}
      />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
      <Button title='Submit post' onPress={addPost} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttons: {
    marginTop: 200
  },
})

export default Post;