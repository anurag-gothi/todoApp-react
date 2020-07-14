import {
  CREATE_TODO,
  GET_TODOS,
  DELETE_TODO,
  UPDATE_TODO
} from "../actionTypes";
import axios from "axios";

export const createTodo = todo => async dispatch => {
  const { data } = await axios.post(`https://5f07031f9c5c25001630671e.mockapi.io/todo`, todo)
  dispatch({
    type: CREATE_TODO,
    payload: data
  });
};

export const deleteTodo = todoId => async dispatch => {
  const { data } = await axios.delete(`https://5f07031f9c5c25001630671e.mockapi.io/todo/${todoId}`)
  dispatch({
    type: DELETE_TODO,
    payload: data
  });
};

export const updateTodo = (todoId, newTodo) => {
  return {
    type: UPDATE_TODO,
    payload: {
      id: todoId,
      newTodo
    }
  };
};

export const getAllTodos = (email) => async dispatch => {
  let { data } = await axios('https://5f07031f9c5c25001630671e.mockapi.io/todo')
  data = data.filter(e=>e.email===email)
  dispatch({
    type: GET_TODOS,
    payload: data
  })
};

export const getTodo = todoId => async dispatch => {
  const { data } = await axios(`https://5f07031f9c5c25001630671e.mockapi.io/todo/${todoId}`)
  dispatch({
    type: GET_TODOS,
    payload: data
  })
};
