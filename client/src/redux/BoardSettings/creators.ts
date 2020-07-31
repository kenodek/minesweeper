import { SET_BOARD_WIDTH, SET_BOARD_HEIGHT, SetBoardWidthAction, SetBoardHeightAction, SetNumberOfBombs, SET_NUMBER_OF_BOMBS, START_OF_REQUEST, END_OF_REQUEST, StartOfRequest, EndOfRequest } from "./types";
import { AppDispatch, RootState } from "../store";


export const setBoardWidth = (width:number):SetBoardWidthAction => ({
    type: SET_BOARD_WIDTH,
    payload: {
        width
    }
});


export const setBoardHeight = (height: number):SetBoardHeightAction => ({
    type: SET_BOARD_HEIGHT,
    payload: {
        height
    }
});


export const setNumberOfBombs = (numberOfBombs: number):SetNumberOfBombs => ({
    type: SET_NUMBER_OF_BOMBS,
    payload: {
        numberOfBombs
    }
})

export const startOfRequest = ():StartOfRequest => ({
    type: START_OF_REQUEST
});

export const endOfRequest = ():EndOfRequest => ({
    type: END_OF_REQUEST
})

export const changeBoardSettings = (width:number, height:number, numberOfBombs:number) => (dispatch:AppDispatch, getState: () => RootState) => {

    dispatch(startOfRequest())
    
    const state = getState();
    fetch("http://localhost:5000/user/settings", {
        method: 'PUT',
        headers: {
            'Content-Type': "application/json",
            'authorization': `Bearer ${state.user.token}`
        },
        body: JSON.stringify({width, height, numberOfBombs})
    })
    .then(res => res.json())
    .then(data => {
        const {width, height, numberOfBombs} = data.boardSettings;
        dispatch(setBoardWidth(width));
        dispatch(setBoardHeight(height));
        dispatch(setNumberOfBombs(numberOfBombs))

    })
    .catch(err => console.log("ERROR: ", err))
    .finally(() => dispatch(endOfRequest()))
}