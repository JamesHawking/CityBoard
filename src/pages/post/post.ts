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

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage implements OnInit {
  slab: FirebaseObjectObservable<any>;
  item = {
    coords: {
      latitude: 0,
      longitude: 0
    }
  };

  constructor(public af: AngularFire, public events: Events, public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) {
    let key = navParams.get('key');
    this.slab = af.database.object('/slabs/' + key,  { preserveSnapshot: true });
    this.slab.subscribe(snapshot => {
      this.item = snapshot.val();
      console.log(snapshot.val())
    });
  }

  @ViewChild('map') mapElement: ElementRef;
  map: any;
 
 
  ionViewDidLoad(){
    this.loadMap();
  }
 
  loadMap(){
 
    this.geolocation.getCurrentPosition().then((position) => {
      console.log(position.coords.latitude, position.coords.longitude)
      let latLng = new google.maps.LatLng(this.item.coords.latitude, this.item.coords.longitude);
 
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


  ngOnInit() {

  } 

}
