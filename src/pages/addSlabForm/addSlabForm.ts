import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';

import { AuthService } from '../../providers/auth-service';

import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-addSlabForm',
  templateUrl: 'addSlabForm.html'
})
export class AddSlabForm {
  items: FirebaseListObservable<any[]>;
  slab = {};
  coords = {};
//  public base64Image: string;

  constructor(public navCtrl: NavController,af: AngularFire, db: AngularFireDatabase,private _auth: AuthService, private geolocation: Geolocation) {
    this.items = af.database.list('/slabs');

    this.geolocation.getCurrentPosition().then((position) => {
       this.coords = { lat: position.coords.latitude, lng: position.coords.longitude }
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


    addSlab(slab: any) {
     let key = this.items.push(slab.value).key;
      //console.log(slab.value);
      this.updateCoords(key, this.coords);
      this.updateStatus(key, 'Uncompleted');
     //console.log(slab.value);
    }

    updateCoords(key: string, coords: any) {
       this.items.update(key, { coords: coords });
    }
    updateStatus(key: string, status: string) {
       this.items.update(key, { status: status });
    }

    callHT(){
      
    }
}
