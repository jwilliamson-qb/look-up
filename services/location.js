import get from 'lodash/get';
import { API_TOKEN } from '../secrets';

// eslint-disable-next-line import/prefer-default-export
export const calculateDistance = async (businesses, locationData) => {
  if (!locationData) {
    return [];
  }
  try {
    const concatenatedAddressString = concatenateAddresses(businesses);
    const concatenatedLatLong = concatenateLatLong(locationData);
    const response =
    await fetch(
      'https://api.distancematrix.ai/maps/api/distancematrix/json' +
      `?key=${encodeURIComponent(API_TOKEN)}` +
      `&origins=${encodeURIComponent(concatenatedLatLong)}` +
      `&destinations=${encodeURIComponent(concatenatedAddressString)}`,
      {
        method: 'get',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: '',
      },
    );

    const json = await response.json();
    return get(json, 'rows.0.elements', []);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const concatenateAddresses = (businesses) => {
  let concatenatedAddressString = '';
  businesses.forEach((business) => {
    const address = get(business, '7.value', '');
    if (address) {
      if (concatenatedAddressString) {
        concatenatedAddressString += '|';
      }
      concatenatedAddressString += address;
    }
  });

  return concatenatedAddressString;
};

const concatenateLatLong = (locationData) => {
  return locationData.latitude + ',' + locationData.longitude;
};
