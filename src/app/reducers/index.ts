import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { environment } from '../../environments/environment';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';
import * as fromCdrSearch from './cdr-search.reducer';

export interface State { 
  cdrSearch: fromCdrSearch.State; 
  router: fromRouter.RouterState;
};

const reducers = { 
  cdrSearch: fromCdrSearch.reducer, 
  router: fromRouter.routerReducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
};

/* for cdr search */
export const getCdrSearchState = (state: State) => state.cdrSearch;
export const getCdrSearchQuery = createSelector(getCdrSearchState, fromCdrSearch.getQuery);
export const getCdrSearchLoading = createSelector(getCdrSearchState, fromCdrSearch.getLoading);
export const getCdrSearchData = createSelector(getCdrSearchState, fromCdrSearch.getData);
export const getproviderData = createSelector(getCdrSearchState, fromCdrSearch.getproviderData);

