import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';

import { AuthService } from '../../providers/auth-service';

import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';

// const options: CameraOptions = {
//   quality: 100,
//   destinationType: this.camera.DestinationType.DATA_URL,
//   encodingType: this.camera.EncodingType.JPEG,
//   mediaType: this.camera.MediaType.PICTURE
// }


@Component({
  selector: 'page-addSlabForm',
  templateUrl: 'addSlabForm.html'
})
export class AddSlabForm {
  items: FirebaseListObservable<any[]>;
  slab = {};
  coords = {};
//  public base64Image: string;

  constructor(private camera: Camera, public navCtrl: NavController,af: AngularFire, db: AngularFireDatabase,private _auth: AuthService, private geolocation: Geolocation) {
    this.items = af.database.list('/slabs');

    this.geolocation.getCurrentPosition().then((position) => {
       this.coords = { latitude: position.coords.latitude, longitude: position.coords.longitude }
        console.log(position.coords.latitude, position.coords.longitude)}, (err) => {
        console.log(err);
    });

  }

  // signInWithFacebook(): void {
  //   this._auth.signInWithFacebook()
  //     .then(() => this.onSignInSuccess());
  // }

  // private onSignInSuccess(): void {
  //   console.log("Facebook display name ",this._auth.displayName());
  // }

//   takePicture(){
//   Camera.getPicture({
//       destinationType: Camera.DestinationType.DATA_URL,
//       targetWidth: 1000,
//       targetHeight: 1000
//   }).then((imageData) => {
//     // imageData is a base64 encoded string
//       this.base64Image = "data:image/jpeg;base64," + imageData;
//   }, (err) => {
//       console.log(err);
//   });
// }


takePicture(){
  this.camera.getPicture().then((imageData) => {
   // imageData is either a base64 encoded string or a file URI
   // If it's base64:
   let base64Image = 'data:image/jpeg;base64,' + imageData;
   console.log('Pyk');
  }, (err) => {
   // Handle error
   console.log(err);
  });
}


    addSlab(slab: any) {
     let key = this.items.push(slab.value).key;
      //console.log(slab.value);
      this.updateCoords(key, this.coords);
     //console.log(slab.value);
    }

    updateCoords(key: string, coords: any) {
       this.items.update(key, { coords: coords });
    }
}
