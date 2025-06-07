import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Comments, Post } from '../../data/interfaces/post.interface';
import { AvatarCircleComponent } from 'common-ui';
import { SvgComponent } from 'common-ui';
import { PostInputComponent } from 'posts';
import { CommentComponent } from 'posts';
import { PostService } from 'posts';
import { firstValueFrom } from 'rxjs';
import { HoursPipe } from 'common-ui';
import { ProfileService } from 'profile';

@Component({
  selector: 'app-post',
  imports: [
    AvatarCircleComponent,
    SvgComponent,
    PostInputComponent,
    CommentComponent,
    HoursPipe,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  post = input<Post>();
  comments = signal<Comments[]>([]);
  profile = inject(ProfileService).me;
  postService = inject(PostService);

  async ngOnInit() {
    this.comments.set(this.post()!.comments);
  }

  async onCreatedComment(text: string) {
    await firstValueFrom(
      this.postService.createComment({
        text: text,
        authorId: this.profile()!.id,
        postId: this.post()!.id,
      })
    );

    const com = await firstValueFrom(
      this.postService.getCommentsById(this.post()!.id)
    );
    this.comments.set(com);
  }
}
