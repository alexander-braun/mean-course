import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Post } from './post.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

interface PostServer {
  title: string;
  content: string;
  _id: string;
}

interface HttpGetPost {
  message: string;
  posts: PostServer[];
}

interface HttpPostPost {
  message: string;
  postId: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(): void {
    this.http
      .get<HttpGetPost>('http://localhost:3000/api/posts')
      .pipe(
        map((data) => {
          return data.posts.map((post) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
            };
          });
        })
      )
      .subscribe((posts) => {
        this.posts = posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(id: string): void {
    this.http.delete('http://localhost:3000/api/posts/' + id).subscribe(() => {
      const updatedPosts = this.posts.filter((post) => post.id !== id);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener(): Observable<Post[]> {
    return this.postsUpdated.asObservable();
  }

  addPost(post: Post): void {
    this.http
      .post<HttpPostPost>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        this.posts.push({ ...post, id: responseData.postId });
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  getPost(id: string): Observable<PostServer> {
    return this.http.get<PostServer>('http://localhost:3000/api/posts/' + id);
  }

  updatePost(id: string, post: Post): void {
    const newPost = { ...post, id };
    this.http
      .put('http://localhost:3000/api/posts/' + id, newPost)
      .subscribe(() => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex((p) => p.id === id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }
}
