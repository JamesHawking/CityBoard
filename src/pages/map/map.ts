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
import {Observable} from 'rxjs/Observable';
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

export class Slab {
  title: any;
  coords = { lat: Number, lng: Number}
}

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  lat: any;
  lng: any;
  slabs: FirebaseObjectObservable<any[]>;
  slabsArray: FirebaseObjectObservable<any[]>;
  markers: any = [];

neighborhoods = [
        {lat: 54.5329, lng: 18.5165, desc: 'Atak!'},
        {lat: 54.5331, lng: 18.5163, desc: 'Śmieci!'},
        {lat: 54.5334, lng: 18.5161, desc: 'Śmieci!'},
        {lat: 54.5337, lng: 18.5159, desc: 'Śmieci!'},
        {lat: 54.5341, lng: 18.5152, desc: 'Śmieci!'},
        {lat: 54.5348, lng: 18.5162, desc: 'Śmieci!'},
        {lat: 54.5341, lng: 18.5171, desc: 'Śmieci!'}
      ];
  constructor(public af: AngularFire, private googleMaps: GoogleMaps, public plt: Platform, private geolocation: Geolocation) {
    // hypertrack = (<any>window).cordova.plugins.HyperTrack;
    this.getCurrentLocation();
    this.slabs = af.database.object('/slabs');
    this.populateMap();
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
  this.neighborhoods.map(nhdb => {
     this.addMarker(nhdb.lat, nhdb.lng, nhdb.desc);
  })
}




addMarker(lat: number, lng: number, desc: string): void {

    let latLng = new google.maps.LatLng(lat, lng);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      //icon: this.icons[feature].icon    //Doesn't do anything
    });

    this.markers.push(marker);
    this.addInfoWindow(marker, desc);

  }

addInfoWindow(marker, cnt){
 let infoWindow = new google.maps.InfoWindow({
    content: cnt
  });

 google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });

}

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
