import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './components/card/card.component';
import { LoaderComponent } from './components/loader/loader.component';
import {CustomDatePipePipe} from './pipe/CustomDatePipe.pipe';
import { HitComponent } from './page/hit/hit.component';
import { ComentCardComponent } from './components/coment-card/coment-card.component';
import { SelectComponent } from './components/form/select/select.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardComponent,
    LoaderComponent,
    CustomDatePipePipe,
    HitComponent,
    ComentCardComponent,
    SelectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
