import { Injectable, signal } from '@angular/core';
// @ts-ignore
import { Profile } from 'interfaces/profile';

@Injectable({
  providedIn: 'root',
})
export class GlobalStoreService {
  me = signal<Profile | null>(null)
}
