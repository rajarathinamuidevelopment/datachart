import { Action } from '@ngrx/store';
import { CdrModel } from '../model/cdr-model';
import { ProviderData } from '../model/provider-data';
export const SEARCH = '[CdrModel] Search';
export const SEARCH_COMPLETE = '[CdrModel] Search Complete';
export const LOAD = '[CdrModel] Load';
export const SEARCH_FAIL = '[CdrModel] Search Fail';
export const PDATA_LOAD = '[ProviderData] Load';
export const FETCH_PROVIDERDATA = '[ProviderData]Fetch';
export const FETCH_FAIL =         '[ProviderData] Fetch Fail';

export class CdrSearchAction implements Action {
  readonly type = SEARCH;
  constructor(public payload: CdrModel[]) {
  }
}

export class CdrSearchCompleteAction implements Action {
  readonly type = SEARCH_COMPLETE;
  constructor(public payload: CdrModel[]) {

  }
}

export class CdrLoadAction implements Action {
  readonly type = LOAD;
  constructor(public payload: CdrModel) { }
}

export class CdrSearchActionFail implements Action {
  readonly type = SEARCH_FAIL;
  constructor(public payload: CdrModel[]) { }
}
/**
 * fOR ALL Provider service data fetch
 */

export class CdrProviderLoadAction implements Action {
  readonly type = PDATA_LOAD;
  constructor(public payload: string) {
  }
}

export class CdrProviderDataFetch implements Action {
  readonly type = FETCH_PROVIDERDATA;
  constructor(public payload: ProviderData[]) { }
}
export class CdrProviderDataFetchFail implements Action {
  readonly type = FETCH_FAIL;
  constructor(public payload: ProviderData[]) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = CdrSearchAction
  | CdrSearchCompleteAction
  | CdrLoadAction
  |CdrSearchActionFail
  | CdrProviderLoadAction
  | CdrProviderDataFetch
  | CdrProviderDataFetchFail;

