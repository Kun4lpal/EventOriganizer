import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { FirebaseService } from '../../services/firebase.service';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { UploadService } from '../../services/upload.service';
import { Upload } from '../../data/upload';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit{  
  items?: FirebaseListObservable<any>;

  constructor(private firebaseService: FirebaseService,
  private uploadService: UploadService){}

    selectedFiles: FileList;
    currentUpload: Upload;

    ngOnInit(){
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

  uploadProfileImage(event) {
      this.selectedFiles = event.target.files;
      console.log(this.selectedFiles);

      let file = this.selectedFiles.item(0);
      this.currentUpload = new Upload(file);

      this.uploadService.pushUpload(this.currentUpload, 'users', firebase.auth().currentUser.uid);
  }
}



