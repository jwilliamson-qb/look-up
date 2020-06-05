export const initialState = {
  businesses: [],
};

const SET_BUSINESSES = 'SET_BUSINESSES';

export const setBusinesses = (businessObject) => (dispatch) => {
  dispatch(setBusinessesAction(businessObject));
};


const setBusinessesAction = (businessObject) => ({
  type: SET_BUSINESSES,
  businessObject,
});

export const businesses = (state = initialState, action) => {
  switch (action.type) {
    case SET_BUSINESSES:
      return {
        ...state,
        businesses: action.businessObject,
      };
    default:
      return state;
  }
};
