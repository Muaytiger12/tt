import { Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { PostInputComponent } from '../../ui/index';
import { PostComponent } from '../post/post.component';
import { debounceTime, firstValueFrom, fromEvent, Subscription } from 'rxjs';
import { GlobalStoreService, PostService } from 'data-access';

@Component({
  selector: 'lib-post-feed',
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent {
  postService = inject(PostService);
  feed = inject(PostService).posts;

  profile = inject(GlobalStoreService).me;

  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);
  private resizeSub = new Subscription();

  constructor() {
    firstValueFrom(this.postService.fetchPosts());
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
    await firstValueFrom(
      this.postService.createPost({
        title: 'Пост',
        content: text,
        authorId: this.profile()!.id,
      })
    );
  }
}
