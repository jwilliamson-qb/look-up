import React, { useState, useEffect, Fragment } from 'react';
import * as Location from 'expo-location';
import { setLocationData } from '../stores/location';


export default function LocationProvider(props) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      const locationData = await Location.getCurrentPositionAsync({});
      const latLong = {
        latitude: locationData.coords.latitude,
        longitude: locationData.coords.longitude,
      };
      setLocation(latLong);
      setLocationData(latLong);
    })();
  }, []);

  // eslint-disable-next-line no-unused-vars
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return props.children;
}
