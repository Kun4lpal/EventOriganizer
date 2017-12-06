import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms'; 
import { MatTabsModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';

import { AppComponent } from '../component/AppComponent/app.component';
import { HeaderComponent } from '../component/HeaderComponent/header.component';
import { FooterComponent } from '../component/FooterComponent/footer.component';
import { WelcomePageComponent } from '../component/welcomecomponent/welcome-page.component';
import { MyLoginComponent } from '../component/LoginComponent/login.component';
import { ArtistItemComponent } from '../component/ArtistItemComponent/artist-item.component';
import { SignUpComponent } from '../component/signup/sign-up.component';
import { WelcomePageItemListComponent } from '../component/welcomecomponent/welcome-page-item-list.component';
import { ProfileComponent } from '../component/profile/profile.component';
import { CreateEventComponent } from '../component/createevent/create-event.component';
import { ViewProfileComponent } from '../component/profile/view-profile.component';
import { EditProfileComponent } from '../component/profile/edit-profile.component';
import { MyEventsComponent } from '../component/profile/my-events.component';
import { MapComponent } from '../component/map/map.component';
import { EventSummaryComponent } from '../component/eventsummary/event-summary.component';
import { DialogConfirmationComponent } from '../component/profile/edit-profile.component';
import { EventRegisteredComponent } from '../component/eventsummary/event-summary.component';
import { EventCreatedComponent } from '../component/createevent/create-event.component';
import { PaymentComponent } from '../component/paymentcomponent/payment.component';
import { AboutUsComponent } from '../component/aboutuscomponent/aboutus.component';

import { WelcomePageItemListService } from '../services/welcome-page-item-list.service';
import { FirebaseService } from '../services/firebase.service';
import { UploadService } from '../services/upload.service';
import { MapService } from '../services/map.service';

import { SearchPipe } from '../Pipe/pipe.search';
import { ValuesPipe } from '../Pipe/pipe.search';
import { routing } from '../Routing/app.routing';

import { HttpModule } from '@angular/http';

import { firebaseConfig } from '../../environments/firebase.config';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database-deprecated';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import { AgmCoreModule } from '@agm/core';

import { SimpleNotificationsModule } from 'angular2-notifications';

import { Upload } from '../data/upload';
import { ChatModule } from '../component/chatcomponent/chat.module';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WelcomePageComponent,
    WelcomePageItemListComponent,
    ArtistItemComponent,
    SearchPipe,
    ValuesPipe,
    MyLoginComponent,
    DialogConfirmationComponent,
    SignUpComponent,
    ProfileComponent,
    CreateEventComponent,
    ViewProfileComponent,
    EditProfileComponent,
    MyEventsComponent,
    MapComponent,
    EventSummaryComponent,
    EventRegisteredComponent,
    EventCreatedComponent,
    PaymentComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatToolbarModule,
    routing,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig), // initializeApp is a factory method and we can to pass 
    // firebase configuration object
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD9co-cr3GNFjsipg_zOoFqYqtYgR6l-b4'
    }),
    SimpleNotificationsModule.forRoot(),
    ChatModule
  ],
  entryComponents: [
    MyLoginComponent,
    DialogConfirmationComponent,
    EventRegisteredComponent,
    EventCreatedComponent
  ],
  providers: [
    WelcomePageItemListService,
    FirebaseService,
    UploadService,
    MapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
