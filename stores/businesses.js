export const initialState = {
  all: [],
};

const SET_BUSINESSES = 'SET_BUSINESSES';

export const setBusinesses = (businessesArray) => (dispatch) => {
  dispatch(setBusinessesAction(businessesArray));
};

const setBusinessesAction = (businessesArray) => ({
  type: SET_BUSINESSES,
  businessesArray,
});

export const businesses = (state = initialState, action) => {
  switch (action.type) {
    case SET_BUSINESSES:
      return {
        ...state,
        all: action.businessesArray,
      };
    default:
      return state;
  }
};
