import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
  form: FormGroup;

  enteredTitle = '';
  enteredContent = '';

  public mode = 'create';
  public postId = '';
  public post: Post;

  public imagePreview = '';

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

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
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  getDetails() {
    this.postsService.getPost(this.postId).subscribe((postData) => {
      this.post = {
        id: postData._id,
        title: postData.title,
        content: postData.content,
      };
      this.spinner.hide();
      this.post = {
        id: postData._id,
        title: postData.title,
        content: postData.content,
      };
      this.form.setValue({
        title: this.post.title,
        content: this.post.content,
      });
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files;
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    if (file) {
      reader.readAsDataURL(file[0]);
    }
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
      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content
      );
      this.router.navigateByUrl('/');
    }
  }
}
