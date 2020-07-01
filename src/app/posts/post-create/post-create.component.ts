import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  form: FormGroup;

  enteredTitle = '';
  enteredContent = '';

  public mode = 'create';
  public postId = '';
  public post: Post;

  constructor(private postsService: PostsService, private route: ActivatedRoute, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.createform();
    this.spinner.show();
    this.route.queryParams.subscribe((params) => {
      if (params.postId) {
        this.mode = 'edit';
        this.postId = params.postId;
        this.getDetails();
      } else {
        this.mode = 'create';
        this.postId = null;
        this.spinner.hide();
      }
    });
  }

  createform() {
    this.form = new FormGroup({
      'title': new FormControl(null, { validators: [Validators.required] }),
      'content': new FormControl(null, { validators: [Validators.required] }),
    })
  }

  getDetails() {
    this.postsService.getPost(this.postId).subscribe(postData => {
      this.post = { id: postData._id, title: postData.title, content: postData.content };
      this.spinner.hide();
      this.post = {
        id: postData._id,
        title: postData.title,
        content: postData.content
      }
      this.form.setValue({
        'title': this.post.title,
        'content': this.post.content
      });
    });
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postsService.addPost(this.form.value.title, this.form.value.content);
      this.form.reset();
      this.router.navigateByUrl('/');
    } else {
      this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content);
      this.router.navigateByUrl('/');
    }
  }

}