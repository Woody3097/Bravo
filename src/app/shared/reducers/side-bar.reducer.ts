import {createReducer, on} from "@ngrx/store";
import {changeSideBar} from "../actions/side-bar.action";

export const initialState = false;

export const reducer = createReducer(
  initialState,
  on(changeSideBar, state => {
    return !state;
  })
);
