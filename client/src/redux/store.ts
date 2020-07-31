import {createStore, combineReducers, compose, applyMiddleware} from "redux";
import boardReducer from './BoardSettings/reducer'
import userReducer from "./User/reducer"
import { useSelector, TypedUseSelectorHook } from 'react-redux'
import thunk from "redux-thunk"


const rootReducer = combineReducers({
    board: boardReducer,
    user: userReducer
})

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;