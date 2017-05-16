import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';


import { AuthService } from '../../providers/auth-service';

import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';

@Component({
  selector: 'page-addSlabForm',
  templateUrl: 'addSlabForm.html'
})
export class AddSlabForm {
  items: FirebaseListObservable<any[]>;
  slab = {
    img_url: ''
  };
  coords = {};
  public base64Image: string;
  storagePicsRef: any;
  objectToSave: Array<any> = new Array;
  picUrl: any;

  constructor(private camera: Camera, public navCtrl: NavController, af: AngularFire, db: AngularFireDatabase, private _auth: AuthService, private geolocation: Geolocation) {
    this.items = af.database.list('/slabs');

    this.geolocation.getCurrentPosition().then((position) => {
      this.coords = { lat: position.coords.latitude, lng: position.coords.longitude }
      console.log(position.coords.latitude, position.coords.longitude)
    }, (err) => {
      console.log(err);
    });

       this.storagePicsRef = firebase.storage().ref().child('pictures/');
  

  }

  getPic() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData; //
      this.uploadPicture(imageData);
    }, (err) => {
      // Handle error
    });
  }

  uploadPicture(imgData: any) {
    var randomNumber = Math.floor(Math.random() * 256);
    console.log('Random number : ' + randomNumber);

    this.storagePicsRef.child(randomNumber + '.jpg').putString(imgData, 'base64', { contentType: 'image/jpeg' }).then((savedPicture) => {
      console.log('saved picture URL', savedPicture.downloadURL);
      this.picUrl = savedPicture.downloadURL;
      this.objectToSave.push(savedPicture.downloadURL);
      console.log('objectToSave : ' + JSON.stringify(this.objectToSave));
      this.storagePicsRef.set(this.objectToSave);
    });
  }
  // signInWithFacebook(): void {
  //   this._auth.signInWithFacebook()
  //     .then(() => this.onSignInSuccess());
  // }

  // private onSignInSuccess(): void {
  //   console.log("Facebook display name ",this._auth.displayName());
  // }

  addSlab(slab: any) {
    let key = this.items.push(slab.value).key;
    //console.log(slab.value);
    this.updateCoords(key, this.coords);
    this.updateStatus(key, 'Uncompleted');
    this.updatePic(key, this.picUrl);
    //console.log(slab.value);
  }

  updateCoords(key: string, coords: object) {
    this.items.update(key, { coords: coords });
  }
  updateStatus(key: string, status: string) {
    this.items.update(key, { status: status });
  }
  updatePic(key: string, url: string) {
    this.items.update(key, { img_url: url });
  }

  callHT() {

  }
}
