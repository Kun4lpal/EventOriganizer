import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class MapService{

    constructor(private http: Http){}

    getLocation(term: string):Promise<any> {
        return this.http.get(`http://maps.google.com/maps/api/geocode/json?address=${term}CA&sensor=false`)
                .toPromise()
                .then((response) => Promise.resolve(response.json()))
                .catch((error) => Promise.resolve(error.json()));
    }
}

/* put folowing code in component that needs to use this service --

this.mapService.getLocation(this.location)
        .then((response) => {
          this.result = response.results[0];
          
          console.log("asdasdasdasdasd" + JSON.stringify(this.result["geometry"]["location"]["lat"]));
        })
        .catch((error) => console.error(error));
*/