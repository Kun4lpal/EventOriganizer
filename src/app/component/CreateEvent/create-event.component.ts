import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Upload } from '../../data/upload';
import { UploadService } from '../../services/upload.service';
import { MapService } from '../../services/map.service';
import { FirebaseService } from '../../services/firebase.service';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-event',
  templateUrl: 'create-event.component.html',
  styleUrls: ['create-event.component.css']
})

export class CreateEventComponent {  
  title = 'app';
  selectedFiles: FileList;
  currentUpload?: Upload;
  result;

  constructor(private uploadService: UploadService,
  private mapService: MapService,
  private firebaseService: FirebaseService,
  private dialog: MatDialog){}

  onPhotoSelect(event){
      this.selectedFiles = event.target.files;
      console.log(this.selectedFiles);

      let file = this.selectedFiles.item(0);
      this.currentUpload = new Upload(file);
  }

  onSubmit(form){
    console.log(form.name + "\n" + form.date + "\n" + form.time + "\n");

    this.mapService.getLocation(form.street+" "+form.city+" "+form.state)
        .then((response) => {
          this.result = response.results[0];

          let lat = JSON.stringify(this.result["geometry"]["location"]["lat"]);
          let lng = JSON.stringify(this.result["geometry"]["location"]["lng"]);
          //this.uploadService.pushUpload(this.currentUpload, 'images', form.name+"_"+form.date);
          
          this.firebaseService.createEvent(form, this.currentUpload, 'images', form.name+"_"+form.date, lat.toString(), lng.toString());

          this.dialog.open(EventCreatedComponent,{});
        })
        .catch((error) => console.error(error));
  }
}


@Component({
  selector: 'app-event-created',
  templateUrl: 'event-created.component.html',
})
export class EventCreatedComponent {

  constructor(
    public dialogRef: MatDialogRef<EventCreatedComponent>,
    private route: Router) { }

  onOkClick(): void {
    this.dialogRef.close('confirm');
    this.route.navigate(['welcomepage']);
  }

}



