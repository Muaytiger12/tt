import {
  Component,
  EventEmitter,
  HostBinding,
  inject,
  input,
  Output,
  Renderer2,
} from '@angular/core';


import { NgIf } from '@angular/common';

import { FormsModule } from '@angular/forms';
//
import {AvatarCircleComponent} from 'common-ui';
import {SvgComponent} from 'common-ui';
import { GlobalStoreService } from 'shared';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-post-input',
  imports: [AvatarCircleComponent, NgIf, SvgComponent, FormsModule],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss',
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
