import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-events',
  templateUrl: 'my-events.component.html'
})

export class MyEventsComponent {  
  title = 'app';
  myEvents: Object;
  flag=true;
  constructor(private firebaseService: FirebaseService,
  private router: Router){
      firebaseService.getUserRegisteredEvents()
        .subscribe(res=>{
            this.myEvents = res;
            
            Object.keys(this.myEvents).map(key=>{
              console.log("yo nigga "+ key);
              if(key == "$value")
                this.flag=true;
              else
                this.flag=false;
            })
;        })
  }

  onNavigateToSummary(element){

    Object.keys(this.myEvents).map(key => {      
        if(this.myEvents[key] === element){ 
          this.router.navigate(['/summary', key]);
         }});    
  }



}


