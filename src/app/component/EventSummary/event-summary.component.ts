import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-summary',
  templateUrl: 'event-summary.component.html',
  styleUrls: ['event-summary.component.css']
})



export class EventSummaryComponent implements OnInit{

    paramsSubscription;
    key='';
    event;
    userDetail;

    ngOnInit(){}
    //registered: boolean;
    regbutton: boolean;
    unregbutton: boolean;
    
    constructor(private route: ActivatedRoute,
        private firebaseService: FirebaseService,
        private dialog: MatDialog){
            this.regbutton = false;
            this.unregbutton = false;
            this.paramsSubscription=this.route.params
                .subscribe(params => {
                    console.log(params['id']);
                    this.key=params['id'];
                    this.getEventItem(this.key);
                    this.checkEventAttending();
                });
    }

    getEventItem(key){
        this.firebaseService.getEventItem(key)
            .subscribe(res=>{
                this.event=res;
                console.log(JSON.stringify(res));
            })
    }

    RegisterEvent(){
        this.firebaseService.registerUserEvent(this.event);
        this.dialog.open(EventRegisteredComponent, {
             data: { event: this.event }
        });
        this.regbutton=false;
        this.checkEventAttending();
    }

    ngOnDestroy() {
        this.paramsSubscription.unsubscribe();
    }

    checkEventAttending(){
        firebase.auth().onAuthStateChanged((user) => {
            if(user != null){
                this.firebaseService.getUserDetails(user)
            .subscribe(res=>{
                this.userDetail = res;
                if(this.userDetail["events"]){
                        if(this.userDetail["events"][this.event["name"]]){
                        this.unregbutton = true;
                        this.regbutton=false;
                    }else{
                        this.regbutton = true;
                        this.unregbutton=false;
                    }
                }else{
                    this.regbutton = true;
                    this.unregbutton = false;
                }
                
            })
            }
            else {
                return false;
            }
        })        
    }
}  

@Component({
  selector: 'app-event-registered',
  templateUrl: 'event-registered.component.html',
})
export class EventRegisteredComponent {
    private fee: number;
  constructor(
    public dialogRef: MatDialogRef<EventRegisteredComponent>,
    private route: Router,
    @Inject(MAT_DIALOG_DATA) public event: any) {
        
        this.fee = +this.event.event["fee"];
        console.log("yayayaya "+this.fee);
     }

  onNoClick(): void {
    this.dialogRef.close('confirm');
    this.route.navigate(['welcomepage']);
  }
}


