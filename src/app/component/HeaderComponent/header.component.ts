import { Component, OnInit } from '@angular/core';
import { ArtistItemComponent } from '../ArtistItemComponent/artist-item.component';
import { MatDialog } from '@angular/material';
import { MyLoginComponent } from '../LoginComponent/login.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { FirebaseService } from '../../services/firebase.service';

@Component({
    selector:'app-header',
    templateUrl:'header.component.html',
    styleUrls: ['../ArtistItemComponent/app.css']
})

export class HeaderComponent implements OnInit {
    //items: FirebaseListObservable<any[]>;
    listOfItems: Object;
    userLoggedIn: Boolean;

    constructor(private dialog: MatDialog,
    private firebaseService: FirebaseService,
    private router: Router){      
    }

    ngOnInit(){      
     //check if user is signed in or not 
     firebase.auth().onAuthStateChanged((user) => {
        if (user != null) {
          this.userLoggedIn = true;
          //this.route.navigateByUrl('/welcomepage');

        } else {

          this.userLoggedIn = false;
          // User is not logged in, redirect to where you need to.
        }
      });

     this.firebaseService.getAllItems().subscribe(response=>{
        this.listOfItems=response;
        console.log("data from firebase"+JSON.stringify(response));
       });      
    }

    onItemClick(element){      
      Object.keys(this.listOfItems).map(key => {      
        if(this.listOfItems[key] === element){ 
          this.router.navigate(['/summary', key]);
         }});   
    }
    

    openDialog(){
        let dialogRef = this.dialog.open(MyLoginComponent, {
        width: '600px',
        data: 'This text is passed into the dialog!'
      });

      dialogRef.afterClosed().subscribe(result => { });
    }

    logout(){
      console.log("Loggin out");
      firebase.auth().signOut();
      this.router.navigate(['/welcomepage']);
    }
}
