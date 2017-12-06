// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// @Component({
//   selector: 'app-sign-up',
//   templateUrl: './sign-up.component.html',
//   styleUrls: ['./sign-up.component.css']
// })

// export class SignUpComponent {  
//   constructor(private router: Router){}
// }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { moveIn, fallIn } from '../../animations/router.animations';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})

export class SignUpComponent implements OnInit {  
  title = 'app';
  state: string = '';
  error: any;

  constructor(private router: Router, public af: AngularFireAuth){
    console.log("I am in signup component");
  }

  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.af.auth.createUserWithEmailAndPassword(formData.value.email, formData.value.password).then(
        (success) => {
        console.log(success);

        firebase.database().ref('users/' + this.af.auth.currentUser.uid).set ({
          email: formData.value.email,
          name: formData.value.name,
          pic: 'https://firebasestorage.googleapis.com/v0/b/venyou-1ca06.appspot.com/o/users%2Favatar-1577909_960_720.png?alt=media&token=aac627f0-8fce-4ae2-91c4-87b7eaf5b852'
        });


        this.router.navigate(['/welcomepage'])
      }).catch(
        (err) => {
        console.log(err);
        this.error = err;
      })
    }
  }


  ngOnInit() {
    
  }
}