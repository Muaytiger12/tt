import { createSelector } from '@ngrx/store';
import { profileFeature } from './reducer';

export const selectFilteredProfiles = createSelector(
  profileFeature.selectProfiles,
  (profiles) => {
    console.log('SELECTOR ',profiles)
     return profiles
  }
)
// export const selectSaveFilterProfile = createSelector(
//   profileFeature.selectProfileFilters,
//   (profiles) => {
//      return profiles;
//   }
// );
