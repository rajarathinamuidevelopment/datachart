import { reducer } from './cdr-search.reducer';
import * as fromCdr from './cdr-search.reducer';
import { CdrSearchCompleteAction, CdrLoadAction } from '../actions/cdr-search.action';
import { CdrModel } from '../model/cdr-model';

describe('CDRSearchReducer', () => {
  describe('undefined action in cdr', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const result = reducer(undefined, action);
      expect(result).toEqual(fromCdr.initialState);
    });
  });
  describe('SEARCH_COMPLETE & LOAD_SUCCESS for CDR search', () => {
    function testCdrData(action) {
      const cdr1 = {
       "_embedded":{  
      "usageByIMSIMonthlyEntities":[  
         {  
            "downlinkBytes":32.0,
            "firstProcessTime":{  
               "millisSinceEpoch":1.4980032E12,
               "daysSinceEpoch":17338.0,
               "month":6.0,
               "year":2017.0,
               "day":21.0
            },
            "sliceMonth":5.0,
            "sliceYear":2017.0,
            "totalBytes":34.0,
            "updatedProcessTime":{  
               "millisSinceEpoch":1.5147648E12,
               "daysSinceEpoch":17532.0,
               "month":1.0,
               "year":2018.0,
               "day":1.0
            },
            "uplinkBytes":0.0,
            "_links":{  
               "self":{  
                  "href":"http://127.0.0.1:9099/imsi-monthly/UsageCompositeKeyForImsi(servedImsi=1019,%20slicePeriod=2017-05-01,%20serviceProvider=GTI)"
               },
               "imsi-monthly":{  
                  "href":"http://127.0.0.1:9099/imsi-monthly/UsageCompositeKeyForImsi(servedImsi=1019,%20slicePeriod=2017-05-01,%20serviceProvider=GTI)"
               }
            }
         }]}
      } as CdrModel;
      const cdr2 = {
       "_embedded":{  
      "usageByIMSIMonthlyEntities":[  
         {  
            "downlinkBytes":332.0,
            "firstProcessTime":{  
               "millisSinceEpoch":1.4980032E12,
               "daysSinceEpoch":173385.0,
               "month":7.0,
               "year":2016.0,
               "day":25.0
            },
            "sliceMonth":6.0,
            "sliceYear":2016.0,
            "totalBytes":35.0,
            "updatedProcessTime":{  
               "millisSinceEpoch":1.5147648E13,
               "daysSinceEpoch":17533.0,
               "month":2.0,
               "year":2019.0,
               "day":2.0
            },
            "uplinkBytes":0.0,
            "_links":{  
               "self":{  
                  "href":"http://127.0.0.1:9099/imsi-monthly/UsageCompositeKeyForImsi(servedImsi=1019,%20slicePeriod=2017-05-01,%20serviceProvider=GTI)"
               },
               "imsi-monthly":{  
                  "href":"http://127.0.0.1:9099/imsi-monthly/UsageCompositeKeyForImsi(servedImsi=1019,%20slicePeriod=2017-05-01,%20serviceProvider=GTI)"
               }
            }
         }]}
      } as CdrModel;
      const createAction = new action([cdr1, cdr2]);
      const expectedResult = {
        Cdata: [{
          111: cdr1,
          222: cdr2
        }]
      };
      const result = reducer(fromCdr.initialState, createAction);
      expect(result).toEqual(expectedResult);
    }
  });

  describe('Selections', () => {
    const cdr1 = {
       "_embedded":{  
      "usageByIMSIMonthlyEntities":[  
         {  
            "downlinkBytes":32.0,
            "firstProcessTime":{  
               "millisSinceEpoch":1.4980032E12,
               "daysSinceEpoch":17338.0,
               "month":6.0,
               "year":2017.0,
               "day":21.0
            },
            "sliceMonth":5.0,
            "sliceYear":2017.0,
            "totalBytes":34.0,
            "updatedProcessTime":{  
               "millisSinceEpoch":1.5147648E12,
               "daysSinceEpoch":17532.0,
               "month":1.0,
               "year":2018.0,
               "day":1.0
            },
            "uplinkBytes":0.0,
            "_links":{  
               "self":{  
                  "href":"http://127.0.0.1:9099/imsi-monthly/UsageCompositeKeyForImsi(servedImsi=1019,%20slicePeriod=2017-05-01,%20serviceProvider=GTI)"
               },
               "imsi-monthly":{  
                  "href":"http://127.0.0.1:9099/imsi-monthly/UsageCompositeKeyForImsi(servedImsi=1019,%20slicePeriod=2017-05-01,%20serviceProvider=GTI)"
               }
            }
         }]}
      } as CdrModel;
      const cdr2 = {
       "_embedded":{  
      "usageByIMSIMonthlyEntities":[  
         {  
            "downlinkBytes":332.0,
            "firstProcessTime":{  
               "millisSinceEpoch":1.4980032E12,
               "daysSinceEpoch":173385.0,
               "month":7.0,
               "year":2016.0,
               "day":25.0
            },
            "sliceMonth":6.0,
            "sliceYear":2016.0,
            "totalBytes":35.0,
            "updatedProcessTime":{  
               "millisSinceEpoch":1.5147648E13,
               "daysSinceEpoch":17533.0,
               "month":2.0,
               "year":2019.0,
               "day":2.0
            },
            "uplinkBytes":0.0,
            "_links":{  
               "self":{  
                  "href":"http://127.0.0.1:9099/imsi-monthly/UsageCompositeKeyForImsi(servedImsi=1019,%20slicePeriod=2017-05-01,%20serviceProvider=GTI)"
               },
               "imsi-monthly":{  
                  "href":"http://127.0.0.1:9099/imsi-monthly/UsageCompositeKeyForImsi(servedImsi=1019,%20slicePeriod=2017-05-01,%20serviceProvider=GTI)"
               }
            }
         }]}
      } as CdrModel;

    const state: fromCdr.State = {
      loading: false,
      query: [],
      Cdata: [cdr1, cdr2],
      param:'',
      providerData:[]
    };
    
    describe('getLoading', () => {
      it('should return CDR search loading value', () => {
        const result = fromCdr.getLoading(state);
        expect(result).toBe(state.loading);
      });
    });

    describe('getQuery', () => {
      it('should return CDR search request query data', () => {
        const result = fromCdr.getQuery(state);
        expect(result).toBe(state.query);
      });
    });
    describe('getData', () => {
      it('should return CDR search result data', () => {
        const result = fromCdr.getData(state);
        expect(result).toBe(state.Cdata);
      });
    });
    describe('getProviderData', () => {
      it('should return provider data', () => {
        const result = fromCdr.getproviderData(state);
        expect(result).toBe(state.providerData);
      });
    });
  });
});
