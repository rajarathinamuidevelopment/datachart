import { Component } from '@angular/core';
import { TranslateLangService } from '../translate/translate-lang.service';

@Component({
  selector: 'app-trans-option',
  template: `
    <div class="row langBtnDiv pull-right hidden-xs hidden-sm"> 
        <a *ngFor="let lang of translateService.supportedLangs" (click)='translateService.selectLang(lang.value)' class="theame-link" href="javascript:void(0)">{{ lang.display }} </a>
    </div>
    
  `,
  styles: [`
    .langBtnDiv {
      margin-top: 20px;
      margin-right: 0px;
      margin-bottom: 10px;
    }
  `]
})
export class LanguageSelectComponent {
  constructor(private translateService: TranslateLangService)
  { }

}
