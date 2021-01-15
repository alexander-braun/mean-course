import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  private mode = 'create';
  private postId: string;
  post: Post;
  loading = false;
  form: FormGroup;

  constructor(
    private postService: PostsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.loading = true;
        this.postService.getPost(this.postId).subscribe((postData) => {
          this.loading = false;
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
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost(): void {
    const post: Post = {
      title: this.form.value.title,
      content: this.form.value.content,
      id: null,
    };
    this.loading = true;
    if (this.form.valid && this.mode === 'create') {
      this.postService.addPost(post);
    } else if (this.form.valid && this.mode === 'edit') {
      this.postService.updatePost(this.postId, {
        id: this.postId,
        title: this.form.value.title,
        content: this.form.value.content,
      });
    }
    this.form.reset();
  }
}
