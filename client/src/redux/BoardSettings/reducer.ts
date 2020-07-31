import { SET_BOARD_WIDTH, SET_BOARD_HEIGHT, BoardInfoTypes, SET_NUMBER_OF_BOMBS, START_OF_REQUEST, END_OF_REQUEST } from "./types";

interface BoardInfo{
    height: number,
    width: number,
    numberOfBombs: number,
    isFetching: boolean
}

const initialState = {
    height: 20,
    width: 20,
    numberOfBombs: 40,
    isFetching: false,
};


export default (state:BoardInfo = initialState, action:BoardInfoTypes):BoardInfo => {
    switch(action.type){
        case SET_BOARD_HEIGHT: 
          return {...state, height: action.payload.height}
        
        case SET_BOARD_WIDTH: 
          return {...state, width: action.payload.width}
          
        case SET_NUMBER_OF_BOMBS: 
          return {...state, numberOfBombs: action.payload.numberOfBombs}

        case START_OF_REQUEST: 
        return {...state, isFetching:true}

        case END_OF_REQUEST: 
        return {...state, isFetching: false}

      default:
          return state
    }    
}