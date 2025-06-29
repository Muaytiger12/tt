import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  inject,
  input,
  Output,
  Renderer2
} from '@angular/core';

import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvatarCircleComponent, SvgComponent } from 'common-ui';
import { GlobalStoreService } from 'data-access';

@Component({
  imports: [AvatarCircleComponent, NgIf, SvgComponent, FormsModule],
  selector: 'lib-post-input',
  styleUrl: './post-input.component.scss',
  templateUrl: './post-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostInputComponent {
  isCommentInput = input(false);
  r2 = inject(Renderer2);
  profile = inject(GlobalStoreService).me;
  postId = input<number>(0);
  postText = '';
  @Output() submitted = new EventEmitter<string>();

  @HostBinding('class.comment')
  get isComment() {
    return this.isCommentInput();
  }

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  onSubmit() {
    if (!this.postText) return;
    this.submitted.emit(this.postText);
    this.postText = '';
  }
}
