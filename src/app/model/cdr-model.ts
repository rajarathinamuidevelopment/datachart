export class CdrModel { 
   
  "_embedded":{  
      "usageByIMSIMonthlyEntities":[  
         {  
            "downlinkBytes":number,
            "firstProcessTime":{  
               "millisSinceEpoch":number,
               "daysSinceEpoch":number,
               "month":number,
               "year":number,
               "day":number
            },
            "sliceMonth":number,
            "sliceYear":number,
            "totalBytes":number,
            "updatedProcessTime":{  
               "millisSinceEpoch":number,
               "daysSinceEpoch":number,
               "month":number,
               "year":number,
               "day":number
            },
            "uplinkBytes":number,
            "_links":{  
               "self":{  
                  "href": string
               },
               "imsi-monthly":{  
                  "href":string
               }
            }
         }]}
}
