import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { customStatsToolPanel } from './custom-stats-tool-panel.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, customStatsToolPanel],
  imports: [
    BrowserModule,
    FormsModule,
    AgGridModule.withComponents([customStatsToolPanel])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }