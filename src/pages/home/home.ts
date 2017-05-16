import { Component, OnInit  } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { PostService } from '../../app/post/post.service';
import { Post } from '../../app/post/post.model';
import { PostPage } from '../post/post';
// import { PopOverControlls } from '../pop-over-controlls/pop-over-controlls';

import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  slabs: FirebaseListObservable<any[]>;
  loading: boolean = true;
  goToPost = PostPage;
  clickedPost: Post;
  coordX: number;
  coordY: number;
  coords = {}
  distance: number;
  slabs2: FirebaseObjectObservable<any>;

  constructor(public af: AngularFire, public events: Events, public navCtrl: NavController, public postService: PostService, public loadingCtrl: LoadingController, public popoverCtrl: PopoverController, private geolocation: Geolocation) {

    this.slabs = af.database.list('/slabs').map((array) => array.reverse()) as FirebaseListObservable<any[]>;
    this.slabs2 = af.database.object('/slabs/',  { preserveSnapshot: true });
    // this.slabs.subscribe(slabs => JSON.parse(slabs))
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.slabs2.subscribe(snapshot => {
      console.log(snapshot.key)
      console.log(snapshot.val())
      for (var key in snapshot) {
        if (snapshot.hasOwnProperty(key)) {
          console.log(key + " -> " + snapshot[key]);
        }
}
    });

    setTimeout(() => {
      console.log('Async operation has ended');
      console.log(this.coordX);
      console.log(this.coordY);
      refresher.complete();
    }, 2000);
  }

  loadSinglePost(key: string) {
    //  console.log(key)
    this.events.publish('post:view', key);
    this.navCtrl.push(PostPage, { key: key });
  }

  // getPosts(): void {
  //   this.postService.getPosts().then(posts => this.posts = posts);
  // }


  ngOnInit() {
    // this.presentLoadingDefault();
    // this.postService.getPosts().then(posts => this.posts = posts);
    // this.postService.getPostsSlowly().then(posts => this.posts = posts).then(() => this.loading = false);
    this.geolocation.getCurrentPosition().then((position) => {
       this.coords = { latitude: position.coords.latitude, longitude: position.coords.longitude }
        this.coordX = position.coords.latitude;
        this.coordY = position.coords.longitude;
    });

  }


  ionViewDidLoad() {
    // console.log('ionViewDidLoad PostPage');
  }


}
