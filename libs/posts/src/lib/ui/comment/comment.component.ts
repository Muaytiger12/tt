import { Component, input } from '@angular/core';
import { AvatarCircleComponent } from 'common-ui';
import { DatePipe } from '@angular/common';
import { Comments } from 'data-access';

@Component({
  selector: 'lib-comment',
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  comment = input<Comments>();
}
