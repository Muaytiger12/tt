import { Component, input } from '@angular/core';
import { ImgUrlPipe } from '../../pipes/img-url.pipe';



@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-avatar-circle',
  imports: [ImgUrlPipe],
  templateUrl: './avatar-circle.component.html',
  styleUrl: './avatar-circle.component.scss',
})
export class AvatarCircleComponent {
  avatarUrl = input<string | null>();
}
