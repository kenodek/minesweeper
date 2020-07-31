export const SET_BOARD_WIDTH = "SET_BOARD_WIDTH";
export const SET_BOARD_HEIGHT = "SET_BOARD_HEIGHT";
export const SET_NUMBER_OF_BOMBS = "SET_NUMBER_OF_BOMBS";
export const START_OF_REQUEST = "START_OF_REQUEST";
export const END_OF_REQUEST = 'END_OF_REQUEST';

export interface SetBoardWidthAction{
    type: typeof SET_BOARD_WIDTH;
    payload: {
        width: number
    }
}

export interface SetBoardHeightAction{
    type: typeof SET_BOARD_HEIGHT;
    payload: {
        height: number
    }
}

export interface SetNumberOfBombs{
    type: typeof SET_NUMBER_OF_BOMBS;
    payload: {
        numberOfBombs: number
    }
}

export interface StartOfRequest{
    type: typeof START_OF_REQUEST;
}

export interface EndOfRequest{
    type: typeof END_OF_REQUEST
}

export type BoardInfoTypes = StartOfRequest | EndOfRequest | SetBoardWidthAction | SetBoardHeightAction | SetNumberOfBombs;
