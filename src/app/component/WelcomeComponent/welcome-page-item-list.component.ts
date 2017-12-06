import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WelcomePageItemListService } from '../../services/welcome-page-item-list.service';
import { Event } from '../../data/event';
import { FirebaseService } from '../../services/firebase.service';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-welcome-page-item-list',
  templateUrl: 'welcome-page-item-list.component.html'
})

export class WelcomePageItemListComponent {
  
  listOfItems: Object;
  constructor(private welcomePageItemListService: WelcomePageItemListService,
    private firebaseService: FirebaseService,
    private router: Router){}

  ngOnInit(){
      this.firebaseService.getAllItems().subscribe(response=>{
        this.listOfItems=response;
        console.log("data from firebase"+JSON.stringify(response));
       });
  }

   onNavigateToSummary(element){

    Object.keys(this.listOfItems).map(key => {      
        if(this.listOfItems[key] === element){ 
          this.router.navigate(['/summary', key]);
         }});    
  }
}
