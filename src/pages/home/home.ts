import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostService } from '../../app/post/post.service';
import { Post } from '../../app/post/post.model';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  posts: Post[];
  constructor(public navCtrl: NavController, public postService: PostService) {

  }

  getPosts(): void {
    this.postService.getPosts().then(posts => this.posts = posts);
  }

ngOnInit() {
     this.postService.getPostsSlowly().then(posts => this.posts = posts);
  }

}
