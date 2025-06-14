import { createFeature, createReducer, on } from '@ngrx/store';
import { profileActions } from './actions';
import { Profile } from 'data-access';

export interface ProfileState {
  profiles: Profile[],
  profileFilters: Record<string, any>
}
export const initialState: ProfileState = {
  profiles: [],
  profileFilters: {}
}

export const profileFeature = createFeature({
  name: 'profileFeature',
  reducer: createReducer(
    initialState,
    on(profileActions.profilesLoaded, (state, payload) => {
      console.log('REDUCER',state,payload)
      return {
        ...state,
        profiles: payload.profiles,
      }
    }),
    on(profileActions.profileFiltersSave, (state, payload) => {
      console.log('REDUCER',state,payload)
      return {
        ...state,
        profilesFilters: payload.profilesFilter,
      }
    })

  ),

})
