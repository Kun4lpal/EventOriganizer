import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: 'welcome-page.component.html'
})
export class WelcomePageComponent implements OnInit{
  constructor(private router: Router){}
  userLoggedIn: Boolean;
  
  ngOnInit(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user != null) {
          this.userLoggedIn = true;
          //this.route.navigateByUrl('/welcomepage');

        } else {
          this.userLoggedIn = false;
          // User is not logged in, redirect to where you need to.
        }
      });
  }
}