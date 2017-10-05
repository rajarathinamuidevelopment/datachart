export let cdrSearchURL = '';

export const providerData: any=
{  
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
};   

export const cdrData: any = {  
   "_embedded":{  
      "usageByProviderHourlyEntities":[  
         {  
            "downlinkBytes":32.0,
            "firstProcessTime":{  
               "millisSinceEpoch":1.5147648E12,
               "daysSinceEpoch":17532.0,
               "month":1.0,
               "year":2018.0,
               "day":1.0
            },
            "sliceMonth":12.0,
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
            "key":{  
                "sliceMonth":"201706",
                "serviceProvider":"Two",
                "sliceYear":"2017",              
                "sliceDay":"20170601"
            },
            "sliceDay":1.0,
            "sliceHour":21.0,
            "_links":{  
               "self":{  
                  "href":""
               },
               "provider-hourly":{  
                  "href":""
               }
            }
         }
      ],
    
      "usageByProviderMonthlyEntities":[  
         {  
            "downlinkBytes":478.0,
            "firstProcessTime":{  
               "millisSinceEpoch":1.5011136E12,
               "daysSinceEpoch":17374.0,
               "month":7.0,
               "year":2017.0,
               "day":27.0
            },
            "sliceMonth":5.0,
            "sliceYear":2017.0,
            "totalBytes":548.0,
            "updatedProcessTime":{  
               "millisSinceEpoch":1.5147648E12,
               "daysSinceEpoch":17532.0,
               "month":1.0,
               "year":2018.0,
               "day":1.0
            },
            "uplinkBytes":54.0,
            "key":{  
              
               "sliceMonth":"201708",
               "serviceProvider":"Two",
               "sliceYear":"2017"              
            },
            "_links":{  
               "self":{  
                  "href":""
               },
               "provider-monthly":{  
                  "href":""
               }
            }
         }
      ],
      "usageByIMSIMonthlyEntities":[  
         {  
            "downlinkBytes":478.0,
            "firstProcessTime":{  
               "millisSinceEpoch":1.5011136E12,
               "daysSinceEpoch":17374.0,
               "month":7.0,
               "year":2017.0,
               "day":27.0
            },
            "sliceMonth":5.0,
            "sliceYear":2017.0,
            "totalBytes":548.0,
            "updatedProcessTime":{  
               "millisSinceEpoch":1.5147648E12,
               "daysSinceEpoch":17532.0,
               "month":1.0,
               "year":2018.0,
               "day":1.0
            },
            "uplinkBytes":54.0,
            "key":{  
               "sliceMonth":"201708",
               "serviceProvider":"Two",
               "servedImsi":"10000",
               "sliceYear":"2017"              
            },
            "_links":{  
               "self":{  
                  "href":""
               },
               "provider-monthly":{  
                  "href":""
               }
            }
         }
      ],
      "usageByProviderDailyEntities": [
            {
                "downlinkBytes": 34,
                "firstProcessTime": {
                    "millisSinceEpoch": 1496793600000,
                    "daysSinceEpoch": 17324,
                    "month": 6,
                    "year": 2017,
                    "day": 7
                },
                "sliceMonth": 5,
                "sliceYear": 2017,
                "totalBytes": 34,
                "updatedProcessTime": {
                    "millisSinceEpoch": 1539820800000,
                    "daysSinceEpoch": 17822,
                    "month": 10,
                    "year": 2018,
                    "day": 18
                },
                "uplinkBytes": 0,
                "key": {
                     "sliceMonth":"201706",
                     "serviceProvider":"Two",
                     "sliceYear":"2017",              
                     "sliceDay":"20170601"
                },
                "sliceDay": 1,
                "_links": {
                    "self": {
                        "href": ""
                    },
                    "provider-daily": {
                        "href": ""
                    }
                }
            },
            {
                "downlinkBytes": 38,
                "firstProcessTime": {
                    "millisSinceEpoch": 1498521600000,
                    "daysSinceEpoch": 17344,
                    "month": 6,
                    "year": 2017,
                    "day": 27
                },
                "sliceMonth": 5,
                "sliceYear": 2017,
                "totalBytes": 38,
                "updatedProcessTime": {
                    "millisSinceEpoch": 1514764800000,
                    "daysSinceEpoch": 17532,
                    "month": 1,
                    "year": 2018,
                    "day": 1
                },
                "uplinkBytes": 0,
                "key": {
                    "sliceMonth":"201706",
                     "serviceProvider":"Two",
                     "sliceYear":"2017",              
                     "sliceDay":"20170601"
                },
                "sliceDay": 2,
                "_links": {
                    "self": {
                        "href": ""
                    },
                    "provider-daily": {
                        "href": ""
                    }
                }
            }
            ],
"usageByIMSIDailyEntities": [
                {  
            "key":{  
               "sliceDay":"20170701",
               "serviceProvider":"Two",
               "servedImsi":"10002",
               "sliceYear":"2017",
               "sliceMonth":"201707"
            },
            "downlinkBytes":302.0,
            "totalBytes":912.0,
            "uplinkBytes":610.0,
            "_links":{  
               "self":{  
                  "href":""
               },
               "imsi-daily":{  
                  "href":""
               }
            }
         },
         {  
            "key":{  
               "sliceDay":"20170702",
               "serviceProvider":"Two",
               "servedImsi":"10002",
               "sliceYear":"2017",
               "sliceMonth":"201707"
            },
            "downlinkBytes":302.0,
            "totalBytes":912.0,
            "uplinkBytes":610.0,
            "_links":{  
               "self":{  
                  "href":""
               },
               "imsi-daily":{  
                  "href":""
               }
            }
         },
         {  
            "key":{  
               "sliceDay":"20170703",
               "serviceProvider":"Two",
               "servedImsi":"10002",
               "sliceYear":"2017",
               "sliceMonth":"201707"
            },
            "downlinkBytes":302.0,
            "totalBytes":912.0,
            "uplinkBytes":610.0,
            "_links":{  
               "self":{  
                  "href":""
               },
               "imsi-daily":{  
                  "href":""
               }
            }
         },
         {  
            "key":{  
               "sliceDay":"20170703",
               "serviceProvider":"Two",
               "servedImsi":"10002",
               "sliceYear":"2017",
               "sliceMonth":"201707"
            },
            "downlinkBytes":302.0,
            "totalBytes":912.0,
            "uplinkBytes":610.0,
            "_links":{  
               "self":{  
                  "href":""
               },
               "imsi-daily":{  
                  "href":""
               }
            }
         },
         {  
            "key":{  
               "sliceDay":"20170703",
               "serviceProvider":"Two",
               "servedImsi":"10002",
               "sliceYear":"2017",
               "sliceMonth":"201707"
            },
            "downlinkBytes":302.0,
            "totalBytes":913.0,
            "uplinkBytes":610.0,
            "_links":{  
               "self":{  
                  "href":""
               },
               "imsi-daily":{  
                  "href":""
               }
            }
         },
         {  
            "key":{  
               "sliceDay":"20170703",
               "serviceProvider":"Two",
               "servedImsi":"10002",
               "sliceYear":"2017",
               "sliceMonth":"201707"
            },
            "downlinkBytes":302.0,
            "totalBytes":913.0,
            "uplinkBytes":610.0,
            "_links":{  
               "self":{  
                  "href":""
               },
               "imsi-daily":{  
                  "href":""
               }
            }
         },{  
            "key":{  
               "sliceDay":"20170703",
               "serviceProvider":"Two",
               "servedImsi":"10002",
               "sliceYear":"2017",
               "sliceMonth":"201707"
            },
            "downlinkBytes":302.0,
            "totalBytes":913.0,
            "uplinkBytes":610.0,
            "_links":{  
               "self":{  
                  "href":""
               },
               "imsi-daily":{  
                  "href":""
               }
            }
         },{  
            "key":{  
               "sliceDay":"20170703",
               "serviceProvider":"Two",
               "servedImsi":"10002",
               "sliceYear":"2017",
               "sliceMonth":"201707"
            },
            "downlinkBytes":302.0,
            "totalBytes":913.0,
            "uplinkBytes":610.0,
            "_links":{  
               "self":{  
                  "href":""
               },
               "imsi-daily":{  
                  "href":""
               }
            }
         },{  
            "key":{  
               "sliceDay":"20170703",
               "serviceProvider":"Two",
               "servedImsi":"10002",
               "sliceYear":"2017",
               "sliceMonth":"201707"
            },
            "downlinkBytes":302.0,
            "totalBytes":913.0,
            "uplinkBytes":610.0,
            "_links":{  
               "self":{  
                  "href":""
               },
               "imsi-daily":{  
                  "href":""
               }
            }
         },{  
            "key":{  
               "sliceDay":"20170703",
               "serviceProvider":"Two",
               "servedImsi":"10002",
               "sliceYear":"2017",
               "sliceMonth":"201707"
            },
            "downlinkBytes":302.0,
            "totalBytes":913.0,
            "uplinkBytes":610.0,
            "_links":{  
               "self":{  
                  "href":""
               },
               "imsi-daily":{  
                  "href":""
               }
            }
         }
            ]
   },
   
}

