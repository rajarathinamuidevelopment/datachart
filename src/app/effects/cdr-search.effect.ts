import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { Component } from '@angular/core';
import * as cdrData from '../actions/cdr-search.action';
import { CdrSearchService } from '../services/cdr-search.service';
import { CdrModel } from '../model/cdr-model';

@Injectable()
export class cdrSearchEffect {
  @Effect()
  cdrSearch$: Observable<Action> = this.actions$
    .ofType(cdrData.SEARCH)
    .debounceTime(300)
    .map(toPayload)
    .switchMap(query => {
      if (query === '') {
        return empty();
      }
      const nextSearch$ = this.actions$.ofType(cdrData.SEARCH).skip(1);
      const result = this.CdrService.searchCdrData(query)
        .takeUntil(nextSearch$)
        .map(cdrSearchData => new cdrData.CdrSearchCompleteAction(cdrSearchData))
        .catch(error => of(new cdrData.CdrSearchActionFail([])))
      return result;
    });

  @Effect()
  fetchProviderDetails$: Observable<Action> = this.actions$
    .ofType(cdrData.PDATA_LOAD)
    .debounceTime(300)
    .map(toPayload)
    .switchMap(query => {
      const providerResult = this.CdrService.fetchProviderData()
        .map(providerData => new cdrData.CdrProviderDataFetch(providerData))
        .catch(error => of(new cdrData.CdrProviderDataFetchFail([])))
      return providerResult;
    });

  constructor(private actions$: Actions, private CdrService: CdrSearchService) {
  }
}

