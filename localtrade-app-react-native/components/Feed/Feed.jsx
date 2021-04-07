import React, { useEffect, useState, useContext } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-elements';
import APIservice from '../services/APIService';
import { getDistance } from 'geolib';
import * as Location from 'expo-location';
import { UserContext } from '../../context/Context'
import { useNavigation } from '@react-navigation/core';
import styles from './Feed.styles'

const Feed = () => {
  const { allPosts } = useContext(UserContext)
  const navigation = useNavigation()
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0
  })
  let sortedByDistance = [];

  const [sortedPosts, setSortedPosts] = useState(allPosts);

  useEffect(() => {
    load()
    getAllPosts()
  }, [])

  async function load() {
    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Access to location is needed to run the app');
        return;
      }
      const userlocation = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = userlocation.coords;
      setLocation({ longitude: longitude, latitude: latitude });
    } catch (error) {
      console.log(error)
    }
  }

  const getAllPosts = async () => {
    const allPostsArray = await APIservice.getAllPosts();
    if (allPostsArray.error) {
      alert('error getting all posts')
    } else {
      const postsWithDistance = allPostsArray.map((post) => {
        const userInfo = getUserInfo(post.user_id);
        const { firstName, email } = userInfo;
        const postLocation = { longitude: Number(post.longitude), latitude: Number(post.latitude) };
        return {
          description: post.description,
          image_url: post.image_url,
          distance: ((getDistance(location, postLocation, 10)) / 16100).toFixed(1),
          location: postLocation,
          user_id: post.user_id,
          post_id: post.id,
          firstName: firstName,
          email: email
        }
      })
      sortedByDistance = postsWithDistance.sort((a, b) => a.distance - b.distance)
      setSortedPosts(sortedByDistance)
    }
  }

  const getUserInfo = async (user_id) => {
    const res = await APIservice.getUserById(user_id);
    if (res.error) {
      alert('problem getting user info');
    } else {
      const { firstName, id, email } = res;
      return {
        firstName: firstName,
        email: email
      }
    };
  }
  const interested = async (user_id) => {
    const res = await APIservice.getUserById(user_id);
    if (res.error) {
      alert('problem getting user info');
    } else {
      const { firstName, id, email } = res;
      return {
        firstName: firstName,
        email: email
      }
    };
  }


  const renderFeed = () => {
    return sortedPosts.map((post) => {
      return (
        <Card key={post.post_id}>
          {/* <Card.Title> {post.image_url}  </Card.Title> */}
          <Image
            style={{ width: 300, height: 300 }}
            source={{
              uri: `https://localtrade.s3-us-west-1.amazonaws.com/${post.image_url}`
            }}
          />
          <Card.Divider />
          <Text style={styles.description}>{post.description}</Text>
          <Text style={styles.description}>Posted {post.distance} miles away</Text>
          {/* <Button title='interested'
            type='outline'
            buttonStyle={{ marginVertical: 10 }}
            onPress={() => navigation.push('Profile', { user_id: post.user_id })}
          /> */}
          <TouchableOpacity style={styles.interestedButton} onPress={() => navigation.navigate('OtherProfile', { idOfUser: post.user_id })}>
            <Text style={styles.interested}>Interested</Text>
          </TouchableOpacity>
        </Card>
      )
    })
  }
  return (
    <View style={styles.container}>
      {/* <Text style={[styles.title]}>Offers near me </Text> */}
      <ScrollView style={styles.scrollView} bounces={true}>
        {renderFeed()}
      </ScrollView>
    </View>
  )
}

export default Feed;
