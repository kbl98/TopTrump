import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StartpageComponent } from './startpage/startpage.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import { WinnerscreenComponent } from './winnerscreen/winnerscreen.component';
import { MycardsComponent } from './mycards/mycards.component';


@NgModule({
  declarations: [
    AppComponent,
    StartpageComponent,
    MainpageComponent,
    WinnerscreenComponent,
    MycardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
