import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { Http } from '@angular/http';
import { Upload } from '../data/upload';
import 'firebase/storage';



@Injectable()
export class UploadService {
  constructor(private db: AngularFireDatabase) { }
  uploads: FirebaseListObservable<Upload[]>;


  pushUpload(upload: Upload, basePath: string, name: string) {
    let storageRef = firebase.storage().ref();
    var user = firebase.auth().currentUser;
    let uploadTask = storageRef.child(basePath).child(name).put(upload.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        console.log("Upload successful");
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        this.saveFileData(upload.url);
      }
    );
  }
  // Writes the file details to the realtime db
  private saveFileData(url) {

    var user = firebase.auth().currentUser;
   this.db.object('users/'+user.uid).update({
            pic: url
        });
  }
}