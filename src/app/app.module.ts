import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// import { RxStompService } from './rx-stomp.service';
// import { rxStompServiceFactory } from './rx-stomp-service-factory';
import { MessagesComponent } from './messages/messages.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [AppComponent, MessagesComponent],
  imports: [BrowserModule, CommonModule, FormsModule],
  providers: [
    // {
    //   provide: RxStompService,
    //   useFactory: rxStompServiceFactory,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
