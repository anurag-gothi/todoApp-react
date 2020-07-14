import { LOG_IN, LOG_OUT, REGISTER, GOOGLE } from "../actionTypes";

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  invalid: ''
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER:
      localStorage.setItem('user',JSON.stringify(payload))
      return { ...state,user:payload}
    case LOG_IN:
      localStorage.setItem('user',JSON.stringify(payload))
      return { ...state,user:payload};
    case LOG_OUT:
      localStorage.removeItem('user')
      return { ...state, user: null };
    case GOOGLE:
      localStorage.setItem('user', JSON.stringify(payload))
      return { ...state,user:payload}
    case 'INVALID':
      return { ...state, invalid: 'invalid credentials' }
    default:
      return { ...state };
  }
};

export default userReducer;
