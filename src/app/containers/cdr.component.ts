import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';
import { Store, provideStore } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as cdrData from '../actions/cdr-search.action';
import { CdrModel } from '../model/cdr-model';
import { ProviderData } from '../model/provider-data';
import { DatePipe } from '@angular/common';
import { TranslateLangService } from '../translate/translate-lang.service';
import * as myGlobals from '../mock/global-mockdata';
import { CdrSearchService } from '../services/cdr-search.service';
import {IMyDpOptions} from 'mydatepicker';

@Component({
  selector: 'cdr',
  templateUrl: '../templates/cdr.component.html',
  styleUrls: ['../styles/cdr.component.css'],
  providers: [DatePipe]
})
export class CdrComponent implements  OnInit {
  selectedOption = 'date';
  dailyChecked = true;
  searchResult = false;
  imsiInput: string;
  //imsiInput = '10002';
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 
                'September', 'October', 'November', 'December'];
  searchCdrQuery$: any;
  cData$: Observable<CdrModel[]>;
  providerData$: Observable<ProviderData[]>;
  loading$: any;
  CdrData = [];
  data = [];
  selectedDateFromPicker: any;
  selectedDate:any;
  month: any; 
  year: any;
  isShowDate = 0;
  isCdrLoaded = false;
  providerData = [];
  uplinkBytes: number;
  downlinkBytes: number;
  barchartData = [];
  barHeight: any;
  groupBarWidth: string;
  isApiError: Boolean;
  tableHeight: number;
  selectedToDate: any;
  selectedFromDate: any;
  errMsg: string='';
  isSearchButtonEnabled: number= 0;  
  selectedDateRange = [];
  
  constructor(private store: Store<fromRoot.State>, public datepipe: DatePipe, 
    private translateService: TranslateLangService) {
    this.searchCdrQuery$ = store.select(fromRoot.getCdrSearchQuery).take(1);
    this.cData$ = store.select(fromRoot.getCdrSearchData);
    this.providerData$ = store.select(fromRoot.getproviderData);  
    this.cData$.subscribe((value) => { 
      this.barchartData=[];
      this.barchartData[0]=['', 'Uplink Bytes', 'Downlink Bytes']; /* the default bar chart data */
      if(value.length !== 0){
        let  CDRArr=[];
        let embeddedKey = value['_embedded']?value['_embedded']:'';
        if(embeddedKey!== ''){ 
          /*if only provider*/
          let usageByMonthlyKey = embeddedKey['usageByProviderMonthlyEntities']?
                                  embeddedKey['usageByProviderMonthlyEntities']:''; 
          let usageByDailyKey = embeddedKey['usageByProviderDailyEntities']?
                                embeddedKey['usageByProviderDailyEntities']:'';
          let usageByHourlyKey = embeddedKey['usageByProviderDailyEntities']?
                                embeddedKey['usageByProviderDailyEntities']:'';
          
          if(this.imsiInput !== undefined && this.imsiInput !== ''){ /*for imsi+ provider*/
            usageByMonthlyKey = embeddedKey['usageByIMSIMonthlyEntities']?
                                embeddedKey['usageByIMSIMonthlyEntities']:''; 
            usageByDailyKey = embeddedKey['usageByIMSIDailyEntities']?
                              embeddedKey['usageByIMSIDailyEntities']:'';
            usageByHourlyKey = embeddedKey['usageByIMSIHourlyEntities']?
                                embeddedKey['usageByIMSIHourlyEntities']:'';
          }

          if(!this.dailyChecked && this.selectedOption !== 'date'){           
                    
            CDRArr = usageByMonthlyKey;            
          }else{
            CDRArr = usageByHourlyKey?usageByHourlyKey:usageByDailyKey;
          }
        }
        this.CdrData = CDRArr;
        this.isCdrLoaded = true;        
      }     
      
      this.barHeight = this.CdrData.length *65; /*  for dynamic height of bar chart */
      this.tableHeight = this.barHeight;  /*  for dynamic height of table*/      
      /* code for the bar chart data */
      for(let i=0; i < this.CdrData.length; i++){
        if( this.dailyChecked && (this.CdrData[i].uplinkBytes)!==undefined ||this.CdrData[i].uplinkBytes){          
          this.barchartData.push(['', this.CdrData[i].uplinkBytes, this.CdrData[i].downlinkBytes ]); 
        }     
      }/* code for the pie chart data */
      if(this.CdrData.length === 1 && this.CdrData[0]!== undefined){
        this.uplinkBytes = this.CdrData[0].uplinkBytes;
        this.downlinkBytes = this.CdrData[0].downlinkBytes;  
      }     
      return value;      
    });  /* eof code for the charts data */   
    
    /* for dropdown */    
    this.loading$ = store.select(fromRoot.getCdrSearchLoading);
    this.loading$.subscribe(value => {
      this.isApiError = value;
    });

    this.providerData$.subscribe(value => {     
      if(value.length !== 0){
          this.providerData = value['_embedded']['providerListEntities'];
                                   
        }                                      
    });
  };

  clearResult(){
    this.CdrData = [];
    this.searchResult = false;
  };

  ngOnInit() {   
    this.fetchProviderData();
  };

  fetchProviderData() {
    /*action for getting data to provider dropdown dispatched*/
    this.store.dispatch(new cdrData.CdrProviderLoadAction('serviceproviders'));
  };

  getSearchEnabled(inputFieldName, selectedProviderVal){     
    if(selectedProviderVal=='Select' || selectedProviderVal==null){ 
      this.isSearchButtonEnabled=0;      
    }
    if(inputFieldName=='provider' && (selectedProviderVal!=='Select')){
        if(this.selectedOption =='pMonth'|| this.selectedOption =='cMonth' || this.selectedFromDate!== undefined){
          this.isSearchButtonEnabled=1;
      }
    }
    if(inputFieldName =='period' && selectedProviderVal!== 'Select'){
      if(this.selectedOption =='pMonth'||this.selectedOption =='cMonth'){
        this.selectedToDate= undefined;
        this.selectedFromDate= undefined;
        this.isSearchButtonEnabled=1;
      }else{
        this.isSearchButtonEnabled=0;
      }
    }
    if(inputFieldName =='from' && selectedProviderVal!== 'Select'){
      if(this.selectedFromDate!== undefined)
          this.isSearchButtonEnabled=1;
    }    
  }

  selectDaily() {
    this.dailyChecked = !this.dailyChecked;
  };

  getSearchResult(query: string, term: string) { 
    this.errMsg='';
    this.isShowDate = 0;
    this.CdrData = [];

    if(term == 'Select'){
      this.errMsg="Please select the Provider";
      return false;
    }
    if(this.selectedOption == 'date'){       
      //if(this.selectedDateFromPicker== undefined ){
        if(this.selectedFromDate == undefined){
          this.errMsg="Please select proper date";
          return false;
        }
      //}
    } 
    if(this.selectedToDate!== undefined && this.selectedFromDate!== undefined){
      this.isShowDate = 1;
      if(this.selectedToDate < this.selectedFromDate){
        this.errMsg="'From' date must be lesser than 'To' date";
          return false;
      }
    }  else{
      this.isShowDate = 0;
    }
    

    this.isCdrLoaded = false;
    this.searchResult = true;

    if (this.searchResult === true && this.dailyChecked === true && this.selectedOption !== 'date') {     
      this.isShowDate = 1;
    }
    /*for Month*/
    this.month = new Date().getMonth();
    this.year = new Date().getFullYear();
    if(this.selectedOption === 'cMonth'){
      if(this.month < 12){
        this.month++;
      }
      else{
        this.month = 1;
        this.year = this.year + 1;
      }
    }
     
    this.selectedDateRange = [this.selectedFromDate,this.selectedToDate]; /*For the results message to show for date range*/
    const reqParams = [];
    reqParams['imsi'] = query;
    reqParams['period'] = this.selectedOption;
    reqParams['dailyChecked'] = this.dailyChecked;
    reqParams['year'] = this.year;
    reqParams['month'] = this.month;
    //reqParams['selectedDateFromPicker'] = this.selectedDateFromPicker,
    reqParams['provider'] = term.split('-')[1];
    reqParams['selectedToDate']=this.selectedToDate;   
    reqParams['selectedFromDate']=this.selectedFromDate;     
    this.store.dispatch(new cdrData.CdrSearchAction(reqParams)); /*action for search is getting dispatched*/
  };

  fromYr: number;
  fromMonth: number;
  fromDay: number;
  mnth = (new Date()).getMonth()+1 //months from 1-12
  day = (new Date()).getDate()+1;
  yr = (new Date()).getFullYear();
  private myDatePickerOptionsFrom: IMyDpOptions = {  
    dateFormat: 'mm/dd/yyyy',
    //disableUntil:{year: 2017, month: this.mnth-6, day: this.day},
    disableSince: {year: this.yr, month: this.mnth, day: this.day}
    
  };

  getDateRange(date, param, provider) {   
     let formattedDate = date.formatted; 
        formattedDate = formattedDate.replace(/(\d\d)\/(\d\d)\/(\d{4})/, '$3-$1-$2');   
     if (formattedDate == undefined || formattedDate.length == 0){
       if(param=='from'){
         this.isSearchButtonEnabled=0;
         this.selectedFromDate= undefined;
         this.fromYr=undefined;
         this.fromMonth=undefined;
         this.fromDay=undefined;
       }if(param=='to')  {
         this.selectedToDate= undefined;
       }     
      return;
     };   
      if(param == 'from'){ 
        this.selectedFromDate = formattedDate;       
        this.fromYr=date.date.year;
        this.fromMonth=date.date.month;
        this.fromDay=date.date.day;
        this.getSearchEnabled('from', provider);
      }else if (param == 'to') {      
        this.selectedToDate = formattedDate;           
      }
  }
    
  
  // getDateRange(date, param, provider) {   
  //    if (date == undefined || date.length == 0){
  //      if(param=='from'){
  //        this.isSearchButtonEnabled=0;
  //        this.selectedFromDate= undefined;
  //      }if(param=='to')  {
  //        this.selectedToDate= undefined;
  //      }     
  //     return;
  //    }//this.selectedDateFromPicker= undefined;     
  //     let formattedDate = date.replace(/(\d\d)\/(\d\d)\/(\d{4})/, '$3-$1-$2');
  //     if(param == 'from'){ 
  //       this.selectedFromDate = formattedDate;
  //       this.getSearchEnabled('from', provider);
  //     }else if (param == 'to') {      
  //       this.selectedToDate = formattedDate;           
  //     }
  // };   
  pie_ChartOptions = { /* code for the pie chart style */
      title: '',
      width: 'auto',
      height: 'auto',
      legend: { position: 'top', maxLines: 3 , textStyle: {fontSize: 12}},
      pieSliceText: 'value',
      colors: ['#0f6eb5', '#b7d0f1'],
      pieSliceBorderColor:'transparent',
      sliceVisibilityThreshold: 'none'      
    };
 
}

