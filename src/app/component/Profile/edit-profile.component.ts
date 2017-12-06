import { Component, TemplateRef, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/observable';
import { FirebaseService } from '../../services/firebase.service';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-edit-profile',
  templateUrl: 'edit-profile.component.html'
})

   
   

export class EditProfileComponent {  
  items?: FirebaseListObservable<any>;
  constructor(private firebaseService: FirebaseService,
  private dialog: MatDialog){}

    ngOnInit(){

    // //   this.firebaseService.getUserDetails().subscribe(snapshots=>{
    // //     this.list=snapshots;
    // //     console.log(this.list);
    // //     snapshots.forEach(snapshot=>{
    // //       console.log(snapshot.key, snapshot.val());
    // //    });
    // //  });
    // // }


     firebase.auth().onAuthStateChanged((user) => {
            if(user != null){
                this.firebaseService.getUserDetails(user).subscribe(response=>{
                  this.items=response;
                });
            }
            else {
                return false;
            }
        })
  }

  onSubmit(form){
    console.log('Inside On Submit of Edit details: '+ form.name + form.address + form.phno + form.email);
    this.firebaseService.updateUserProfileDetails(form, firebase.auth().currentUser.email);


    let dialogRef = this.dialog.open(DialogConfirmationComponent, {
      });
  }

}


@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: 'dialog-confirmation.component.html',
})
export class DialogConfirmationComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmationComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

