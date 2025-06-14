import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CommentCreateDTO,
  Post,
  PostCreateDTO,
} from '../interfaces/post.interface';
import { map, switchMap, tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class PostService {
  http = inject(HttpClient);
  public baseApiUrl = 'https://icherniakov.ru/yt-course/';
  posts = signal<Post[]>([]);

  createPost(payload: PostCreateDTO) {
    return this.http.post<Post>(`${this.baseApiUrl}post/`, payload).pipe(
      switchMap(() => {
        return this.fetchPosts();
      })
    );
  }

  fetchPosts() {
    return this.http
      .get<Post[]>(`${this.baseApiUrl}post/`)
      .pipe(tap((res) => this.posts.set(res)));
  }
  createComment(payload: CommentCreateDTO) {
    return this.http.post<Comment>(`${this.baseApiUrl}comment/`, payload);
  }
  // getCommentsById(postId: number) {
  //   return this.http
  //     .get<Post>(`${this.baseApiUrl}post/${postId}`)
  //     .pipe(map((val) => val.comments));
  // }
}
