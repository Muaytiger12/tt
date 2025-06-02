import {Component, EventEmitter, HostBinding, inject, input, Output, Renderer2} from '@angular/core';
import {AvatarCircleComponent} from '../../../common-ui/avatar-circle/avatar-circle.component';
import {ProfileService} from '../../../data/services/profile.service';
import {NgIf} from '@angular/common';
import {SvgComponent} from '../../../common-ui/svg/svg.component';
import {FormsModule} from '@angular/forms';



@Component({
  selector: 'app-post-input',
  imports: [
    AvatarCircleComponent,
    NgIf,
    SvgComponent,
    FormsModule
  ],
  templateUrl: './post-input.component.html',
  styleUrl:   './post-input.component.scss'
})
export class PostInputComponent {
  isCommentInput = input(false);
  r2 = inject(Renderer2);
  profile = inject(ProfileService).me;
  postId = input<number>(0)
  postText = '';
  @Output() submitted = new EventEmitter<string>()

  @HostBinding('class.comment')
  get isComment() {
    return this.isCommentInput()
  }

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.r2.setStyle(textarea, 'height', 'auto')
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px')
  }

  onSubmit() {
    if (!this.postText) return
    this.submitted.emit(this.postText);
    this.postText = ''
  }
}
