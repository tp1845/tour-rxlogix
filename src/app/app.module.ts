import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TourModule } from './modules/tour/tour.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TourModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }