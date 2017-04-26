import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { POSTS } from './mock-posts';

@Injectable()
export class PostService {

    getPosts(): Promise<Post[]>{
        return Promise.resolve(POSTS);
    }

    getPostsSlowly(): Promise<Post[]> {
        return new Promise(resolve => {
        // Simulate server latency with 2 second delay
        setTimeout(() => resolve(this.getPosts()), 2000);
        });
    }
}