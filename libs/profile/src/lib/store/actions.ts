import { createActionGroup, props } from '@ngrx/store';
import { Profile } from 'data-access';


export const profileActions = createActionGroup({
  source: 'profile',
  events: {
    'filter events': props<{ filters: Record<string, any> }>(),
    'profiles loaded': props<{profiles: Profile[] }>(),
    // 'profile filters save': props<{profilesFilter: Profile[] }>(),
  },
});
