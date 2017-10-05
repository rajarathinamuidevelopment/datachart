import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { cdrSearchEffect } from './cdr-search.effect';
import { CdrSearchService } from '../services/cdr-search.service';
import { CdrModel } from '../model/cdr-model';
import { ProviderData } from '../model/provider-data';
import { Observable } from 'rxjs/Observable';
import { CdrSearchAction, CdrSearchCompleteAction, CdrProviderDataFetch, CdrProviderLoadAction,
   CdrSearchActionFail } 
from '../actions/cdr-search.action';
describe('CdrEffects', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      cdrSearchEffect,
      {
        provide: CdrSearchService,
        useValue: jasmine.createSpyObj('cdrSearchService', ['searchCdrData', 'fetchProviderData'])
      }
    ]
  }));

  function setup(params?: { searchCdrReturnValue: any }) {
    const cdrSearchService = TestBed.get(CdrSearchService);    
    if (params) {
      cdrSearchService.searchCdrData.and.returnValue(params.searchCdrReturnValue);     
    }
    return {
      runner: TestBed.get(EffectsRunner),
      cdrSearchEffect: TestBed.get(cdrSearchEffect)
    };
  }
  function setupProvider(params?: { searchCdrReturnValue: any }){
    const cdrSearchService = TestBed.get(CdrSearchService);        
      cdrSearchService.fetchProviderData.and.returnValue(params.searchCdrReturnValue);
     
   let  res= {
      runner: TestBed.get(EffectsRunner),
      cdrSearchEffect: TestBed.get(cdrSearchEffect)
    };
    return res;
  }

  describe('cdrSearch$', () => {
    it('should return a new cdr.SearchCompleteAction, with the data, on success, after the de-bounce', 
    fakeAsync(() => {
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
      const cdrs = [cdr1, cdr2];

      const { runner, cdrSearchEffect } = setup({ searchCdrReturnValue: Observable.of(cdrs) });

      const expectedResult = new CdrSearchCompleteAction(cdrs);
      runner.queue(new CdrSearchAction(cdrs));

      let result = null;
      cdrSearchEffect.cdrSearch$.subscribe(_result => result = _result);
      tick(299); // test de-bounce
      expect(result).toBe(null);
      tick(300);
      expect(result).toEqual(expectedResult);
    }));

    it('cdr: should return a new cdr.SearchCompleteAction, with an empty array, if the cdrs service throws',
     fakeAsync(() => {
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
      const cdrs = [cdr1, cdr2];

      const { runner, cdrSearchEffect } = setup({ searchCdrReturnValue: Observable.throw(new Error()) });

      const expectedResult = new CdrSearchActionFail([]);
      runner.queue(new CdrSearchAction(cdrs));
      let result = null;
      cdrSearchEffect.cdrSearch$.subscribe(_result => result = _result);
      tick(299); // test de-bounce
      expect(result).toBe(null);
      tick(300);
      expect(result).toEqual(expectedResult);
    }));

    it(`cdr: should not do anything if the query is an empty string`, fakeAsync(() => {
      const { runner, cdrSearchEffect } = setup();
      runner.queue(new CdrSearchAction([]));
      let result = null;
      cdrSearchEffect.cdrSearch$.subscribe({
        next: () => result = false,
        complete: () => result = false,
        error: () => result = false
      });
      tick(300);
      expect(result).toBe(false);
    }));

  });
  describe('getProviderData$', () => {
    it('should return a provider data', fakeAsync(() => {
       const proData = {
         "_embedded":{  
            "providerListEntities":[  
              {  
                  "serviceProvider":"Provider",
                  "serviceProvideName":"One",
                  "_links":{  
                    "self":{  
                        "href":""
                    },
                    "provider-list":{  
                        "href":""
                    }
                  }
              },
              {  
                  "serviceProvider":"Provider",
                  "serviceProvideName":"Two",
                  "_links":{  
                    "self":{  
                        "href":""
                    },
                    "provider-list":{  
                        "href":""
                    }
                  }
              }
            ]
        },
        "_links":{  
            "self":{  
              "href":""
            },
            "profile":{  
              "href":""
            }
        }
      } as  ProviderData;
      
      const proDatas = [proData];
      const { runner, cdrSearchEffect } = setupProvider({ searchCdrReturnValue: Observable.of(proDatas) });     
          
      const expectedResult = new CdrProviderDataFetch(proDatas);
      runner.queue(new CdrProviderLoadAction(''));
      let result = null;

      cdrSearchEffect.fetchProviderDetails$.subscribe(_result => result = _result); 
      console.log("cdrSearchEffect.fetchProviderDetails$", cdrSearchEffect.fetchProviderDetails$);     
      tick(299); // test de-bounce
      expect(result).toBe(null);
      tick(300);
      console.log("result", result); 
      expect(result).toEqual(expectedResult);
    }));
  });

});
