import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postsService: PostsService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.spinner.hide();
      });
  }

  onDelete(postId) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
