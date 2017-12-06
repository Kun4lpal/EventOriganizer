import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
})
export class MapComponent implements OnInit{


    zoom: number = 10;

    lat: number = 43.048122;
    lng: number = -76.147424;

    markers: marker[] = []

    listOfItems: Object;

    constructor(private firebaseService: FirebaseService,
        private router: Router){}

    ngOnInit(){
            this.firebaseService.getListOfEvents().subscribe(snapshots=>{
                snapshots.forEach(snapshot => {

                    this.markers.push({
                        name: snapshot.val()["name"],
                        lat: +snapshot.val()["latitude"],
                        lng: +snapshot.val()["longitude"],
                        draggable: false
                    });

                    console.log(snapshot.key, snapshot.val()["latitude"]);

                });
            
          console.log(this.markers);
        })
    }

    infoWindowClicked(name){
        this.firebaseService.getAllItems().subscribe(response=>{
            this.listOfItems=response;

            Object.keys(this.listOfItems).map(key => {      
                if(this.listOfItems[key]["name"] ===  name){
                    this.router.navigate(['/summary',key]);
                }
            }
        );
        });    
    }
}

interface marker{
        name?:string;
        lat:number;
        lng:number;
        draggable:boolean;
}