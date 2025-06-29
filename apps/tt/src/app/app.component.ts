import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ExStore } from 'experimental';
@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  #experimentalStore = inject(ExStore)
  constructor() {
    this.#experimentalStore.init().subscribe();
  }
}
