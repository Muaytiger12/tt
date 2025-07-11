import { Profile } from './profile.interface';



export interface PostCreateDTO {
  title: string;
  content: string;
  authorId: number;
}

export interface  Post {
  id: number;
  title: string;
  communityId: number;
  content: string;
  author: Profile;
  images: string[];
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: Comments[];
}

export interface Comments {
  id: number;
  text: string;
  author: {
    id: number;
    username: string;
    avatarUrl: string;
    subscribersAmount: number;
  };
  postId: number;
  commentId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CommentCreateDTO {
  text: string;
  authorId: number;
  postId: number;
  commentId?: number;
}
