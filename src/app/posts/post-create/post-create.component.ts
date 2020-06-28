import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  enteredTitle = '';
  enteredContent = '';

  public mode = 'create';
  public postId = '';
  public post: Post;

  constructor(private postsService: PostsService, private route: ActivatedRoute, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.route.queryParams.subscribe((params) => {
      if (params.postId) {
        this.mode = 'edit';
        this.postId = params.postId;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.post = { id: postData._id, title: postData.title, content: postData.content };
          this.spinner.hide();
        });
      } else {
        this.mode = 'create';
        this.postId = null;
        this.spinner.hide();
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postsService.addPost(form.value.title, form.value.content);
      form.resetForm();
      this.router.navigateByUrl('/');
    } else {
      this.postsService.updatePost(this.postId, form.value.title, form.value.content);
      this.router.navigateByUrl('/');
    }
  }

}
