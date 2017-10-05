import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgControl, Validators, FormBuilder, FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
/*ngrx libraries imports*/
import { Store, provideStore } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { GoogleChart} from '../chart-directives/angular2-google-chart.directive';
/* all components here*/
import { AppComponent } from './containers/app.component';
import { CdrComponent } from './containers/cdr.component';
import { BreadcrumbComponent } from './components/breadcrumb.component';
import { LanguageSelectComponent } from './components/language-select.component';
/* all the services here*/
import { CdrSearchService } from './services/cdr-search.service';
/* action imports here*/
import * as cdrData from './actions/cdr-search.action';
/* reducer imports here*/
import { reducer } from './reducers/index';
/* effect imports here*/
import { cdrSearchEffect } from './effects/cdr-search.effect';

/* localization import */
import { TRANSLATION_PROVIDERS, TranslatePipe, TranslateService, TranslateLangService } from './translate';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,   
    EffectsModule.run(cdrSearchEffect),
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension() ,
    MyDatePickerModule   
  ],
  declarations: [
    AppComponent,
    BreadcrumbComponent,
    CdrComponent,
    LanguageSelectComponent,
    GoogleChart,
    TranslatePipe // Inject Translate Pipe here
  ],
  providers: [CdrSearchService,
     TRANSLATION_PROVIDERS, TranslateService, TranslateLangService],
     bootstrap: [AppComponent]
    })
export class AppModule { }
