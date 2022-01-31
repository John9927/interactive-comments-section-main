import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CardComponent } from './components/home/card/card.component';
import { AddCardComponent } from './components/home/add-card/add-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardComponent,
    AddCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
