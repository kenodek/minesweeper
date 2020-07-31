import { SET_LOGIN_START, SET_LOGIN_SUCCESS, SET_LOGIN_ERROR, SetLoginStartAction, SetLoginSuccessAction, SetLoginErrorAction, SetRegisterSuccessAction, SetRegisterStartAction, SetRegisterErrorAction, SET_REGISTER_START, SET_REGISTER_SUCCESS, SET_REGISTER_ERROR } from "./types";
import { AppDispatch } from "../store";
import { setBoardWidth, setBoardHeight, setNumberOfBombs } from "../BoardSettings/creators";
import history from '../..//global/history' 

export const setLoginStart = ():SetLoginStartAction => ({
    type: SET_LOGIN_START
});


export const setLoginSuccess = (token: string):SetLoginSuccessAction => ({
    type: SET_LOGIN_SUCCESS,
    payload: {
        token
    }
})

export const setLoginError = (error: string):SetLoginErrorAction => ({
    type: SET_LOGIN_ERROR,
    payload: {
        error
    }
})

export const login = (email: string, password: string) => (dispatch:AppDispatch) => {

    dispatch(setLoginStart())

    fetch("http://localhost:5000/user/login", {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({email, password})
    })
    .then(res => res.json())
    .then(data => {

        const {token , boardSettings: {width, height, numberOfBombs}} = data;
        localStorage.setItem("minesweeper_token", token);
        dispatch(setLoginSuccess(token));
        dispatch(setBoardWidth(width));
        dispatch(setBoardHeight(height));
        dispatch(setNumberOfBombs(numberOfBombs))
        history.push('/game')
    })
    .catch(err => dispatch(setLoginError(err)))
}

export const setRegisterStart = ():SetRegisterStartAction => ({
    type: SET_REGISTER_START
});


export const setRegisterSuccess = ():SetRegisterSuccessAction => ({
    type: SET_REGISTER_SUCCESS,
})

export const setRegisterError = (error:string):SetRegisterErrorAction => ({
    type: SET_REGISTER_ERROR,
    payload: {
        error
    }
})

export const register = (email:string, password:string, passwordConfirmation:string) => (dispatch:AppDispatch) => {

    dispatch(setRegisterStart())

    fetch("http://localhost:5000/user/register", {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({email, password, passwordConfirmation})
    })
    .then(res => res.json())
    .then(data => {
        dispatch(setRegisterSuccess());
        history.push('/')
    })
    .catch(err => console.log("ERROR: ", err))
    .catch(err => dispatch(setRegisterError(err)))
}