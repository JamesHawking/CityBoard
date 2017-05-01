import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Events } from 'ionic-angular';
/**
 * Generated class for the Post page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage implements OnInit {
  slab: FirebaseObjectObservable<any>;
  item = {};
  constructor(public af: AngularFire, public events: Events, public navCtrl: NavController, public navParams: NavParams) {
    let key = navParams.get('key');
    this.slab = af.database.object('/slabs/' + key,  { preserveSnapshot: true });
    this.slab.subscribe(snapshot => {
      this.item = snapshot.val();
    });
  }


  ngOnInit() {

  } 

}
