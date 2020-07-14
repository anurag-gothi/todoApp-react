import { LOG_IN, LOG_OUT, REGISTER, GOOGLE } from "../actionTypes";
import axios from "axios";

export const register = user => async dispatch => {
  const { exist } = await axios.get('https://5f07031f9c5c25001630671e.mockapi.io/user')
  if (exist) {
    const chk = exist.filter(el => el.email === user.email)
    if (chk) {
      dispatch({
        type: LOG_IN,
        payload: user
      });

    }
  }
  else {
    const { data } = await axios.post('https://5f07031f9c5c25001630671e.mockapi.io/user', user)

    dispatch({
      type: REGISTER,
      payload: data
    })
  }


}

export const logIn = user => async dispatch => {
  const { data } = await axios.get('https://5f07031f9c5c25001630671e.mockapi.io/user')
  const chk = data.filter(el => {
    return el.email === user.email && el.password === user.password
  });
  if (chk.length === 0) {
    console.log('invalid')
    dispatch({
      type: 'INVALID',
      payload: 'INVALID CREDENTIALS'
    })
  }
  else {
    dispatch({
      type: LOG_IN,
      payload: user
    });
  }



};

export const logOut = () => {
  return {
    type: LOG_OUT
  };
};

export const google = user => async dispatch => {
  dispatch({
    type: GOOGLE,
    payload: user
  })
}
