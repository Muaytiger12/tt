import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { PostInputComponent } from '../../ui/index';
import { PostComponent } from '../post/post.component';
import { debounceTime, fromEvent, Subscription } from 'rxjs';
import { GlobalStoreService } from 'data-access';
import { Store } from '@ngrx/store';
import { postsActions } from '../../store/actions';
import { selectAllPosts } from '../../store/selectors';

@Component({
  selector: 'lib-post-feed',
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent implements OnInit, OnDestroy, AfterViewInit {
  profile = inject(GlobalStoreService).me;
  store = inject(Store);
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);
  private resizeSub = new Subscription();
  feed = this.store.selectSignal(selectAllPosts);

  ngOnInit() {
    console.log('ngOnInit');
    this.store.dispatch(postsActions.fetchPosts({}));
  }

  ngAfterViewInit() {
    this.resizeFeed();

    this.resizeSub = fromEvent(window, 'resize')
      .pipe(debounceTime(200))
      .subscribe(() => this.resizeFeed());
  }

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24 - 24;

    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }

  ngOnDestroy() {
    this.resizeSub.unsubscribe();
  }

  async onCreatePost(text: string) {
    this.store.dispatch(
      postsActions.createPost({
        payload: {
          title: 'Пост',
          content: text,
          authorId: this.profile()!.id,
        },
      })
    );
  }
}
