import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSubscription: Subscription;
  loading = false;

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.loading = true;
    this.postService.getPosts();
    this.postsSubscription = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.loading = false;
        this.posts = posts;
      });
  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }

  onDelete(id: string): void {
    this.postService.deletePost(id);
  }
}
