import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(
    private postService: PostsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postService.getPost(this.postId).subscribe((postData) => {
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
          };
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost(postForm: NgForm): void {
    const post: Post = {
      title: postForm.value.title,
      content: postForm.value.content,
      id: null,
    };

    if (postForm.valid && this.mode === 'create') {
      this.postService.addPost(post);
    } else if (postForm.valid && this.mode === 'edit') {
      this.postService.updatePost(this.postId, {
        id: this.postId,
        title: postForm.value.title,
        content: postForm.value.content,
      });
    }
    postForm.resetForm();
  }
}
