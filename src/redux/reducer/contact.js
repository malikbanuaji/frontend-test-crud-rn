import * as Actions from '../actions/contact';

const initialState = {
  data: [],
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case Actions.SET_CONTACT_LIST:
      return {...state, data: payload.data};
    case Actions.DELETE_CONTACT:
      return {
        ...state,
        data: state.data.filter((value) => {
          return value.id !== payload.id;
        }),
      };
    case Actions.ADD_NEW_CONTACT:
      return {
        ...state,
        data: [...state.data, payload],
      };
    case Actions.UPDATE_CONTACT:
      return {
        ...state,
        data: state.data.map((value) => {
          if (value.id === payload.id) {
            return payload;
          }
          return value;
        }),
      };

    default:
      return state;
  }
};
