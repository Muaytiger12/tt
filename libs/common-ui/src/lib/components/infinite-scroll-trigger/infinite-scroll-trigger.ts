import { ChangeDetectionStrategy, Component, input, OnInit, output } from '@angular/core';
import { ImgUrlPipe } from '../../pipes/img-url.pipe';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'lib-infinite-scroll-trigger',
  imports: [CommonModule],
  templateUrl: './infinite-scroll-trigger.html',
  styleUrl: './infinite-scroll-trigger.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteScrollTriggerComponent implements OnInit {

  loaded = output<void>()
  ngOnInit(){
this.loaded.emit();
}
}
