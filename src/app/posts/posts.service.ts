import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  public posts: Post[] = [];

  public postUpdated = new Subject<Post[]>();

  constructor() { }

  getPosts() {
    return [...this.posts];
  }

  getpostUpdatedListener() {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { title: title, content: content };
    this.posts.push(post);
    this.postUpdated.next([...this.posts]);
  }

}
