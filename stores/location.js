export const initialState = {
    latLong: {
        latitude: 0,
        longitude: 0,
    },
  };
  
  const SET_LOCATION = 'SET_LOCATION';
  
  export const setLocationData = (locationData) => (dispatch) => {
    dispatch(setLocationDataAction(locationData));
  };
  
  const setLocationDataAction = (locationData) => ({
    type: SET_LOCATION,
    locationData,
  });
  
  export const location = (state = initialState, action) => {
    switch (action.type) {
      case SET_LOCATION:
        return {
          ...state,
          latLong: action.locationData,
        };
      default:
        return state;
    }
  };
  