import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CdrModel } from '../model/cdr-model';
import { ProviderData } from '../model/provider-data';
import * as myGlobals from '../mock/global-mockdata'; 
import {environment} from "../../environments/environment";

@Injectable()
export class CdrSearchService {
 urlString = '';
 url:string = environment.cdrApi;
 
  constructor(private http: Http) { }

  searchCdrData(query): Observable<CdrModel[]> {
    let param='provider';
    let dateParam='date';
    let queryImsiParam='';
    //console.log("query.selectedDateFromPicker", query.selectedDateFromPicker);
    if (query.imsi && query.provider) {
      param='imsi';
      dateParam='dailyWithDate';
      queryImsiParam = query.imsi+'/'
    }
   
     if ((query.period === 'pMonth' || query.period === 'cMonth')) { 
        if (query.dailyChecked === false) {
          this.urlString = this.url + param +`/monthly/`+ queryImsiParam +`${query.provider}/${query.month}/${query.year}`;
        } else{
          this.urlString = this.url + param +`/daily/`+ queryImsiParam +`${query.provider}/${query.month}/${query.year}?daily=true`;
        } 
     }
    if (query.period === 'date') {      
      // if(query.selectedToDate!== undefined && query.selectedFromDate!== undefined){
      //   this.urlString = `/CDRSearch/` + `imsi/dateRange/`+ queryImsiParam +query.provider+`/`+query.selectedFromDate+'/'+
      //   query.selectedToDate;
      // }else if(query.selectedDateFromPicker!== undefined && query.selectedDateFromPicker!= false){
      //   this.urlString = this.url + param +`/`+ dateParam +`/`+ queryImsiParam +`${query.provider}/${query.selectedDateFromPicker}`;
      // }
      if(query.selectedToDate!== undefined && query.selectedFromDate!== undefined){
        this.urlString = this.url + param +`/dateRange/`+ queryImsiParam +query.provider+`/`+query.selectedFromDate+'/'+
        query.selectedToDate;
      }else if(query.selectedFromDate!== undefined && query.selectedToDate == undefined){
        this.urlString = this.url + param +`/`+ dateParam +`/`+ queryImsiParam + query.provider +'/'+ query.selectedFromDate+' 00:00:00.000';
      }
    }    

    const result = this.http
      .get(this.urlString)
      .map(response => response.json() as CdrModel[], function (data) {
      });
    return result;
  }

  /* FETCH PROVIDER DETAILS */  
  fetchProviderData(): Observable<ProviderData[]> {
    const result = this.http
      .get(this.url +`serviceproviders`)
      .map(response => response.json() as ProviderData[], function (data) {});    
    return result;
  }

}
    

