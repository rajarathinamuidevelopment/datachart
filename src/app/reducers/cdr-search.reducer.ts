import * as cdrData from '../actions/cdr-search.action';
import { CdrModel } from '../model/cdr-model';
import { ProviderData } from '../model/provider-data';
import * as myGlobals from '../mock/global-mockdata';

export interface State {
  loading: boolean;
  query: CdrModel[];
  Cdata: CdrModel[];
  param: string;
  providerData: ProviderData[];
};

export const initialState: State = {
  loading: false,
  query: [],
  Cdata: [],
  param: '',
  providerData: []
};

export function reducer(state = initialState, action: cdrData.Actions): State {
  switch (action.type) {
    case cdrData.SEARCH: {
      const query = action.payload;
      return Object.assign({}, state, {
        query,
        loading: true,
        Cdata: []
      });
    }

    case cdrData.SEARCH_COMPLETE: {
      const cdrData = action.payload;     
      const result = {
        loading: true,
        query: state.query,
        Cdata: cdrData,
        param: '',
        providerData: state.providerData
      };
      return result;
    }
  case cdrData.SEARCH_FAIL: {
        const cdrErrorData = action.payload;
        const mockCdrData = {
          loading: false,
          query: [],
          Cdata: myGlobals.cdrData,
          param: '',
          providerData: state.providerData
        };
        return mockCdrData;
      }
    /*for provider data*/
    case cdrData.PDATA_LOAD: {
      const param = action.payload;
      return Object.assign({}, state, {
        param,
        loading: true
      });
    }
    case cdrData.FETCH_PROVIDERDATA: {
      const providerData = action.payload;
      const result = {
        loading: true,
        query: [],
        Cdata: [],
        param: state.param,
        providerData: providerData
      };
      return result;
    }
    case cdrData.FETCH_FAIL: {    
      const providerDataMock = action.payload;     
      const result = {
        loading: false,
        query: [],
        Cdata: [],
        param: state.param,
        providerData: myGlobals.providerData
      };
      return result;
    }
    default: {
      return state;
    }
  }
}

export const getQuery = (state: State) => state.query;
export const getLoading = (state: State) => state.loading;
export const getData = (state: State) => state.Cdata;
export const getproviderData = (state: State) => state.providerData;
