import {Component, inject, input, OnInit, signal} from '@angular/core';
import {Comments, Post} from '../../../data/interfaces/post.interface';
import {AvatarCircleComponent} from '../../../common-ui/avatar-circle/avatar-circle.component';
import { DatePipe } from '@angular/common';
import {SvgComponent} from '../../../common-ui/svg/svg.component';
import {PostInputComponent} from '../post-input/post-input.component';
import {CommentComponent} from './comment/comment.component';
import {PostService} from '../../../data/services/post.service';
import {firstValueFrom} from 'rxjs';
import {HoursPipe} from '../../../helpers/pipes/hours.pipe';
import {ProfileService} from '../../../data/services/profile.service';

@Component({
  selector: 'app-post',
  imports: [
    AvatarCircleComponent,
    DatePipe,
    SvgComponent,
    PostInputComponent,
    CommentComponent,
    HoursPipe
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  post = input<Post>();
  comments = signal<Comments[]>([])
  profile = inject(ProfileService).me;
  postService = inject(PostService);

  async ngOnInit() {
    this.comments.set(this.post()!.comments)
  }

 async onCreatedComment(text: string) {
    await firstValueFrom(this.postService.createComment({
      text: text,
      authorId: this.profile()!.id,
      postId: this.post()!.id,
    }))

    const com = await firstValueFrom(this.postService.getCommentsById(this.post()!.id))
    this.comments.set(com)

  }
}
