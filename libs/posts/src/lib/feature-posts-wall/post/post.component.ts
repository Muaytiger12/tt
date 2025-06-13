import { Component, inject, input, OnInit, signal } from '@angular/core';
import { AvatarCircleComponent } from 'common-ui';
import { SvgComponent } from 'common-ui';
import { firstValueFrom } from 'rxjs';
import { HoursPipe } from 'common-ui';
import { CommentComponent, PostInputComponent } from '../../ui/index';
import { Comments, GlobalStoreService, Post, PostService } from 'data-access';

@Component({
  selector: 'lib-post',
  imports: [
    AvatarCircleComponent,
    SvgComponent,
    PostInputComponent,
    HoursPipe,
    CommentComponent,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  post = input<Post>();
  comments = signal<Comments[]>([]);
  profile = inject(GlobalStoreService).me;
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
