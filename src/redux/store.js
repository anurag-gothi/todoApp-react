import { createStore,applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";
import thunk from 'redux-thunk'


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// store.dispatch({
//   type: "LOG_IN",
//   payload: { email: "anurag@anurag.com", password: "1234" }
// });

export default store;
