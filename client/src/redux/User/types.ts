export const SET_LOGIN_START = 'SET_LOGIN_START';
export const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR'

export const SET_REGISTER_START = 'SET_REGISTER_START';
export const SET_REGISTER_SUCCESS = 'SET_REGISTER_SUCCESS';
export const SET_REGISTER_ERROR = 'SET_REGISTER_ERROR';


export interface SetLoginStartAction{
    type: typeof SET_LOGIN_START
}

export interface SetLoginSuccessAction{
    type: typeof SET_LOGIN_SUCCESS,
    payload: {
        token: string
    }
}

export interface SetLoginErrorAction{
    type: typeof SET_LOGIN_ERROR,
    payload: {
        error: string
    }
}

export interface SetRegisterStartAction{
    type: typeof SET_REGISTER_START
}

export interface SetRegisterSuccessAction{
    type: typeof SET_REGISTER_SUCCESS
}

export interface SetRegisterErrorAction{
    type: typeof SET_REGISTER_ERROR,
    payload: {
        error: string
    }
}

export type UserActions = SetLoginStartAction | SetLoginSuccessAction | SetLoginErrorAction | SetRegisterStartAction | SetRegisterSuccessAction | SetRegisterErrorAction