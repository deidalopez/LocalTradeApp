import React, { useEffect, useState, useContext } from 'react';
import { View, Image, Platform, TouchableOpacity, Text, TextInput } from 'react-native';
import APIservice from '../services/APIService';
import { UserContext } from '../../context/Context';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
// import keys from '../keys';
import styles from './Post.style';
import { Card } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../globalStyles';
const ACCESS_KEY = process.env.EXPO_AWS_ACCESS_KEY;
const SECRET_KEY = process.env.EXPO_AWS_SECRET_KEY;
import { RNS3 } from 'react-native-aws3';

const Post = ({ navigation }) => {
  const { allPosts, setAllPosts, idOfUser } = useContext(UserContext)
  const [image, setImage] = useState(null);

  const initialState = {
    description: '',
    image_url: '',
    idOfUser: idOfUser,
    longitude: 0.0,
    latitude: 0.0
  }
  const [post, setPost] = useState(initialState)

  useEffect(() => {
    getLocation();
    setImage(null);
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
    if (result) {
      setImage(result.uri);

    }
  };

  const saveImageToAWS3 = (image) => {
    console.log('inside saveImageToAWS3')
    const file = {
      uri: image,
      name: Math.random().toString(36).slice(2),
      type: 'image/png'
    }
    const config = {
      keyPrefix: '',
      bucket: 'localtrade',
      region: 'us-west-1',
      accessKey: ACCESS_KEY,
      secretKey: SECRET_KEY,
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
    saveImageToAWS3(image);
    const { description, image_url, longitude, latitude } = post;
    const sentUserId = initialState.idOfUser;
    const submittedPost = { description, image_url, sentUserId, longitude, latitude };
    const res = await APIservice.newPost(submittedPost);
    if (res.error) {
      alert('could not submit');
      setPost(initialState);
    } else {
      setPost(res);
      (post) => { setAllPosts(allPosts.concat(post)) };
      navigation.navigate('Dashboard')
    }
  }

  return (
    <View style={styles.container} >
      <Card >
        {image ? <Image source={{ uri: image }} style={{ width: 300, height: 300 }} /> :
          <View style={styles.imgPlaceholder}>
            <TouchableOpacity onPress={pickImage}>
              <Text style={styles.imgPlaceholderText}>  Select an image  <AntDesign name="upload" size={14} color={COLORS.gray} /></Text>
            </TouchableOpacity>
          </View>
        }
        <Card.Divider />
        <TextInput
          style={styles.input}
          placeholder='Describe your product'
          name='description'
          onChangeText={description => setPost({ ...post, description: description })}
        />
      </Card>
      <TouchableOpacity onPress={addPost} style={styles.buttons}>
        <Text style={styles.buttontext}>Submit post</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Post;