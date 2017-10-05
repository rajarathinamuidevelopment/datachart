import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdrComponent } from './containers/cdr.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/CDR',
    pathMatch: 'full'
  },  
  {
    path: 'CDR', component: CdrComponent,
    data: { name: 'Data Aggregation' }
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }


