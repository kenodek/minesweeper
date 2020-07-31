import { SET_LOGIN_START, UserActions, SET_LOGIN_SUCCESS, SET_LOGIN_ERROR, SET_REGISTER_START, SET_REGISTER_SUCCESS, SET_REGISTER_ERROR } from "./types";


interface UserInfo{
    token: string | undefined,
    isTryingToLogin: boolean,
    loginError: string | undefined
    isTryingToRegister: boolean,
    registerError: string | undefined
}

const initialState = {
    token: undefined,
    isTryingToLogin: false,
    loginError: undefined,
    isTryingToRegister: false,
    registerError: undefined
};


export default (state:UserInfo = initialState, action:UserActions):UserInfo => {
    switch(action.type){
        case SET_LOGIN_START: 
            return {...state, isTryingToLogin: true}
        
        case SET_LOGIN_SUCCESS: 
            return {...state, isTryingToLogin: false, token: action.payload.token}

        case SET_LOGIN_ERROR: 
            return {...state, isTryingToLogin: false, loginError: action.payload.error}

        case SET_REGISTER_START: 
            return {...state, isTryingToRegister: true}
        
        case SET_REGISTER_SUCCESS: {
            return {...state, isTryingToRegister: false}
        }

        case SET_REGISTER_ERROR: {
            return {...state, registerError: action.payload.error}
        }

        default: return state
    }
}