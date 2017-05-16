import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';
import { Headers, Http } from '@angular/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HypertrackProvider } from '../../providers/hypertrack/hypertrack';

declare var cordova: any;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  users: FirebaseListObservable<any[]>;
  places:  FirebaseListObservable<any[]>;
  events: FirebaseListObservable<any[]>;
  user = {};
  errorMessage: string;


  constructor(private htService: HypertrackProvider, private http: Http, public navCtrl: NavController, public navParams: NavParams, af: AngularFire, db: AngularFireDatabase) {
    this.users = af.database.list('/users');
  }

  addUser(user: any) {
    let key = this.users.push(user.value).key;
    cordova.plugins.HyperTrack.getOrCreateUser(user.value.name, user.value.phone, key, (e) => { console.log('success', e) }, (e) => { console.log('error', e) })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    // console.log(this.getUsers().subscribe(
    //   users => this.users = users,
    //   error => this.errorMessage = <any>error))
     this.getUsers();
     this.getEvents();
     this.getPlaces();
  }
  startTracking() {
    cordova.plugins.HyperTrack.startTracking((e) => { console.log('success', e) }, (e) => { console.log('error', e) })
  }

  stopTracking() {
    cordova.plugins.HyperTrack.stopTracking((e) => { console.log('success', e) }, (e) => { console.log('error', e) })
  }

  getUsers() {
    this.htService.getUsers().subscribe(
      users => this.users = users,
      error => this.errorMessage = <any>error, 
      () => console.log('Got them'));
  }

  getEvents() {
    this.htService.getEvents().subscribe(
      events => this.events = events,
      error => this.errorMessage = <any>error, 
      () => console.log('Got events'));
  }

    getPlaces() {
    this.htService.getPlaces().subscribe(
      places => this.places = places,
      error => this.errorMessage = <any>error, 
      () => console.log('Got places'));
  }

}
