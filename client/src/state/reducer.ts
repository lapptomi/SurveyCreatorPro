
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/* eslint-disable arrow-body-style */
export const setLoading = (loading: boolean) => {
  return {
    type: 'SET_LOADING_STATUS',
    data: loading,
  };
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = (state: any, action: { type: any; data: any; }) => {
  switch (action.type) {
    case 'SET_LOADING_STATUS':
      return { ...state, isLoading: action.data };
    default:
      throw new Error('Unexpected action');
  }
};

export default reducer;