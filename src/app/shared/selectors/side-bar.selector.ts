import {createFeatureSelector, createSelector} from "@ngrx/store";

export const getMainState = createFeatureSelector<boolean>('SideBar');

export const selectSideBarState = createSelector(
  getMainState,
  state => state
);
