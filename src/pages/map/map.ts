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
        {lat: 54.5329, lng: 18.5166, desc: 'Garbage! Garbage everywhere!'},
        {lat: 54.5332, lng: 18.5150, desc: 'Flood!'},
        {lat: 54.5337, lng: 18.5134, desc: 'Roof of the Shipyard leaks!'},
        {lat: 54.5347, lng: 18.5107, desc: 'Car accident!'},
        {lat: 54.5349, lng: 18.5271, desc: 'Hackathon participant fell asleep here!'},
        {lat: 54.5307, lng: 18.5182, desc: 'Silence, nothing happens!'},
        {lat: 54.5303, lng: 18.5104, desc: 'Tree lying on the rails!'}
      ];
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
      this.populateMap();
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
