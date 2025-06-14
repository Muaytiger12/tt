import { createSelector } from '@ngrx/store';
import { profileFeature } from './reducer';

export const selectFilteredProfiles = createSelector(
  profileFeature.selectProfiles,
  (profiles) => {
    console.log('SELECTOR ',profiles)
     return profiles
  }
)
export const selectSaveFiltersProfile = createSelector(
  profileFeature.selectProfiles,
  (profiles) => {
     return profiles
  }
)

