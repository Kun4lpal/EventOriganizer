// import { Component, OnInit, Inject } from '@angular/core';
// import { MatDialog } from '@angular/material';
// import{ MatDialogRef } from '@angular/material';
// import{ MAT_DIALOG_DATA } from '@angular/material';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: 'login.component.html',
//   styleUrls: ['login.component.css']
// })



// export class MyLoginComponent implements OnInit {

//   constructor(public thisDialogRef: MatDialogRef<MyLoginComponent>, @Inject(MAT_DIALOG_DATA) public data: string,
//     private route: Router) { }

//   ngOnInit() { }

//   onCloseConfirm() {
//     this.thisDialogRef.close('Confirm');
//     this.route.navigate(['signup']);
//   }

//   onCloseCancel() {
//     this.thisDialogRef.close('Cancel');
//   }

// }


// HostBinding for router animations
import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material';
import{ MatDialogRef } from '@angular/material';
import{ MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { moveIn } from '../../animations/router.animations';
import { Http } from '@angular/http';

// service
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})


export class MyLoginComponent implements OnInit {
  error: any;
  red?: string;
  constructor(public thisDialogRef: MatDialogRef<MyLoginComponent>, @Inject(MAT_DIALOG_DATA) public data: string,
    private route: Router, private firebaseService: FirebaseService, private af: AngularFireAuth) { 
      console.log("I am in login component");
      this.af.auth.onAuthStateChanged((user) => {
        if (user != null) {
          console.log("I am in login component");
          //this.route.navigateByUrl('/welcomepage');
          this.thisDialogRef.close('Confirm');
        } else {
          // User is not logged in, redirect to where you need to.
        }
      });
    }

  ngOnInit() {  }

  loginUser(email, password) {

    var loginStatus: any;
    this.firebaseService.signInFirebaseWithEmailPassword(email, password).then((res)=>{      
            this.thisDialogRef.close('Confirm');
            this.route.navigate(['/welcomepage']);
        }).catch((err)=> {
            this.red = "#ff0000";
            console.log("asdasdasdas"+ err.message);
            //this.error = error.message;
            loginStatus= err;
        });
  }

  loginGoogle() {
    var loginStatus: any;
    this.firebaseService.signInWithGoogle().then(
        (success) => {
          console.log("Successully innn from login page")
          this.firebaseService.addUserCredentials();
          this.thisDialogRef.close('Confirm');
      }).catch(
        (err) => {
        this.error = err;
      })
  }


  loginFb() {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    console.log("tryng to login with firease");
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name','picture.type(small)'];
      var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
      console.log("In facebook" + token);
       this.http.get('https://graph.facebook.com/v2.5/me?access_token='+token+'&fields=id,name,first_name,last_name,email')
       .then(function() {
         console.log("in fb testssp")
       })
                   //.map(res => res.json())
                   .map(console.log("in fb map"))
                   .catch(console.log("error while fetching data from firebase")); 
    });
  }
// http.get('https://graph.facebook.com/v2.5/me?access_token='+token+'&fields=id,name,first_name,last_name,email')
      // .success(function(jsonService){
    
      //  });

    // this.af.auth.login({
    //   provider: AuthProviders.Facebook,
    //   method: AuthMethods.Popup,
    // }).then(
    //     (success) => {
    //     this.router.navigate(['/members']);
    //   }).catch(
    //     (err) => {
    //     this.error = err;
    //   })
  

  


  // loginUser(email, password) {
  //   this.firebaseService.postToFirebaseDummy(email, password);
  // }

  onCloseConfirm() {
    this.thisDialogRef.close('Confirm');
    this.route.navigate(['signup']);
  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

}
