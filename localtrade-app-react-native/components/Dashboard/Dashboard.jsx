import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { UserContext } from '../../context/Context'
import APIservice from '../services/APIService';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Landing from '../Landing/Landing';
import styles from './Dashboard.styles'
import { Card } from 'react-native-elements/dist/card/Card';

const Dashboard = ({ navigation }) => {
  const initialState = {
    email: '',
    password: '',
  };

  const { user, setUser, setIdOfUser, idOfUser, isAuth, setIsAuth } = useContext(UserContext)
  const [name, setName] = useState('');
  const [accessToken, setAccessToken] = useState(''); 
  // const [posts, setPosts] = useState([])
  const posts = []
  
  useEffect(() => {
    getInfo(user.email);
    getToken();
    getUserPost(id);
  }, [])

  const getToken = async() => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      setAccessToken(token);
    } catch(err) {
      console.log({err: 'error getting access token'});
    }
  }
  const getInfo = async (email) => {
    const res = await APIservice.getUserByEmail(email);
    if (res.error) {
      alert('problem getting user info');
    } else {
      const { firstName, id } = res;
      setIdOfUser(id);
      setName(firstName);
    };
  };

  const getUserPost = async(id) => {
    const res = await APIservice.getPostsByUserId(id); 
    if (res.error) {
      alert('could not load your posts')
    } else {
      res.forEach(post => {
        posts.push(post);
      })
      console.log(posts)
    }
  }

  const renderPosts = () => {
    return posts.map((post) => {
      return (
        <Card key={post.id}>
          <Image
          style={{width: 300, height: 300}}
            source={{
              uri: `https://localtrade.s3-us-west-1.amazonaws.com/${post.image_url}`
            }}
          >
          <Card.Divider />
            
          <Text style = {styles.description}>{post.description}</Text>
          {/* <Text style = {styles.description}>{post.description}</Text> */}
          </Image>
        </Card>
      )
    })
  }


  if (isAuth) {
    return (
      <View style={[styles.container]}  >
         <Text style={[styles.welcomeMessage]}>Welcome, {name}</Text>
         <Text> Your posts: </Text>
         <ScrollView style={styles.scrollView} bounces = {true}>
          {renderPosts()}
         </ScrollView>
        {/*<TouchableOpacity onPress={() => navigation.push('Feed')} style={styles.buttons} navigation={navigation}>
          <Text style={styles.buttontext}>See local offers</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push('Post', { idOfUser: idOfUser })} style={styles.buttons}>
          <Text style={styles.buttontext}>New post</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push('MyProfile', { idOfUser: idOfUser })} style={styles.buttons}>
          <Text style={styles.buttontext}>My profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => signOut()} style={styles.buttons}>
          <Text style={styles.buttontext}>Sign out</Text>
        </TouchableOpacity> */}
      </View>
    );
  } else {
    <Landing />
  }
};

export default Dashboard;

