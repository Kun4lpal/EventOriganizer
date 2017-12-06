import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { FirebaseService } from '../../services/firebase.service';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-view-profile',
  templateUrl: 'view-profile.component.html'
})


export class ViewProfileComponent implements OnInit {  

  items?: FirebaseListObservable<any>;

  constructor(private firebaseService: FirebaseService){}

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
}
