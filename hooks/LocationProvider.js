import React, { useState, useEffect, } from 'react';
import * as Location from 'expo-location';
import { setLocationData } from '../stores/location';


export default function useLocationService() {
  const [location, setLocation] = useState(null);
  const [setErrorMsg] = useState(null);

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

  return location;
}
