import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatsListComponent } from '../chats-list/chats-list.component';
import { ChatsService } from 'data-access';

@Component({
  selector: 'lib-chats',
  imports: [RouterOutlet, ChatsListComponent],
  templateUrl: './chats-page.component.html',
  styleUrl: './chats-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsPageComponent implements OnInit {
#chatService = inject(ChatsService);
ngOnInit(){
  this.#chatService.connectWs()
}
}
