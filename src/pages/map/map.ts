// import { Component } from '@angular/core';
// import { NavController } from 'ionic-angular';

// import {
//  GoogleMaps,
//  GoogleMap,
//  GoogleMapsEvent,
//  LatLng,
//  CameraPosition,
//  MarkerOptions,
//  Marker
// } from '@ionic-native/google-maps';

import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
 
 @ViewChild('map') mapElement: ElementRef;
  map: any;
 
  constructor(public navCtrl: NavController, public geolocation: Geolocation) {
 
  }
 
  ionViewDidLoad(){
    this.loadMap();
  }
 
  loadMap(){
 
    this.geolocation.getCurrentPosition().then((position) => {
      console.log(position.coords.latitude, position.coords.longitude)
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
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

  addMarker(){
 
  let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
  });
 
  let content = "<h4>Information!</h4>";          
 
  this.addInfoWindow(marker, content);
 
}

addInfoWindow(marker, content){
 
  let infoWindow = new google.maps.InfoWindow({
    content: content
  });
 
  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });
 
}

//KOD DRUGI ---->

    // map: GoogleMap;
 
    // constructor(public navCtrl: NavController, public platform: Platform) {
    //     platform.ready().then(() => {
    //         this.loadMap();
    //     });
    // }
 
    // loadMap(){
 
    //     let location = new GoogleMapsLatLng(-34.9290,138.6010);
 
    //     this.map = new GoogleMap('map', {
    //       'backgroundColor': 'white',
    //       'controls': {
    //         'compass': true,
    //         'myLocationButton': true,
    //         'indoorPicker': true,
    //         'zoom': true
    //       },
    //       'gestures': {
    //         'scroll': true,
    //         'tilt': true,
    //         'rotate': true,
    //         'zoom': true
    //       },
    //       'camera': {
    //         'latLng': location,
    //         'tilt': 30,
    //         'zoom': 15,
    //         'bearing': 50
    //       }
    //     });
 
    //     this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
    //         console.log('Map is ready!');
    //     });
 
    // }

    // KOD TRZECI ---->

//      constructor(private googleMaps: GoogleMaps) {}

// // Load map only after view is initialized
// ngAfterViewInit() {
//  this.loadMap();
// }

// loadMap() {
//  // make sure to create following structure in your view.html file
//  // and add a height (for example 100%) to it, else the map won't be visible
//  // <ion-content>
//  //  <div #map id="map" style="height:100%;"></div>
//  // </ion-content>

//  // create a new map by passing HTMLElement
//  let element: HTMLElement = document.getElementById('map');

//  let map: GoogleMap = this.googleMaps.create(element);

//  // listen to MAP_READY event
//  // You must wait for this event to fire before adding something to the map or modifying it in anyway
//  map.one(GoogleMapsEvent.MAP_READY).then(
//    () => {
//      console.log('Map is ready!');
//      // Now you can add elements to the map like the marker
//    }
//  );

//  // create LatLng object
//  let ionic: LatLng = new LatLng(43.0741904,-89.3809802);

//  // create CameraPosition
//  let position: CameraPosition = {
//    target: ionic,
//    zoom: 18,
//    tilt: 30
//  };

//  // move the map's camera to position
//  map.moveCamera(position);

//  // create new marker
//  let markerOptions: MarkerOptions = {
//    position: ionic,
//    title: 'Ionic'
//  };

//  let marker: any = map.addMarker(markerOptions)
//    .then((marker: any) => {
//       marker.showInfoWindow();
//     });
//  }

}
