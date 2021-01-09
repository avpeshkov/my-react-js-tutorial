import { combineReducers } from "redux";
import { moodsReducer } from "rdx/reducer/moodsSlice";
import { quotesReducer } from "rdx/reducer/quotesSlice";
import { currentUserReducer } from "rdx/reducer/currentUserSlice";

export const reducer = combineReducers({
    moodsReducer,
    quotesReducer,
    currentUserReducer,
});

export type TicTacToeGameState = ReturnType<typeof reducer>;