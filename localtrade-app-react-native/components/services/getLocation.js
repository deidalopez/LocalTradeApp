// TODO
// just storing here right now, either refactor or add this to another part
// maybe to the post component? make it functional maybe?

import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';

const Location = {};

Location.getLocation =() =>{

  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Access to location is needed to run the app');
        return;
      } 
      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;
      alert(`latitude: ${latitude}, longitude: ${longitude}`)

    } catch (error) {
      console.log(error)
    }
  }

}

export default Location;