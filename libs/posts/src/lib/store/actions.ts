import { createActionGroup, props } from '@ngrx/store';
import {CommentCreateDTO, Post, PostCreateDTO} from 'data-access';

export const postsActions = createActionGroup({
  source: 'posts',
  events: {
    'fetch posts': props<{ posts?:number }>(), // экшн запроса поста
    'load posts': props<{ posts: Post[] }>(), // экш загрузки поста после запроса на бэк
    'create post': props<{ payload: PostCreateDTO }>(), // создание поста
    'create comment': props<{ payload: CommentCreateDTO }>(), // создание поста
  },
});
