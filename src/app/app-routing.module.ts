import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './page/home/home.component';
import {HitComponent} from './page/hit/hit.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'hit/:id', component: HitComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
