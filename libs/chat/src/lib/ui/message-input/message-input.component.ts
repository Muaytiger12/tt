import {
  Component,
  EventEmitter,
  HostBinding,
  inject,
  input,
  Output,
  Renderer2,
} from '@angular/core';
import { AvatarCircleComponent } from '../../../../../common-ui/src/lib/components/avatar-circle/avatar-circle.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { SvgComponent } from '../../../../../common-ui/src/lib/components/svg/svg.component';
import { ProfileService } from '../../../../../profile/src/lib/data/services/profile.service';

@Component({
  selector: 'app-message-input',
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
