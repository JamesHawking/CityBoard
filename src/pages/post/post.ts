import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Events } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the Post page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var google;
declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage implements OnInit {
  slab: FirebaseObjectObservable<any>;
  item = {
    coords: {
      lat: 0,
      lng: 0
    }
  };

  constructor(public af: AngularFire, public events: Events, public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) {
    let key = navParams.get('key');
    this.slab = af.database.object('/slabs/' + key, { preserveSnapshot: true });
    this.slab.subscribe(snapshot => {
      this.item = snapshot.val();
    });
  }

  @ViewChild('map') mapElement: ElementRef;
  map: any;


  ionViewDidLoad() {
    this.loadMap();
    
  }

  loadMap() {

    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(this.item.coords.lat, this.item.coords.lng);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker(this.item.coords.lat, this.item.coords.lng);
    }, (err) => {
      console.log(err);
    });

  }

  addMarker(lat: number, lng: number, desc?: string): void {

    let latLng = new google.maps.LatLng(lat, lng);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
    });


  }


  beginTask() {
    cordova.plugins.HyperTrack.startTracking((e) => { console.log('success', e) }, (e) => { console.log('error', e) });


  }

  getCurrentLocation() {
    cordova.plugins.HyperTrack.getCurrentLocation(
      (e) => {
        console.log('success', e);
        var obj = JSON.parse(e);
        console.log(obj.mLatitude + ', ' + obj.mLongitude)
      },
      (e) => { console.log('error', e) });
  }

  completeTask() {
    cordova.plugins.HyperTrack.stopTracking((e) => { console.log('success', e) }, (e) => { console.log('error', e) })
  }

  ngOnInit() {
    this.getCurrentLocation();
  }



}
