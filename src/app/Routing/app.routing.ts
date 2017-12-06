import { Routes, RouterModule } from '@angular/router';

import { SignUpComponent } from '../component/signup/sign-up.component';
import { WelcomePageComponent } from '../component/welcomecomponent/welcome-page.component';
import { ProfileComponent } from '../component/profile/profile.component';
import { CreateEventComponent } from '../component/createevent/create-event.component';
import { MapComponent } from '../component/map/map.component';
import { EventSummaryComponent } from '../component/eventsummary/event-summary.component';
import { ChatDialogComponent } from '../component/chatcomponent/chat-dialog/chat-dialog.component';
import { PaymentComponent } from '../component/paymentcomponent/payment.component';
import { AboutUsComponent } from '../component/aboutuscomponent/aboutus.component';

const appRoutes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: 'welcomepage', component: WelcomePageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'cevent', component: CreateEventComponent },
  { path: 'map', component: MapComponent },
  { path: 'summary/:id', component: EventSummaryComponent },
  { path: 'chatbot', component: ChatDialogComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: '', pathMatch: 'full', redirectTo: 'welcomepage' }
];

export const routing = RouterModule.forRoot(appRoutes);