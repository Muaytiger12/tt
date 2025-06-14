import { createFeature, createReducer, on } from '@ngrx/store';
import { Post } from 'data-access';
import { postsActions } from './actions';

export interface PostsState {
  posts: Post[];
}
export const initialState: PostsState = {
  posts: [],
};

export const postsFeature = createFeature({
  name: 'posts',
  reducer: createReducer(
    initialState,

    on(postsActions.loadPosts, (state, { posts }) => ({
      ...state,
      posts
    })),
    on(postsActions.createComment, (state, { payload }) => ({
      ...state,
      payload
    })),
  ),
});
