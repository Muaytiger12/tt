import { inject, Injectable } from '@angular/core';
import { PostService } from 'data-access';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs';
import { postsActions } from './actions';

@Injectable({
  providedIn: 'root',
})
export class PostsEffects {
  postsService = inject(PostService);
  actions$ = inject(Actions);


  fetchAndDisplayPosts$ = createEffect(() => {
    return this.actions$.pipe(
      tap((tap) => console.log(tap)),
      ofType(postsActions.fetchPosts),
      switchMap(() =>
        this.postsService.fetchPosts().pipe(
          tap(tap => console.log(tap)),
          map((posts) => postsActions.loadPosts({ posts: posts }))
        )
      )
    );
  });

  $createPost = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.createPost),
      switchMap(({payload}) =>
        this.postsService.createPost({
            title: payload.title,
            content: payload.content,
            authorId: payload.authorId,
        }).pipe(
          map(() => postsActions.fetchPosts({}))
        )
      )
    );
  });
  $createComment = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.createComment),
      switchMap(({payload}) =>
        this.postsService.createComment({
          text: payload.text,
          authorId: payload.authorId,
          postId: payload.postId,
        }).pipe(
          map(() => postsActions.fetchPosts({}))
        )
      )
    );
  });

}
