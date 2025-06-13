import {
  Component,
  EventEmitter,
  inject,
  Output,
  Renderer2,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';


import { AvatarCircleComponent, SvgComponent } from 'common-ui';
import { ProfileService } from 'data-access';

@Component({
  selector: 'lib-message-input',
  imports: [AvatarCircleComponent, FormsModule, NgIf, SvgComponent],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss',
})
export class MessageInputComponent {
  r2 = inject(Renderer2);
  me = inject(ProfileService).me;

  @Output() emitter = new EventEmitter<string>();
  message = '';

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  onEmit() {
    if (!this.message) return;

    this.emitter.emit(this.message);
    this.message = '';
  }
}
