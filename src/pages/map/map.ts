// import { Component } from '@angular/core';
// import { NavController } from 'ionic-angular';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// import {
//  GoogleMaps,
//  GoogleMap,
//  GoogleMapsEvent,
//  LatLng,
//  CameraPosition,
//  MarkerOptions,
//  Marker
// } from '@ionic-native/google-maps';

declare var google;
declare var cordova: any;


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  lat: any;
  lng: any;
  slabs: FirebaseObjectObservable<any[]>;
  slabsArray: FirebaseObjectObservable<any[]>;
  constructor(public af: AngularFire, private googleMaps: GoogleMaps, public plt: Platform, private geolocation: Geolocation) {
    // hypertrack = (<any>window).cordova.plugins.HyperTrack;
    this.getCurrentLocation();
    this.slabs = af.database.object('/slabs');


  }

 @ViewChild('map') mapElement: ElementRef;
  map: any;
  // Load map only after view is initialized
  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {

    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(this.lat, this.lng);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }, (err) => {
      console.log(err);
    });

  }

populateMap(){
  this.slabs.subscribe(slab => {
      this.addMarker(slab);
      console.log(slab);
    });
}

addMarker(slab){
 let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: slab.coords
  });

 let cnt = `<h4>${slab.title}</h4>`;          

 this.addInfoWindow(marker, cnt);

}

addInfoWindow(marker, cnt){

 let infoWindow = new google.maps.InfoWindow({
    content: cnt
  });

 google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });

}



  // loadMap() {
  //   // make sure to create following structure in your view.html file
  //   // and add a height (for example 100%) to it, else the map won't be visible
  //   // <ion-content>
  //   //  <div #map id="map" style="height:100%;"></div>
  //   // </ion-content>

  //   // create a new map by passing HTMLElement
  //   let element: HTMLElement = document.getElementById('map');

  //   let map: GoogleMap = this.googleMaps.create(element);

  //   // listen to MAP_READY event
  //   // You must wait for this event to fire before adding something to the map or modifying it in anyway
  //   map.one(GoogleMapsEvent.MAP_READY).then(
  //     () => {
  //       console.log('Map is ready!');
  //       // Now you can add elements to the map like the marker
  //     }
  //   );

  //   // create LatLng object
  //   let ionic: LatLng = new LatLng(this.lat, this.lng);

  //   // create CameraPosition
  //   let position: CameraPosition = {
  //     target: ionic,
  //     zoom: 18,
  //     tilt: 30
  //   };

  //   // move the map's camera to position
  //   map.moveCamera(position);

  //   // create new marker
  //   let markerOptions: MarkerOptions = {
  //     position: ionic,
  //     title: 'Ionic'
  //   };

  //   let marker: any = map.addMarker(markerOptions)
  //     .then((marker: Marker) => {
  //       marker.showInfoWindow();
  //     });
  // }

  click() {
    if (typeof cordova !== 'undefined') {
      cordova.plugins.HyperTrack.getOrCreateUser("Jakub", "+48799", "ABC", (e) => { console.log('success', e) }, (e) => { console.log('error', e) })
    }
  }

  startTracking() {
    cordova.plugins.HyperTrack.startTracking((e) => { console.log('success', e) }, (e) => { console.log('error', e) })
  }

  stopTracking() {
    cordova.plugins.HyperTrack.stopTracking((e) => { console.log('success', e) }, (e) => { console.log('error', e) })
  }

  getCurrentLocation() {
    cordova.plugins.HyperTrack.getCurrentLocation(
      (e) => {
        console.log('success', e);
        var obj = JSON.parse(e);
        this.lat = obj.mLatitude;
        this.lng = obj.mLongitude;
      },
      (e) => { console.log('error', e) })
  }




}
