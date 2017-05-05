import { Component, OnInit } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { PostService } from '../../app/post/post.service';
import { Post } from '../../app/post/post.model';
import { PostPage } from '../post/post';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  slabs: FirebaseListObservable<any[]>;
  loading: boolean = true;
  goToPost = PostPage;
  clickedPost: Post;

  constructor(public af: AngularFire, public events: Events, public navCtrl: NavController, public postService: PostService, public loadingCtrl: LoadingController) {

     this.slabs = af.database.list('/slabs');

    // this.slabs.subscribe(slabs => JSON.parse(slabs))
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  loadSinglePost(key: string) {
  //  console.log(key)
    this.events.publish('post:view', key);
    this.navCtrl.push(PostPage, {key: key});
  }

  // getPosts(): void {
  //   this.postService.getPosts().then(posts => this.posts = posts);
  // }


  ngOnInit() {
 // this.presentLoadingDefault();
 // this.postService.getPosts().then(posts => this.posts = posts);
    // this.postService.getPostsSlowly().then(posts => this.posts = posts).then(() => this.loading = false);


  }


  ionViewDidLoad() {
   // console.log('ionViewDidLoad PostPage');
  }

   
}


