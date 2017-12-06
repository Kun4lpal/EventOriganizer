
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { Http } from '@angular/http';
import 'firebase/storage';
import { Upload } from '../data/upload';

@Injectable()
export class FirebaseService{

    constructor(private db: AngularFireDatabase,
        private http: Http){}

        uploads: FirebaseListObservable<Upload[]>;
    post: FirebaseObjectObservable<any>;
    x: Object;
    getAllItems(){
        return this.db.object('/events');
    }

    getListOfEvents(){
        return this.db.list('/events', { preserveSnapshot: true});
    }

    getEventItem(key){
        return this.db.object(`/events/${key}`);
    }

    postItem(email, password){
        firebase.database().ref('/').push({email: email, pass: password});
    }

    signInFirebaseWithEmailPassword(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    signInWithGoogle() {
        return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    updateUserProfileDetails(userDetails, emailadd){
        var user = firebase.auth().currentUser;
        console.log("Inside Update User Profile Details: "+user);
        //firebase.database().ref('users/').child(user.uid).child('name').set(userDetails.name);
        this.db.object('users/'+user.uid).update({
            address: userDetails.address,
            email: emailadd,
            name: userDetails.name,
            phno: userDetails.phno,
            gender: userDetails.gender,
            dob: userDetails.dob
        });
        // firebase.database().ref('users/'+user.uid).update({
        //     address: userDetails.address,
        //     email: userDetails.email,
        //     name: userDetails.name,
        //     phno: userDetails.phno
        // });
    }
    addUserCredentials() {
        var user = firebase.auth().currentUser;
        console.log("inside add creadentials: "+user);
        firebase.database().ref('users/' + user.uid).set ({
            email: user.email,
            name: user.displayName,
            pic: 'https://firebasestorage.googleapis.com/v0/b/venyou-1ca06.appspot.com/o/users%2Favatar-1577909_960_720.png?alt=media&token=aac627f0-8fce-4ae2-91c4-87b7eaf5b852'
        });
    }

    getUserDetails(user){        
        //var user = firebase.auth().currentUser;
        return this.db.object(`/users/${user.uid}`);
    }

    getUserRegisteredEvents(){
        var user = firebase.auth().currentUser;
        return this.db.object(`/users/${user.uid}/events`);
    }

    checkUserSignedIn() {
        return firebase.auth().currentUser;
        // if (firebase.auth().currentUser === null){
        //     return false;
        // }else return true;

        // firebase.auth().onAuthStateChanged((user) => {
        //     if(user != null){
        //         return true;
        //     }
        //     else {
        //         return false;
        //     }
        // })
    }

    registerUserEvent(event){
        var user = firebase.auth().currentUser;
        console.log("Inside Update User Profile Details: " + user);
        firebase.database().ref('users/').child(user.uid).child('events').child(event.name).set({
            city: event.city,
            date: event.date,
            description: event.description,
            fee: event.fee,
            host_name: event.host_name,
            host_rating: event.host_rating,
            id: event.id,
            image: event.image,
            latitude: event.latitude,
            longitude: event.longitude,
            name: event.name,
            state: event.state,
            street: event.street,
            time: event.time,
            venue: event.venue
        });

    }

    createEvent(event, upload: Upload, basePath: string, name: string, lat: string, lng: string){
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

        this.db.object(`/users/${firebase.auth().currentUser.uid}`).subscribe(res=>{
            this.x=res;
            firebase.database().ref('events/').child(event.name).set({
            city: event.city,
            date: event.date,
            description: event.description,
            fee: event.fee.toString(),
            host_name: this.x['name'],
            host_rating: '4',
            id: event.name,
            image: upload.url,
            latitude: lat,
            longitude: lng,
            name: event.name,
            state: event.state,
            street: event.street,
            time: event.time,
            venue: event.venue
        })
        });        
      }
    );
    }
    
}