import {Component, ElementRef, HostListener, inject, Renderer2} from '@angular/core';
import {PostInputComponent} from '../post-input/post-input.component';
import {PostComponent} from '../post/post.component';
import {PostService} from '../../../data/services/post.service';
import {debounceTime, firstValueFrom, fromEvent, Subscription} from 'rxjs';
import {ProfileService} from '../../../data/services/profile.service';

@Component({
  selector: 'app-post-feed',
  imports: [
    PostInputComponent,
    PostComponent
  ],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss'
})
export class PostFeedComponent {
  postService = inject(PostService)
  feed = inject(PostService).posts;
  profile = inject(ProfileService).me;

  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);
  private resizeSub = new Subscription();

  constructor() {
    firstValueFrom(this.postService.fetchPosts())
  }

  ngAfterViewInit() {
    this.resizeFeed()

    this.resizeSub = fromEvent(window, 'resize').pipe(
      debounceTime(200)
    ).subscribe(() => this.resizeFeed())
  }

  resizeFeed() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24 - 24;

    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`)
  }

  ngOnDestroy() {
    this.resizeSub.unsubscribe()
  }

  async onCreatePost(text: string) {
    await firstValueFrom(this.postService.createPost({
      title: 'Пост',
      content: text,
      authorId: this.profile()!.id
    }))
  }
}
