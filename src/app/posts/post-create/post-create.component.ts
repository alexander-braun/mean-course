import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  constructor(private postService: PostsService) {}

  ngOnInit(): void {}

  onAddPost(postForm: NgForm): void {
    const post: Post = {
      title: postForm.value.title,
      content: postForm.value.content,
    };

    if (postForm.valid) {
      this.postService.addPost(post);
      postForm.resetForm();
    }
  }
}
