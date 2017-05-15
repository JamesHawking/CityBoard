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
  captureDataUrl: string;

  constructor(public navCtrl: NavController,af: AngularFire, db: AngularFireDatabase,private _auth: AuthService, private geolocation: Geolocation) {
    this.items = af.database.list('/slabs');

    this.geolocation.getCurrentPosition().then((position) => {
       this.coords = { latitude: position.coords.latitude, longitude: position.coords.longitude }
        console.log(position.coords.latitude, position.coords.longitude)}, (err) => {
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
