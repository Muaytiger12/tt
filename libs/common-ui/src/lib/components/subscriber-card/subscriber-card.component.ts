import { Component, Input } from '@angular/core';
import { ImgUrlPipe } from '../../pipes/img-url.pipe';
import { Profile } from 'data-access';

@Component({
  selector: 'lib-subscriber-card',
  imports: [ImgUrlPipe],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
})
export class SubscriberCardComponent {
  @Input() profile!: Profile;
}
