import get from 'lodash/get';
import { API_TOKEN } from '../secrets';

// eslint-disable-next-line import/prefer-default-export
export const calculateDistance = async (businesses, locationData) => {
  try {
    const concatenatedAddressString = concatenateAddresses(businesses);
    const concatenatedLatLong = concatenateLatLong(locationData);
    const response =
    await fetch(
      'https://api.distancematrix.ai/maps/api/distancematrix/json' +
      `?key=${encodeURIComponent(API_TOKEN)}` +
      `&origins=${encodeURIComponent(concatenatedAddressString)}` +
      `&destinations=${encodeURIComponent(concatenatedLatLong)}`, {
        method: 'get',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: '',
      },
    );

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const concatenateAddresses = (businesses) => {
    let concatenatedAddressString = '';
    businesses.forEach(business => {
      const address = get(business, '7.value', '');
      concatenatedAddressString += '|' + address;
    });

    return concatenatedAddressString;
};

const concatenateLatLong = (locationData) => {
    console.log(locationData);
    return locationData.latitude + ',' + locationData.longitude;
};
