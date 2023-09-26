import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StationResultComponent } from './components/station-result/station-result.component';

@NgModule({
  imports: [BrowserModule, FormsModule, StationResultComponent],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
